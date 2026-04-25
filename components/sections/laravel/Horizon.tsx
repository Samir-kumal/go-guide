'use client'

import { CodeBlock, Note, Tip, ComparisonTable } from '@/components/ui'

export function HorizonTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="horizon" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Horizon (Queue Dashboard) - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Horizon and why use it?</li>
            <li>2. Installation and setup</li>
            <li>3. Dashboard features</li>
            <li>4. Configuration (code-driven)</li>
            <li>5. Supervisor configuration</li>
            <li>6. Auto-balancing workers</li>
            <li>7. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Laravel Horizon inside and out,
          with comparisons to Go worker pools and Node.js Bull queue!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Horizon and Why Use It?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel Queues = A task list that workers pull from</li>
            <li>Horizon = A beautiful dashboard that shows you exactly what's happening with your tasks</li>
            <li>Supervisors = The manager that decides how many workers to run</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel Horizon provides a beautiful dashboard and code-driven configuration for your Laravel powered Redis queues.
          It allows you to easily monitor key metrics of your queue system such as job throughput, runtime, and job failures.
        </p>

        <Tip>
          <strong>AHA Moment:</strong> Horizon is to Laravel queues what <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PM2</code> is to Node.js processes,
          but specifically designed for background jobs with Redis!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Installation and Setup
        </h3>

        <p className="text-[#5f6368] mt-2">
          Install Horizon via Composer and publish its assets:
        </p>

        <CodeBlock>{`composer require laravel/horizon

php artisan horizon:install`}</CodeBlock>

        <p className="text-[#5f6368] mt-4">
          This creates the configuration file at <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">config/horizon.php</code>.
        </p>

        <Note>
          <strong>Note:</strong> Horizon requires Redis to be installed and configured. Make sure your <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">config/database.php</code> has Redis configured.
        </Note>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Dashboard Features
        </h3>

        <p className="text-[#5f6368] mt-2">
          Horizon provides a beautiful UI with these key features:
        </p>

        <ul className="list-disc list-inside text-[#5f6368] mt-4 space-y-2">
          <li><strong>Job Throughput</strong> - See how many jobs are processed per minute</li>
          <li><strong>Runtime Metrics</strong> - Track how long jobs take to complete</li>
          <li><strong>Job Failures</strong> - View failed jobs with full stack traces</li>
          <li><strong>Queue Status</strong> - See pending, processing, and completed jobs</li>
          <li><strong>Worker Status</strong> - Monitor which workers are running</li>
        </ul>

        <p className="text-[#5f6368] mt-4">
          Access the dashboard at <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/horizon</code> (add route to your auth or protect with middleware).
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Configuration (Code-driven)
        </h3>

        <p className="text-[#5f6368] mt-2">
          All of your worker configuration is stored in a single, simple configuration file (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">config/horizon.php</code>).
          This is one of Horizon's superpowers - your entire queue infrastructure is version-controlled!
        </p>

        <CodeBlock>{`'environments' => [
    'production' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue' => ['default', 'notifications'],
            'balance' => 'auto',
            'minProcesses' => 1,
            'maxProcesses' => 10,
            'tries' => 3,
            'timeout' => 60,
        ],
        'supervisor-2' => [
            'connection' => 'redis',
            'queue' => ['emails'],
            'balance' => 'simple',
            'processes' => 3,
            'tries' => 5,
        ],
    ],
    'local' => [
        'supervisor-1' => [
            'connection' => 'redis',
            'queue' => ['default'],
            'balance' => 'auto',
            'minProcesses' => 1,
            'maxProcesses' => 3,
        ],
    ],
],`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Configure Your First Supervisor</p>
          <p className="mt-2 text-sm">Add a supervisor configuration to your horizon.php:</p>
          <CodeBlock>{`'production' => [
    'email-worker' => [
        'connection' => 'redis',
        'queue' => 'emails',
        'balance' => 'auto',
        'minProcesses' => 2,
        'maxProcesses' => 8,
        'tries' => 3,
        'timeout' => 300, // 5 minutes for email sending
    ],
],`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Supervisor Configuration Deep Dive
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Balance Strategies</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Description</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>auto</code></td>
              <td>Scale workers based on queue load</td>
              <td>Variable workloads, cost optimization</td>
            </tr>
            <tr>
              <td><code>simple</code></td>
              <td>Fixed number of processes</td>
              <td>Predictable workloads</td>
            </tr>
            <tr>
              <td><code>false</code></td>
              <td>Single worker, sequential</td>
              <td>Testing, low traffic</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Key Configuration Options</h4>

        <CodeBlock>{`'supervisor-name' => [
    'connection' => 'redis',           // Queue connection
    'queue' => ['default', 'high'],   // Queues to listen to
    'balance' => 'auto',               // Balance strategy
    'minProcesses' => 1,               // Minimum workers
    'maxProcesses' => 10,              // Maximum workers
    'tries' => 3,                      // Retry failed jobs
    'timeout' => 60,                   // Job timeout in seconds
    'sleep' => 3,                      // Sleep when no jobs
    'maxTime' => 0,                    // Max runtime (0 = unlimited)
    'maxTries' => null,                // Max attempts per job
    'force' => false,                  // Run in foreground
],`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"balance => 'auto'"}</code> for cost optimization - it scales workers up during busy periods and down when idle!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Auto-balancing Workers
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Manual workers = Hiring a fixed number of employees (expensive when idle)</li>
            <li>Auto-balancing = Having an on-call team that expands during rush hour</li>
            <li>minProcesses = Minimum staff always on duty</li>
            <li>maxProcesses = Maximum staff during peak times</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Horizon's auto-balancing feature automatically scales worker processes up or down based on the number of pending jobs.
          This is incredibly valuable for:
        </p>

        <ul className="list-disc list-inside text-[#5f6368] mt-4 space-y-2">
          <li>Handling traffic spikes (flash sales, viral content)</li>
          <li>Cost optimization (fewer workers during off-peak)</li>
          <li>Processing time optimization (more workers = faster processing)</li>
        </ul>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            This is the equivalent of having a beautiful UI for <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">BullBoard</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PM2</code> metrics,
            but specifically for your background jobs. It allows for "Auto-balancing", which means it will scale worker processes up or down based on the number of pending jobs.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Horizon</th>
              <th>Go Worker Pools</th>
              <th>Node.js Bull</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dashboard</td>
              <td>Built-in beautiful UI</td>
              <td>Custom implementation</td>
              <td>BullBoard (optional)</td>
            </tr>
            <tr>
              <td>Auto-scaling</td>
              <td>Built-in (auto balance)</td>
              <td>Manual implementation</td>
              <td>Custom implementation</td>
            </tr>
            <tr>
              <td>Configuration</td>
              <td>Code-driven (PHP)</td>
              <td>Code (Go)</td>
              <td>Code (JS/TS)</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>Redis</td>
              <td>Custom (Redis, DB, etc)</td>
              <td>Redis</td>
            </tr>
            <tr>
              <td>Job retries</td>
              <td>Built-in</td>
              <td>Manual implementation</td>
              <td>Built-in</td>
            </tr>
            <tr>
              <td>Monitoring</td>
              <td>Throughput, runtime, failures</td>
              <td>Custom metrics</td>
              <td>Basic metrics</td>
            </tr>
            <tr>
              <td>Supervisors</td>
              <td>Named supervisor configs</td>
              <td>Goroutine pools</td>
              <td>Worker processes</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Worker Pool Example</h4>

        <CodeBlock>{`// Go: Manual worker pool implementation
type Job struct {
    ID   int
    Data string
}

type WorkerPool struct {
    workers int
    jobs    chan Job
    results chan string
}

func NewWorkerPool(workers int) *WorkerPool {
    return &WorkerPool{
        workers: workers,
        jobs:    make(chan Job, 100),
        results: make(chan string, 100),
    }
}

func (wp *WorkerPool) Start() {
    for i := 0; i < wp.workers; i++ {
        go func(workerID int) {
            for job := range wp.jobs {
                result := processJob(job)
                wp.results <- result
            }
        }(i)
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js Bull Example</h4>

        <CodeBlock>{`// Node.js: Bull queue setup
const Queue = require('bull');
const emailQueue = new Queue('emails', 'redis://localhost:6379');

// Producer
emailQueue.add({
    to: 'user@example.com',
    subject: 'Welcome!',
    body: 'Hello from Bull!'
});

// Worker
emailQueue.process(async (job) => {
    await sendEmail(job.data);
    return { sent: true };
});

// BullBoard for dashboard
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const bullBoard = createBullBoard([
    { name: 'emails', adapter: BullAdapter(emailQueue) }
]);`}</CodeBlock>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Horizon provides built-in dashboard - no custom UI needed!</li>
            <li>Code-driven config means version control for infrastructure</li>
            <li>Auto-balancing scales workers based on queue load</li>
            <li>Go requires manual implementation of all these features</li>
            <li>Node.js Bull needs extra setup (BullBoard) for dashboard</li>
            <li>All three use Redis as the backing store</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}