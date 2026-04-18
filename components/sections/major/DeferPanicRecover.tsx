import { CodeBlock, Tip } from '@/components/ui'

export function DeferPanicRecover() {
  return (
    <div>
      <h3 id="defer-panic-and-recovery" className="text-[#5f6368] text-xl font-semibold mt-6">
        5. Defer, Panic, and Recovery
      </h3>

      <h4 className="font-semibold mt-4">Defer - Run After Function Returns</h4>
      <CodeBlock>{`func readFile(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close()  // Always runs!
    return io.ReadAll(f)
}`}</CodeBlock>

      <CodeBlock>{`// JS equivalent is "finally"
try {
    const f = await open(path)
    return await readAll(f)
} finally {
    f.close()  // Always runs
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Panic</h4>
      <CodeBlock>{`panic("something went wrong!")
// Like: throw new Error("something went wrong!")`}</CodeBlock>

      <h4 className="font-semibold mt-4">Recover — Handling Panics</h4>
      <CodeBlock>{`func protect(g func()) {
    defer func() {
        log.Println("done")
        if x := recover(); x != nil {
            log.Printf("recovered from panic: %v", x)
        }
    }()
    log.Println("start")
    g()
}`}</CodeBlock>

      <Tip>
        <strong>In short:</strong> defer = finally, panic = throw, recover = catch (but from defer only!)
      </Tip>
    </div>
  )
}
