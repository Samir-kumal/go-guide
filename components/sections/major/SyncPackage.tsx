import { CodeBlock, Tip } from '@/components/ui'

export function SyncPackage() {
  return (
    <div>
      <h3 id="sync-package-waiting-for-goroutines" className="text-[#5f6368] text-xl font-semibold mt-6">
        6. Sync Package - Waiting for Goroutines
      </h3>

      <h4 className="font-semibold mt-4">WaitGroup</h4>
      <CodeBlock>{`var wg sync.WaitGroup

wg.Add(3)

go func() { defer wg.Done(); doWork(1) }()
go func() { defer wg.Done(); doWork(2) }()
go func() { defer wg.Done(); doWork(3) }()

wg.Wait()
fmt.Println("All done!")`}</CodeBlock>

      <h4 className="font-semibold mt-4">Mutex — Protecting Shared Data</h4>
      <CodeBlock>{`type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    c.value++
    c.mu.Unlock()
}`}</CodeBlock>

      <Tip>
        <strong>In short:</strong> WaitGroup = Promise.all, Mutex = lock for shared data.
      </Tip>
    </div>
  )
}
