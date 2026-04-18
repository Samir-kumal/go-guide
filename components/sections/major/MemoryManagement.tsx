import { CodeBlock, DeepDive, Note } from '@/components/ui'

export function MemoryManagement() {
  return (
    <div>
      <h3 id="memory-management" className="text-[#5f6368] text-xl font-semibold mt-6">
        13. Memory Management - Stack vs Heap
      </h3>
      <p>
        In Go, variables are stored either on the <strong>stack</strong> or the <strong>heap</strong>. Go automates this through a process called <strong>Escape Analysis</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 bg-[#e8f0fe] rounded-lg">
          <h4 className="font-bold text-[#1a73e8]">The Stack</h4>
          <p className="text-sm italic">Ultra-fast, LIFO cleanup</p>
          <ul className="list-disc pl-4 mt-2 text-sm">
            <li>Local function variables</li>
            <li>Input parameters</li>
            <li>Fixed-size arrays</li>
            <li>Zero GC overhead</li>
          </ul>
        </div>
        <div className="p-4 bg-[#fef7e0] rounded-lg">
          <h4 className="font-bold text-[#f29900]">The Heap</h4>
          <p className="text-sm italic">Dynamic, GC managed</p>
          <ul className="list-disc pl-4 mt-2 text-sm">
            <li>Variables that "escape" scope</li>
            <li>Large data structures</li>
            <li>Shared across goroutines</li>
            <li>Managed by Garbage Collector</li>
          </ul>
        </div>
      </div>

      <DeepDive title="Escape Analysis & GC Tuning">
        <h4 className="font-bold mb-2">How it works: Escape Analysis</h4>
        <p>The Go compiler determines at compile time whether a variable should stay on the stack or "escape" to the heap.</p>
        <CodeBlock>{`// Stack allocated (returns value)
func NewPoint() Point {
    return Point{X: 1, Y: 2}
}

// Heap allocated (returns pointer)
func NewPointPtr() *Point {
    return &Point{X: 1, Y: 2} // escapes to heap!
}`}</CodeBlock>
        <Note>
          Use <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">go build -gcflags="-m"</code> to see the compiler&apos;s escape analysis output.
        </Note>

        <h4 className="font-bold mt-4 mb-2">Garbage Collection (GC)</h4>
        <p>
          Go uses a concurrent <strong>tri-color mark-and-sweep</strong> GC. 
          Unlike Java, it is non-generational, which simplifies the runtime but means it must be tuned differently for low-latency vs. high-throughput systems.
        </p>

        <h4 className="font-bold mt-4 mb-2">Memory Reuse with sync.Pool</h4>
        <p>
          Allocating objects in a hot path causes GC pressure. <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">sync.Pool</code> allows you to reuse memory buffers, significantly reducing allocations.
        </p>
        <CodeBlock>{`var bufferPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}

func Process(data []byte) {
    buf := bufferPool.Get().(*bytes.Buffer)
    defer bufferPool.Put(buf)
    
    buf.Reset()
    buf.Write(data)
}`}</CodeBlock>

        <h4 className="font-bold mt-4 mb-2">Tuning: GOGC vs GOMEMLIMIT</h4>
        <ul className="list-disc pl-5 my-2">
          <li><strong>GOGC:</strong> Percentage of new heap data compared to current data before triggering GC. Default is 100. Lower = more frequent GC.</li>
          <li><strong>GOMEMLIMIT:</strong> (Go 1.19+) Soft memory limit that forces the GC to work harder to stay under a specific budget, preventing OOM crashes in containerized environments.</li>
        </ul>
      </DeepDive>
    </div>
  )
}
