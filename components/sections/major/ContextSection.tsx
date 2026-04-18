import { CodeBlock, Tip } from '@/components/ui'

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
    </div>
  )
}
