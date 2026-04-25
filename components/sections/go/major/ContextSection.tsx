import { CodeBlock, Tip, DeepDive } from '@/components/ui'

export function ContextSection() {
  return (
    <div>
      <h3 id="context-cancellation-and-timeouts" className="text-[#5f6368] text-xl font-semibold mt-6">
        7. Context - Cancellation and Timeouts
      </h3>

      <CodeBlock>{`// Background - root context (never cancelled)
ctx := context.Background()

// With timeout
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

// With cancellation
ctx, cancel := context.WithCancel(context.Background())`}</CodeBlock>

      <h4 className="font-semibold mt-4">Using Context</h4>
      <CodeBlock>{`select {
case <-ctx.Done():
    return ctx.Err()
default:
    // Continue
}

rows, err := db.QueryContext(ctx, "SELECT ...")`}</CodeBlock>

      <h4 className="font-semibold mt-4">Context in HTTP Handlers</h4>
      <CodeBlock>{`func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()  // Already has request timeout
    result, err := fetchData(ctx, url)
}`}</CodeBlock>

      <Tip>
        <strong>In short:</strong> Pass context through your call chain for cancellation, not for data!
      </Tip>

      <DeepDive title="Propagation & Value Pitfalls">
        <h4 className="font-bold mb-2">Context Propagation in Microservices</h4>
        <p>
          In a distributed system, context should carry <strong>cancellation signals</strong> across network boundaries. 
          If Service A calls Service B, the timeout or cancellation in A should propagate to B (often via HTTP headers that B then injects into its own context). 
          This prevents <strong>Resource Exhaustion</strong> where downstream services waste CPU/RAM on requests that the upstream has already abandoned.
        </p>

        <h4 className="font-bold mt-4 mb-2">The context.Value Anti-Pattern</h4>
        <p>
          A common mistake is using <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">context.Value</code> as a global bucket for dependency injection (e.g., storing database connections or logger instances). 
          <strong>This makes your dependencies opaque and hard to test.</strong>
        </p>
        <p className="mt-2 italic text-sm">Best Practice: Only use values for <strong>request-scoped</strong> data that exists for the duration of the call:</p>
        <ul className="list-disc pl-5 my-2">
          <li>Correlation IDs (Request IDs)</li>
          <li>Authentication tokens / User claims</li>
          <li>Trace IDs for observability (OpenTelemetry)</li>
        </ul>

        <h4 className="font-bold mt-4 mb-2">Preventing Goroutine Leaks</h4>
        <p>
          Every goroutine started with a context must monitor <code className="bg-[#f5f5f5] px-1 px-0.5 rounded font-mono text-sm">ctx.Done()</code>. 
          Staff engineers use "cancellation trees" to ensure that when a parent request is finished, all associated child goroutines are terminated immediately, reclaiming memory.
        </p>
      </DeepDive>
    </div>
  )
}
