import { CodeBlock, Tip, Note, ComparisonTable } from '@/components/ui'

export function SyncPackage() {
  return (
    <div>
      <h3 id="sync-package-waiting-for-goroutines" className="text-[#5f6368] text-xl font-semibold mt-6">
        6. Sync Package - Low-Level Synchronization
      </h3>

      <h4 className="font-semibold mt-4">WaitGroup</h4>
      <p>Used to wait for a collection of goroutines to finish.</p>
      <CodeBlock>{`var wg sync.WaitGroup

wg.Add(3)

go func() { defer wg.Done(); doWork(1) }()
go func() { defer wg.Done(); doWork(2) }()
go func() { defer wg.Done(); doWork(3) }()

wg.Wait()
fmt.Println("All done!")`}</CodeBlock>

      <h4 className="font-semibold mt-4">Mutex — Mutual Exclusion</h4>
      <p>Protects a piece of data so only one goroutine can access it at a time.</p>
      <CodeBlock>{`type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock() // Using defer ensures unlock even if code panics
    c.value++
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">RWMutex — Reader/Writer Mutex</h4>
      <p>Optimized for when you have many readers but few writers. Multiple readers can hold the lock at once, but only one writer can.</p>
      <CodeBlock>{`type Cache struct {
    mu    sync.RWMutex
    data  map[string]string
}

func (c *Cache) Get(key string) string {
    c.mu.RLock()         // Read Lock
    defer c.mu.RUnlock()
    return c.data[key]
}

func (c *Cache) Set(key, val string) {
    c.mu.Lock()          // Write Lock
    defer c.mu.Unlock()
    c.data[key] = val
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Sync.Once — Init once</h4>
      <p>Ensures a function is only ever called exactly once, regardless of how many goroutines call it.</p>
      <CodeBlock>{`var once sync.Once
var dbConn *sql.DB

func GetDB() *sql.DB {
    once.Do(func() {
        dbConn = connectDB()
    })
    return dbConn
}`}</CodeBlock>

      <ComparisonTable>
        <thead><tr><th>Primitive</th><th>Best For...</th><th>JS Equivalent</th></tr></thead>
        <tbody>
          <tr><td>WaitGroup</td><td>Waiting for multiple tasks</td><td>Promise.all()</td></tr>
          <tr><td>Mutex</td><td>Protecting shared state</td><td>(None/Single-threaded)</td></tr>
          <tr><td>RWMutex</td><td>High-read shared state</td><td>(None)</td></tr>
          <tr><td>Once</td><td>Thread-safe lazy init</td><td>(None/Module scope)</td></tr>
        </tbody>
      </ComparisonTable>

      <Note>
        <strong>When to use Sync vs Channels?</strong> Use channels for transferring ownership of data or orchestrating flow. Use sync primitives for protecting shared state or high-performance counters.
      </Note>
    </div>
  )
}
