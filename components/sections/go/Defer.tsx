import { CodeBlock, Warning, Tip, Note } from '@/components/ui'

export function Defer() {
  return (
    <section>
      <h2 id="defer" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        4. Defer
      </h2>
      <p><strong>defer</strong> tells Go: &quot;Run this later, when the function exits.&quot;</p>

      <h3 className="text-[#5f6368]">Simple Example</h3>
      <CodeBlock>{`func main() {
    fmt.Println("1. Start")
    defer fmt.Println("2. This is deferred")
    fmt.Println("3. Doing work")
    fmt.Println("4. More work")
}`}</CodeBlock>

      <p><strong>Output:</strong></p>
      <CodeBlock>{`1. Start
3. Doing work
4. More work
2. This is deferred    ← runs LAST, when main() exits`}</CodeBlock>

      <h3 className="text-[#5f6368]">Why Does It Exist?</h3>
      <CodeBlock>{`func readFile() {
    f, err := os.Open("data.txt")    // Open file
    defer f.Close()                   // ← "Close it when I'm done, no matter what"
    // ... read file ...
}   // ← f.Close() runs HERE automatically`}</CodeBlock>

      <h3 className="text-[#5f6368]">Multiple Defers (LIFO)</h3>
      <CodeBlock>{`func main() {
    defer fmt.Println("1st defer")
    defer fmt.Println("2nd defer")
    defer fmt.Println("3rd defer")
    fmt.Println("Normal code")
}`}</CodeBlock>
      <p><strong>Output:</strong></p>
      <CodeBlock>{`Normal code
3rd defer    ← last deferred, runs first
2nd defer
1st defer    ← first deferred, runs last`}</CodeBlock>

      <h3 className="text-[#5f6368]">Defer Runs Even If There&apos;s an Error</h3>
      <Warning>
        <p><strong>Without defer:</strong></p>
        <CodeBlock>{`func doWork() {
    pool := connect()
    if err != nil {
        pool.Close()    // ← must remember here
        return
    }
    if err != nil {
        pool.Close()    // ← must remember here too
        return
    }
    pool.Close()        // ← and here
}
// So easy to forget one! 😱`}</CodeBlock>
      </Warning>

      <Tip>
        <p><strong>With defer:</strong></p>
        <CodeBlock>{`func doWork() {
    pool := connect()
    defer pool.Close()  // ← ONE place, covers ALL exits ✅
    if err != nil {
        return           // pool.Close() runs automatically
    }
}                        // pool.Close() runs automatically`}</CodeBlock>
      </Tip>

      <h3 className="text-[#5f6368]">Common Uses</h3>
      <CodeBlock>{`// Close files
f, _ := os.Open("file.txt")
defer f.Close()

// Close database connections
pool, _ := pgxpool.NewWithConfig(ctx, config)
defer pool.Close()

// Unlock mutexes
mu.Lock()
defer mu.Unlock()

// Close HTTP response body
resp, _ := http.Get("https://example.com")
defer resp.Body.Close()`}</CodeBlock>

      <Note>
        <h4 className="font-bold">TL;DR</h4>
        <ul className="mt-2 space-y-1">
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">defer</code> = &quot;Run this line LAST, when the function exits&quot;</li>
          <li>Works even if the function exits early due to errors</li>
          <li>Multiple defers run in reverse order</li>
          <li>Mainly used for cleanup (closing files, connections, etc.)</li>
        </ul>
      </Note>
      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}
