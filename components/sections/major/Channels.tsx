import { CodeBlock, Tip, ComparisonTable } from '@/components/ui'

export function Channels() {
  return (
    <div>
      <h3 id="channels-communication-between-goroutines" className="text-[#5f6368] text-xl font-semibold mt-6">
        2. Channels - Communication Between Goroutines
      </h3>

      <CodeBlock>{`// Buffered channel (can hold 100 messages)
ch := make(chan int, 100)

// Unbuffered channel (synchronous)
ch := make(chan int)`}</CodeBlock>

      <CodeBlock>{`// Send a value
ch <- value

// Receive a value
value := <-ch

// Close channel when done
close(ch)`}</CodeBlock>

      <ComparisonTable>
        <thead><tr><th>Type</th><th>Behavior</th><th>Use Case</th></tr></thead>
        <tbody>
          <tr><td>Unbuffered</td><td>Send blocks until receiver ready</td><td>Tight synchronization</td></tr>
          <tr><td>Buffered</td><td>Send blocks only when buffer full</td><td>Async processing</td></tr>
        </tbody>
      </ComparisonTable>

      <h4 className="font-semibold mt-4">Select — Waiting for Multiple Channels</h4>
      <CodeBlock>{`select {
case msg := <-ch1:
    fmt.Println("Received from ch1:", msg)
case msg := <-ch2:
    fmt.Println("Received from ch2:", msg)
case <-time.After(time.Second):
    fmt.Println("Timeout!")
}`}</CodeBlock>

      <Tip>
        <strong>In short:</strong> Goroutines communicate via channels, share memory by communicating.
      </Tip>
    </div>
  )
}
