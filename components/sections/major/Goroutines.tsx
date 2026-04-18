import { CodeBlock, Note } from '@/components/ui'

export function Goroutines() {
  return (
    <div>
      <h3 id="goroutines-concurrent-execution" className="text-[#5f6368] text-xl font-semibold mt-6">
        1. Goroutines - Concurrent Execution
      </h3>
      <p>A goroutine is a lightweight thread. Just add <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">go</code> in front of a function call!</p>

      <CodeBlock>{`// Start a function as a goroutine
go Server()

// Anonymous goroutine
go func() {
    fmt.Println("hello, world!")
}()`}</CodeBlock>

      <h4 className="font-semibold mt-4">Goroutine Synchronization</h4>
      <CodeBlock>{`var a string

func f() {
    print(a)
}

func hello() {
    a = "hello, world"
    go f()  // Will print "hello, world"
}`}</CodeBlock>

      <CodeBlock>{`// JavaScript equivalent
async function hello() {
    a = "hello, world"
    await server()
}`}</CodeBlock>

      <Note>
        <strong>Key:</strong> Goroutines are NOT threads — they&apos;re multiplexed onto fewer OS threads. You can have 1000s with minimal memory!
      </Note>
    </div>
  )
}
