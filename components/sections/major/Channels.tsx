import { CodeBlock, Tip, Warning, ComparisonTable } from '@/components/ui'

export function Channels() {
  return (
    <div>
      <h3 id="channels-communication-between-goroutines" className="text-[#5f6368] text-xl font-semibold mt-6">
        2. Channels - Communication Between Goroutines
      </h3>

      <CodeBlock>{`// Unbuffered channel (synchronous)
ch := make(chan int)

// Buffered channel (can hold 100 messages)
chBuffered := make(chan int, 100)`}</CodeBlock>

      <CodeBlock>{`// Send a value
ch <- 42

// Receive a value
val := <-ch

// Close channel when done
close(ch)`}</CodeBlock>

      <h4 className="font-semibold mt-4">Channel States & Behavior</h4>
      <ComparisonTable>
        <thead><tr><th>Operation</th><th>Nil Channel</th><th>Closed Channel</th><th>Open Channel</th></tr></thead>
        <tbody>
          <tr><td><strong>Send</strong></td><td>Blocks forever</td><td><span className="text-red-600 font-bold">Panic</span></td><td>Blocks if full</td></tr>
          <tr><td><strong>Receive</strong></td><td>Blocks forever</td><td>Zero value (no block)</td><td>Blocks if empty</td></tr>
          <tr><td><strong>Close</strong></td><td><span className="text-red-600 font-bold">Panic</span></td><td><span className="text-red-600 font-bold">Panic</span></td><td>Success</td></tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-4">Safe Receiving</h4>
      <p>Use the comma-ok idiom to check if the channel was closed.</p>
      <CodeBlock>{`val, ok := <-ch
if !ok {
    fmt.Println("Channel closed!")
}`}</CodeBlock>

      <h4 className="font-semibold mt-4">Select — Waiting for Multiple Channels</h4>
      <CodeBlock>{`select {
case msg := <-ch1:
    fmt.Println("Received from ch1:", msg)
case msg := <-ch2:
    fmt.Println("Received from ch2:", msg)
case <-time.After(time.Second):
    fmt.Println("Timeout!")
default:
    // Optional: runs if no case is ready (non-blocking)
    fmt.Println("Nothing ready")
}`}</CodeBlock>

      <Warning>
        <strong>Rules of Thumb:</strong>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>Only the <strong>sender</strong> should close the channel.</li>
          <li>Never close a channel that has multiple senders.</li>
          <li>Closing is only necessary when the receiver must be told no more values are coming (like in a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">for range</code> loop).</li>
        </ul>
      </Warning>

      <Tip>
        <strong>Don&apos;t communicate by sharing memory; share memory by communicating.</strong>
      </Tip>
    </div>
  )
}
