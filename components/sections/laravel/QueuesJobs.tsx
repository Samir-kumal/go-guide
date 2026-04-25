'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function QueuesJobsTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="queues-jobs" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Queues & Jobs - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are queues & why use them?</li>
            <li>2. Creating & dispatching jobs</li>
            <li>3. Queue drivers & configuration</li>
            <li>4. Job chaining & batching</li>
            <li>5. Failed job handling</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel queues, understand 
          how they compare to Go worker pools and Node.js BullMQ!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Queues & Why Use Them?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Queue = A restaurant's ticket rail - orders go in, chefs pick them up when ready</li>
            <li>Job = A single ticket with all the order details</li>
            <li>Worker = The chef who processes each ticket</li>
            <li>Queue driver = How tickets are transported (in-person, to-go, delivery)</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel queues allow you to defer time-consuming tasks, such as sending an email 
          or processing a file, until a later time. This drastically speeds up web requests 
          to your application!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Why Use Queues?</h4>

        <CodeBlock>{`// WITHOUT queues - user waits for everything!
public function submitOrder(Request $request)
{
    // User waits here while we process...
    $this->processPayment($request->amount);
    $this->sendConfirmationEmail($request->email);
    $this->generateInvoice($request->id);
    $this->updateInventory($request->items);
    
    return 'Done!'; // Finally respond
}

// WITH queues - user gets instant response!
public function submitOrder(Request $request)
{
    // Dispatch to queue - user doesn't wait!
    ProcessOrder::dispatch($request->all());
    
    return 'Order received!'; // Instant response
}`}</CodeBlock>

        <Tip>
          <strong>AHA Moment:</strong> The key is identifying which tasks CAN wait (email, invoicing) 
          vs which MUST wait (payment confirmation). Only defer non-critical operations!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Creating & Dispatching Jobs
        </h3>

        <p className="text-[#5f6368] mt-4">
          Jobs are classes that encapsulate the logic for a delayed task.
        </p>

        <CodeBlock>{`# php artisan make:job ProcessPodcast

class ProcessPodcast implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(AudioProcessor $processor): void
    {
        $processor->process($this->podcast);
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Dispatching Methods</h4>

        <CodeBlock>{`// 1. Immediate dispatch
ProcessPodcast::dispatch($podcast);

// 2. Delayed dispatch (process after 10 minutes)
ProcessPodcast::dispatch($podcast)->delay(now()->addMinutes(10));

// 3. Specific queue
ProcessPodcast::dispatch($podcast)->onQueue('processing');

// 4. With chain (multiple jobs in sequence)
ProcessPodcast::dispatch($podcast)
    ->delay(now()->addMinutes(10))
    ->onQueue('processing');

// 5. Dispatch sync (run immediately, not queued)
ProcessPodcast::dispatchSync($podcast);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Queued vs Sync</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Queued</th>
              <th>Sync</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Response time</td>
              <td>Instant</td>
              <td>Wait for completion</td>
            </tr>
            <tr>
              <td>Reliability</td>
              <td>Retries on failure</td>
              <td>If it fails, it fails</td>
            </tr>
            <tr>
              <td>Scaling</td>
              <td>Multiple workers</td>
              <td>Single thread</td>
            </tr>
            <tr>
              <td>Use case</td>
              <td>Email, webhooks</td>
              <td>Critical operations</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Dispatch a Job</p>
          <p className="mt-2 text-sm">Practice dispatching jobs with different options:</p>
          <CodeBlock>{`// Create a job with artisan:
// php artisan make:job SendWelcomeEmail

// Then dispatch it!
// Immediate
SendWelcomeEmail::dispatch($user);

// Delayed (wait 1 hour)
SendWelcomeEmail::dispatch($user)->delay(now()->addHour());

// On specific queue
SendWelcomeEmail::dispatch($user)->onQueue('emails');`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Queue Drivers & Configuration
        </h3>

        <p className="text-[#5f6368] mt-4">
          Laravel supports multiple queue drivers. Choose based on your needs:
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Setup</th>
              <th>Pros</th>
              <th>Cons</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sync</td>
              <td>None</td>
              <td>Simple, no setup</td>
              <td>No real queuing</td>
              <td>Local dev, testing</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>Migration</td>
              <td>Reliable, no external deps</td>
              <td>Needs DB connection</td>
              <td>Medium apps</td>
            </tr>
            <tr>
              <td>Redis</td>
              <td>Redis server</td>
              <td>Fast, scalable</td>
              <td>Needs Redis</td>
              <td>High traffic apps</td>
            </tr>
            <tr>
              <td>SQS</td>
              <td>AWS account</td>
              <td>Managed, scalable</td>
              <td>Cost per request</td>
              <td>AWS deployments</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Configuration</h4>

        <CodeBlock>{`// config/queue.php
'sync' => [
    'driver' => 'sync',
],

'database' => [
    'driver' => 'database',
    'table' => 'jobs',
    'queue' => 'default',
    'retry_after' => 90,
],

'redis' => [
    'driver' => 'redis',
    'connection' => 'default',
    'queue' => 'default',
    'retry_after' => 90,
    'block_for' => null,
],`}</CodeBlock>

        <Note>
          <strong>Note:</strong> The retry_after setting defines how long a job can run before being considered "failed" 
          and retried. Set this higher than your longest-running job!
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Starting Workers</h4>

        <CodeBlock>{`# Start a worker (processes default queue)
php artisan queue:work

# Start a worker with specific queue
php artisan queue:work --queue=emails

# Start multiple workers (in production!)
php artisan queue:work --queue=emails,processing --concurrency=5

# Process failed jobs
php artisan queue:retry

# Retry all failed jobs
php artisan queue:retry --all`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Job Chaining & Batching
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Job Chains</h4>

        <p className="text-[#5f6368] mt-2">
          Run multiple jobs in sequence:
        </p>

        <CodeBlock>{`ProcessPodcast::withChain([
    new NotifyUsersJob($podcast),
    new UpdateStatisticsJob($podcast->id),
    new CleanupTempFilesJob($podcast->id),
])->dispatch($podcast);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Job Batches</h4>

        <p className="text-[#5f6368] mt-2">
          Process jobs in groups:
        </p>

        <CodeBlock>{`// Import thousands of podcasts in batches
$podcasts = Podcast::where('imported', false)->get();

Bus::batch([
    new ImportPodcastsBatch($podcasts->chunk(1000)),
])->dispatch();`}</CodeBlock>

        <CodeBlock>{`// Or using the batch helpers
$batch = Bus::batch($jobs)
    ->name('Import podcasts')
    ->dispatch();

Log::info('Batch ID: ' . $batch->id);`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Use batches when you need to process many items but don't need 
          them to run strictly in sequence. Much faster than chaining!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Failed Job Handling
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Retry Logic</h4>

        <CodeBlock>{`class ProcessPodcast implements ShouldQueue
{
    public int $tries = 3;
    public int $backoff = 30; // seconds
    
    // OR with exponential backoff:
    public array $backoff = [
        30,    // First retry: 30 seconds
        60,    // Second retry: 1 minute  
        120,   // Third retry: 2 minutes
    ];
    
    public function failed(\Throwable $exception): void
    {
        // Called when all retries exhausted!
        Log::error('Podcast processing failed!', [
            'podcast' => $this->podcast->id,
            'error' => $exception->getMessage(),
        ]);
        
        // Notify team, refund user, etc.
    }
}`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Always implement the failed() method for critical jobs. 
          How else will you know something went wrong?
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Monitoring Failed Jobs</h4>

        <CodeBlock>{`// Failed jobs table (run migration)
// php artisan queue:failed-table
// php artisan migrate

// View failed jobs
php artisan queue:failed

// Retry specific job
php artisan queue:retry {id}

// Retry all
php artisan queue:retry --all

// Delete failed job
php artisan queue:forget {id}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Preventing Failures</h4>

        <CodeBlock>{`// Check before processing!
public function handle(): void
{
    if (!$this->audioProcessor->isAvailable()) {
        // Release back to queue instead of failing
        $this->release(30); // retry in 30 seconds
        return;
    }
    
    $this->process($this->podcast);
}`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <p className="text-[#5f6368] mt-4">
          Let's see how Laravel queues compare to other ecosystems!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel</th>
              <th>Go</th>
              <th>Node.js (BullMQ)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Queue setup</td>
              <td>Config file</td>
              <td>Custom + Redis</td>
              <td>Redis required</td>
            </tr>
            <tr>
              <td>Job creation</td>
              <td>Class with handle()</td>
              <td>Function/struct</td>
              <td>Class with process()</td>
            </tr>
            <tr>
              <td>Dispatching</td>
              <td>::dispatch()</td>
              <td>channel</td>
              <td>myQueue.add()</td>
            </tr>
            <tr>
              <td>Workers</td>
              <td>queue:work</td>
              <td>goroutines</td>
              <td>Workers</td>
            </tr>
            <tr>
              <td>Retry config</td>
              <td>$tries, $backoff</td>
              <td>Manual check</td>
              <td>maxRetries</td>
            </tr>
            <tr>
              <td>Chaining</td>
              <td>withChain()</td>
              <td>Channels</td>
              <td>Flows</td>
            </tr>
            <tr>
              <td>Batching</td>
              <td>Bus::batch()</td>
              <td>sync.WaitGroup</td>
              <td>Batch</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Worker Pattern</h4>

        <CodeBlock>{`// Go: Manual worker implementation
func worker(jobs <-chan Job, results chan<- Result) {
    for job := range jobs {
        result := process(job)
        results <- result
    }
}

func main() {
    jobs := make(chan Job, 100)
    results := make(chan Result, 100)
    
    // Start 5 workers
    for i := 0; i < 5; i++ {
        go worker(jobs, results)
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js BullMQ</h4>

        <CodeBlock>{`// Node.js: BullMQ
const { Queue, Worker } = require('bullmq');

const emailQueue = new Queue('emails');

const worker = new Worker('emails', async job => {
    await sendEmail(job.data);
}, {
    concurrency: 5,
    limiter: {
        max: 10,
        duration: 1000,
    }
});

// Dispatch
await emailQueue.add('welcome', { userId: 123 });`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs BullMQ</h4>

        <CodeBlock>{`// Laravel: Simpler syntax!
SendEmail::dispatch($user);

// BullMQ: More verbose
await emailQueue.add('send-email', {
    userId: $user->id,
    template: 'welcome',
});

// But BullMQ gives you more control:
// - Rate limiting
// - Priorities  
// - More queue options`}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel queues have ZERO configuration for most drivers and a unified API. 
            Go requires more manual setup but gives you complete control. 
            BullMQ is powerful but more verbose - you configure everything.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          CHEAT SHEET: Queue Operations
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Create job</td>
              <td>php artisan make:job</td>
              <td>Generate job class</td>
            </tr>
            <tr>
              <td>Dispatch</td>
              <td>MyJob::dispatch()</td>
              <td>Add to queue</td>
            </tr>
            <tr>
              <td>Delay</td>
              <td>MyJob::delay(timestamp)</td>
              <td>Process later</td>
            </tr>
            <tr>
              <td>Specific queue</td>
              <td>MyJob::onQueue('name')</td>
              <td>Add to named queue</td>
            </tr>
            <tr>
              <td>Sync dispatch</td>
              <td>MyJob::dispatchSync()</td>
              <td>Run immediately</td>
            </tr>
            <tr>
              <td>Chain</td>
              <td>MyJob::withChain([])</td>
              <td>Run in sequence</td>
            </tr>
            <tr>
              <td>Batch</td>
              <td>Bus::batch()</td>
              <td>Run in group</td>
            </tr>
            <tr>
              <td>Start worker</td>
              <td>queue:work</td>
              <td>Process queue</td>
            </tr>
            <tr>
              <td>Retry</td>
              <td>queue:retry</td>
              <td>Retry failed</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Queues = Defer slow tasks, respond instantly</li>
            <li>Use ShouldQueue to make any job async</li>
            <li>Dispatch: immediate, delayed, or sync</li>
            <li>Workers process jobs from the queue</li>
            <li>Configure $tries and backoff for reliability</li>
            <li>Implement failed() to handle exhausted retries</li>
            <li>Chains run sequentially, batches run in parallel</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}