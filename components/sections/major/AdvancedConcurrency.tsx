import { CodeBlock, DeepDive, Tip } from '@/components/ui'

export function AdvancedConcurrency() {
  return (
    <div>
      <h3 id="advanced-concurrency" className="text-[#5f6368] text-xl font-semibold mt-6">
        14. Adv. Concurrency - Patterns & Pitfalls
      </h3>
      <p>
        Moving beyond basic goroutines means understanding <strong>Data Races</strong> and implementing robust patterns like <strong>Worker Pools</strong> and <strong>Pipelines</strong>.
      </p>

      <div className="p-4 bg-[#fde9e9] border-l-4 border-[#d93025] rounded my-4">
        <h4 className="font-bold text-[#d93025]">The Critical Danger: Data Races</h4>
        <p className="text-sm">
          A data race occurs when two goroutines access the same memory address concurrently, and at least one access is a write. 
          <strong>This is undefined behavior</strong> and often leads to silent corruption.
        </p>
        <Tip>
          Always run your tests and local dev with the race detector: <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">go run -race</code>.
        </Tip>
      </div>

      <DeepDive title="High-Performance Patterns">
        <h4 className="font-bold mb-2">Pattern: Worker Pool</h4>
        <p>A fixed pool of workers prevents <strong>Goroutine Exhaustion</strong> and provides implicit rate limiting.</p>
        <CodeBlock>{`func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        results <- j * 2
    }
}

func Main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // Send jobs...
    close(jobs)
}`}</CodeBlock>

        <h4 className="font-bold mt-4 mb-2">Pattern: Pipelines (Fan-in / Fan-out)</h4>
        <p>
          Pipelines split processing into stages connected by channels. 
          <strong>Fan-out</strong>: One stage starts multiple goroutines to handle one task. 
          <strong>Fan-in</strong>: One stage combines results from multiple sources into a single stream.
        </p>

        <h4 className="font-bold mt-4 mb-2">Robust Concurrency: errgroup</h4>
        <p>
          The <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">errgroup</code> package is the Staff-level way to manage groups of goroutines. 
          If one fails, the entire context is canceled automatically, stopping the rest of the work.
        </p>
        <CodeBlock>{`g, ctx := errgroup.WithContext(ctx)

for _, url := range urls {
    url := url // avoid closure capture issues
    g.Go(func() error {
        return fetchURL(ctx, url)
    })
}

if err := g.Wait(); err != nil {
    return err // handles first error and cleans up others
}`}</CodeBlock>
      </DeepDive>
    </div>
  )
}
