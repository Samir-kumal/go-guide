'use client'

import { CodeBlock, ComparisonGrid, Tip, Warning } from '@/components/ui'

export function ChannelsTutorial() {
  return (
    <section>
      <h2 className="text-[#1a73e8] mt-10 text-2xl font-semibold">
        📬 Channel Types — Part 7
      </h2>
      <p>
        Channels are the pipes that connect concurrent goroutines. They allow you to send
        and receive values between goroutines, coordinating their execution.
      </p>

      <h3 id="what-is-channel" className="text-[#5f6368]">What is a Channel?</h3>
      <p>
        Think of a channel like a <strong>conveyor belt</strong> or <strong>pipe</strong>:
      </p>
      <ul className="space-y-2 list-disc pl-5 mt-3">
        <li>
          <strong>One goroutine puts data</strong> on the conveyor belt (send)
        </li>
        <li>
          <strong>Another goroutine receives</strong> the data from the other end (receive)
        </li>
        <li>
          The conveyor belt can be <strong>buffered</strong> (has a queue) or{' '}
          <strong>unbuffered</strong> (synchronous)
        </li>
      </ul>

      <ComparisonGrid
        left={
          <div>
            <h4 className="font-bold">🐹 Go Channels</h4>
            <p>Built-in primitive for goroutine communication</p>
            <CodeBlock>{`ch := make(chan int)      // Create channel
ch <- 42                 // Send value
v := <-ch              // Receive value`}</CodeBlock>
          </div>
        }
        right={
          <div>
            <h4 className="font-bold">📜 JavaScript</h4>
            <p>No direct equivalent — use workarounds</p>
            <CodeBlock>{`// Callback hell
doTask((result) => {
  doAnother(result, (more) => {
    // Nesting... 😰
  })
})

// Or Promise chains
doTask()
  .then(doAnother)
  .then(chainMore)`}</CodeBlock>
          </div>
        }
      />

      <h3 id="channel-types" className="text-[#5f6368]">Channel Types</h3>
      <p>Go has three types of channels:</p>

      <div className="space-y-4 mt-4">
        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold text-[#1a73e8]">
            1. chan T — Bidirectional Channel
          </h4>
          <p className="mt-2">
            Can both send and receive. Most common type.
          </p>
          <CodeBlock>{`ch := make(chan string)
ch <- "hello"  // Send
msg := <-ch    // Receive`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold text-[#1a73e8]">
            {'\u0032.'}. chan← T — Send-Only Channel
          </h4>
          <p className="mt-2">
            Can only send values into the channel. Useful for function parameters to
            guarantee a function only sends, never receives.
          </p>
          <CodeBlock>{`func producer(ch chan<- int) {
    // Can send
    ch <- 42
    // x := <-ch // ❌ Compile error!
}

// Usage
ch := make(chan int)
producer(ch) // Send-only

// Or declare variable
var sendCh chan<- int
sendCh = make(chan int)`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold text-[#1a73e8]">
            {'\u0033.'}. ←chan T — Receive-Only Channel
          </h4>
          <p className="mt-2">
            Can only receive values. Useful for function parameters to guarantee
            a function only receives, never sends.
          </p>
          <CodeBlock>{`func consumer(ch <-chan int) {
    // Can receive
    x := <-ch
    fmt.Println(x)
    // ch <- 100 // ❌ Compile error!
}

// Usage
ch := make(chan int)
go func() { ch <- 42 }()
consumer(ch)

// Or declare variable
var recvCh <-chan int
recvCh = make(chan int)`}</CodeBlock>
        </div>
      </div>

      <h3 id="buffered" className="text-[#5f6368]">
        Buffered vs Unbuffered Channels
      </h3>

      <ComparisonGrid
        left={
          <div>
            <h4 className="font-bold">Unbuffered Channel</h4>
            <CodeBlock>{`ch := make(chan int)
      // Sender blocks until receiver is ready
      // Receiver blocks until sender sends
      // ✓ Synchronization point
      <-ch  // Blocks until someone sends`}</CodeBlock>
          </div>
        }
        right={
          <div>
            <h4 className="font-bold">Buffered Channel</h4>
            <CodeBlock>{`ch := make(chan int, 3) // Buffer of 3
      // Sender blocks only when buffer full
      // Can send 3 without receiver!
      ch <- 1
      ch <- 2
      ch <- 3`}</CodeBlock>
          </div>
        }
      />

      <Tip>
        <strong>When to use buffered:</strong>
        <ul className="mt-2 list-disc pl-5">
          <li>Know buffer size upfront — avoids blocking</li>
          <li>Batching — collect N items before processing</li>
          <li>Rate limiting — control throughput</li>
        </ul>
      </Tip>

      <h3 id="operations" className="text-[#5f6368]">Channel Operations</h3>

      <div className="space-y-6 mt-4">
        <div>
          <h4 className="font-bold">1. Send and Receive</h4>
          <CodeBlock>{`ch := make(chan string, 1)

// Send
ch <- "hello"

// Receive  
value := <-ch
fmt.Println(value) // "hello"`}</CodeBlock>
        </div>

        <div>
          <h4 className="font-bold">2. Close a Channel</h4>
          <CodeBlock>{`ch := make(chan int, 3)
ch <- 1
ch <- 2
ch <- 3
close(ch) // Close the channel

// Receiving from closed channel
for v := range ch {
    fmt.Println(v) // 1, 2, 3
}

// Check if closed with comma-ok idiom
ch2 := make(chan int)
close(ch2)
v, ok := <-ch2
fmt.Println(v, ok) // 0 false`}</CodeBlock>
          <Warning>
            <strong>Never send on a closed channel!</strong> This causes panic. Always close
            from the sender side.
          </Warning>
        </div>

        <div>
          <h4 className="font-bold">3. Range over Channel</h4>
          <CodeBlock>{`func main() {
    ch := make(chan int, 10)
    
    // Producer
    go func() {
        for i := 1; i <= 5; i++ {
            ch <- i
        }
        close(ch) // Important!
    }()
    
    // Consumer with range
    for v := range ch {
        fmt.Println(v)
    }
}`}</CodeBlock>
        </div>
      </div>

      <h3 id="select" className="text-[#5f6368]">Select Statement</h3>
      <p>
        Like a <strong>switch</strong>, but for channels. Allows{' '}
        <strong>multiplexing</strong> — waiting on multiple channel operations.
      </p>

      <div className="space-y-4 mt-4">
        <CodeBlock>{`select {
case msg := <-ch1:
    fmt.Println("Received from ch1:", msg)
case msg := <-ch2:
    fmt.Println("Received from ch2:", msg)
case <-timer:
    fmt.Println("Timeout!")
default:
    fmt.Println("No message ready")
}`}</CodeBlock>

        <CodeBlock>{`// Real-world: multiple goroutines
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)
    
    go func() { time.Sleep(100*time.Millisecond); ch1 <- "fast" }()
    go func() { time.Sleep(200*time.Millisecond); ch2 <- "slow" }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println(msg1)
        case msg2 := <-ch2:
            fmt.Println(msg2)
        }
    }
}`}</CodeBlock>
      </div>

      <h3 id="patterns" className="text-[#5f6368]">Channel Patterns</h3>

      <div className="space-y-6 mt-4">
        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold">Pattern 1: Worker Pool</h4>
          <p>
            Multiple workers processing from a shared channel. Classic pattern for parallel processing.
          </p>
          <CodeBlock>{`func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Send 9 jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Collect results
    for r := 1; r <= 9; r++ {
        fmt.Println(<-results)
    }
}

func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("worker %d processing job %d\\n", id, job)
        results <- job * 2
    }
}`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold">Pattern 2: Pipeline</h4>
          <p>
            Chain of stages where each stage transforms data and passes to the next.
          </p>
          <CodeBlock>{`func main() {
    // Stage 1: Generate numbers
    naturals := make(chan int)
    go func() {
        for i := 1; i <= 5; i++ {
            naturals <- i
        }
        close(naturals)
    }()
    
    // Stage 2: Square numbers
    squares := make(chan int)
    go func() {
        for n := range naturals {
            squares <- n * n
        }
        close(squares)
    }()
    
    // Stage 3: Print
    for s := range squares {
        fmt.Println(s)
    }
}`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold">Pattern 3: Fan-Out / Fan-In</h4>
          <p>
            <strong>Fan-out:</strong> One task sent to multiple workers.{' '}
            <strong>Fan-in:</strong> Results collected from multiple workers.
          </p>
          <CodeBlock>{`// Fan-out: send to multiple goroutines
func fanOut(in <-chan int, workers []chan<- int) {
    for v := range in {
        // Broadcast to ALL workers
        for _, w := range workers {
            w <- v
        }
    }
    // Close all workers when done
    for _, w := range workers {
        close(w)
    }
}

// Fan-in: collect from multiple sources
func fanIn(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)
    
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }
    
    go func() {
        wg.Wait()
        close(out)
    }()
    
    return out
}`}</CodeBlock>
        </div>
      </div>

      <h3 id="laravel-comparison" className="text-[#5f6368]">
        Laravel Comparison
      </h3>
      <ComparisonGrid
        left={
          <div>
            <h4 className="font-bold">🐹 Go Channels</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>chan</strong> — Direct, typed communication
              </li>
              <li>
                <strong>go func()</strong> — Lightweight coroutines
              </li>
              <li>
                <strong>sync.WaitGroup</strong> — Wait for completion
              </li>
              <li>
                <strong>select</strong> — Multi-plex multiple sources
              </li>
            </ul>
          </div>
        }
        right={
          <div>
            <h4 className="font-bold">💚 Laravel Queues & Events</h4>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>Queue::push()</strong> — Add to job queue
              </li>
              <li>
                <strong>async function</strong> — Background jobs
              </li>
              <li>
                <strong>Queue::size()</strong> — Worker pool size
              </li>
              <li>
                <strong>Event::fire()</strong> — Fire and forget
              </li>
            </ul>
          </div>
        }
      />

      <p className="mt-4 text-sm">
        <strong>Key difference:</strong> Go channels are <em>compositional</em> — you can pass
        channels as values, create them on the fly, and combine them with select. Laravel queues are
        queue-based and require external infrastructure (Redis, database, etc.).
      </p>

      <h3 id="gotchas" className="text-[#5f6368]">Channel Gotchas</h3>

      <Warning>
        <strong>Deadlock Warning!</strong>
      </Warning>
      <CodeBlock>{`// ❌ DANGER: All goroutines blocked!
func bad() {
    ch := make(chan int)
    <-ch  // Blocks forever - no sender!
    // fatal error: all goroutines are asleep - deadlock!
}`}</CodeBlock>

      <Warning>
        <strong>Send on Closed Channel!</strong>
      </Warning>
      <CodeBlock>{`// ❌ PANIC!
func bad() {
    ch := make(chan int)
    close(ch)
    ch <- 42 // panic: send on closed channel
}`}</CodeBlock>

      <Warning>
        <strong>Nil Channel Blocks Forever!</strong>
      </Warning>
      <CodeBlock>{`// ❌ Nil channel never becomes ready
func bad(ch chan int) {
    if ch == nil {
        ch = make(chan int) // Wrong time!
    }
    <-ch // Blocks before assignment
}`}</CodeBlock>

      <Tip>
        <strong>Best Practices:</strong>
        <ul className="mt-2 list-disc pl-5">
          <li>Close channel from the sender side only</li>
          <li>Use buffered channels when you know the buffer size</li>
          <li>Use select with default for non-blocking</li>
          <li>Always pair goroutines with channel operations</li>
        </ul>
      </Tip>

      <h3 id="cheat-sheet" className="text-[#1a73e8] text-xl font-semibold mt-10">
        📋 Channel Cheat Sheet
      </h3>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold mb-2">Create & Use</h4>
          <CodeBlock>{`// Unbuffered
ch := make(chan int)

// Buffered (capacity 10)
ch := make(chan int, 10)

// Send/Receive
ch <- value
value := <-ch

// Close
close(ch)`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold mb-2">Directional</h4>
          <CodeBlock>{`// Send-only
func send(ch chan<- int)

// Receive-only  
func receive(ch <-chan int)

// Can convert
bidirectional := make(chan int)
sendOnly := chan<- int(bidirectional)
recvOnly := <-chan int(bidirectional)`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold mb-2">Select</h4>
          <CodeBlock>{`select {
case <-ch1:
    // ch1 ready
case ch2 <- data:
    // sent to ch2
default:
    // none ready (non-blocking)
case <-time.After(1*time.Second):
    // timeout
}`}</CodeBlock>
        </div>

        <div className="border border-[#ddd] rounded-lg p-4">
          <h4 className="font-bold mb-2">Common Patterns</h4>
          <CodeBlock>{`// Range over channel
for v := range ch {
    use(v)
}

// Comma-ok idiom
for {
    v, ok := <-ch
    if !ok {
        break
    }
    use(v)
}

// Non-blocking receive
select {
case v := <-ch:
    use(v)
default:
    // nothing ready
}`}</CodeBlock>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#e8f5e9] rounded-lg">
        <h4 className="font-bold text-[#2e7d32]">Quick Reference</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          <code className="bg-white px-2 py-1 rounded text-sm">
            make(chan T)
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            make(chan T, n)
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            ch &lt;-
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            &lt;-ch
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            close(ch)
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            range ch
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            select
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            chan← 
          </code>
          <code className="bg-white px-2 py-1 rounded text-sm">
            ←chan
          </code>
        </div>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </section>
  )
}

export default ChannelsTutorial