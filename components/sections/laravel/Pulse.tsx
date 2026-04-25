'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function PulseTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="pulse-tutorial" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Pulse - Health Monitoring Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Laravel Pulse?</li>
            <li>2. Dashboard & Cards</li>
            <li>3. Out-of-the-box metrics</li>
            <li>4. Custom Cards</li>
            <li>5. Configuration & Storage</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Laravel Pulse for health monitoring, 
          with comparisons to Go metrics libraries and Node.js Prometheus!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Laravel Pulse?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Pulse = Your application&apos;s health dashboard - like a fitness tracker for your app</li>
            <li>Cards = Individual metrics displays - like heart rate, steps, sleep quality</li>
            <li>Livewire components = Dynamic widgets that update in real-time</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel Pulse provides at-a-glance insights into your application&apos;s performance and usage. 
          It allows you to monitor slow routes, heavy jobs, and system health in real-time.
        </p>

        <p className="text-[#5f6368] mt-4">
          Think of it as a built-in observability solution - no need to set up external services 
          like DataDog or New Relic for basic health monitoring!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Dashboard & Cards
        </h3>

        <p className="text-[#5f6368] mt-3">
          Pulse uses &quot;Cards&quot; to display different metrics. You can customize the layout 
          and even create your own cards using Livewire.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Basic Dashboard Setup</h4>
        
        <CodeBlock>{`<x-pulse>
    <livewire:pulse.usage cols="4" rows="2" />
    <livewire:pulse.slow-queries expand />
    <livewire:pulse.exceptions />
</x-pulse>`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Card Configuration Options</h4>
        
        <CodeBlock>{`// Grid layout options
cols="4"  // Number of columns (1-12)
rows="2"  // Number of rows
expand   // Expand to full width

// Dashboard configuration
<x-pulse>
    <livewire:pulse.requests cols="6" />
    <livewire:pulse.slow-queries cols="3" />
    <livewire:pulse.exceptions cols="3" />
</x-pulse>`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Build Your Dashboard</p>
          <p className="mt-2 text-sm">Create a custom Pulse dashboard:</p>
          <CodeBlock>{`<x-pulse>
    {{-- Usage overview --}}
    <livewire:pulse.usage cols="12" />

    {{-- Performance metrics --}}
    <livewire:pulse.slow-queries expand />
    <livewire:pulse.slow-requests expand />

    {{-- System health --}}
    <livewire:pulse.exceptions />
    <livewire:pulse.scheduled-tasks expand />
</x-pulse>`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Out-of-the-box Metrics
        </h3>

        <p className="text-[#5f6368] mt-3">
          Pulse comes with several built-in cards for common monitoring needs:
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Card</th>
              <th>What it monitors</th>
              <th>Use case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>usage</td>
              <td>CPU, memory, disk usage</td>
              <td>Server health</td>
            </tr>
            <tr>
              <td>slow-queries</td>
              <td>Database queries exceeding threshold</td>
              <td>Performance debugging</td>
            </tr>
            <tr>
              <td>slow-requests</td>
              <td>HTTP requests exceeding threshold</td>
              <td>API performance</td>
            </tr>
            <tr>
              <td>exceptions</td>
              <td>Unhandled exceptions</td>
              <td>Error tracking</td>
            </tr>
            <tr>
              <td>scheduled-tasks</td>
              <td>Task execution times</td>
              <td>Cron job monitoring</td>
            </tr>
            <tr>
              <td>queues</td>
              <td>Job queue performance</td>
              <td>Background job monitoring</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Enabling Metrics</h4>
        
        <p className="text-[#5f6368] mt-2">
          Most metrics require minimal configuration. Add the card to your dashboard 
          and Pulse will start collecting data automatically!
        </p>

        <CodeBlock>{`// Database migration for storing metrics
php artisan pulse:install

// Publish configuration
php artisan vendor:publish --tag=pulse-config

// Clear and refresh recorded data
php artisan pulse:clear`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Run <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">php artisan pulse:install</code> first to set up the database tables for storing metrics!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Custom Cards
        </h3>

        <p className="text-[#5f6368] mt-3">
          Creating a custom card is as simple as creating a Livewire component that extends the Pulse Card class.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Basic Custom Card</h4>
        
        <CodeBlock>{`namespace App\\Livewire\\Pulse;

use Laravel\\Pulse\\Livewire\\Card;
use Livewire\\Attributes\\Lazy;

#[Lazy]
class TopSellers extends Card
{
    public function render()
    {
        return view('livewire.pulse.top-sellers');
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Blade View for Card</h4>
        
        <CodeBlock>{`{{-- resources/views/livewire/pulse/top-sellers.blade.php --}}

<div {{ $attributes->only('class') }}>
    <div class="flex items-center gap-2">
        <x-pulse::icon name="chart-bar" class="h-5 w-5" />
        <span>Top Sellers</span>
    </div>

    <ul class="mt-2 space-y-1">
        @foreach($this->topSellers() as $seller)
            <li>{{ $seller->name }} - {{ $seller->sales }} sales</li>
        @endforeach
    </ul>
</div>`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Adding to Dashboard</h4>
        
        <CodeBlock>{`<x-pulse>
    <livewire:pulse.usage cols="4" />
    <livewire:pulse.top-sellers cols="4" />
</x-pulse>`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create a Custom Card</p>
          <p className="mt-2 text-sm">Create a custom metric card for API request counts:</p>
          <CodeBlock>{`namespace App\\Livewire\\Pulse;

use App\\Services\\ApiMetrics;
use Laravel\\Pulse\\Livewire\\Card;
use Livewire\\Attributes\\Lazy;

#[Lazy]
class ApiRequests extends Card
{
    public function render()
    {
        $metrics = app(ApiMetrics::class);

        return view('livewire.pulse.api-requests', [
            'total' => $metrics->getTotalRequests(),
            'byEndpoint' => $metrics->getRequestsByEndpoint(),
        ]);
    }
}`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Configuration & Storage
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Configuration File</h4>
        
        <p className="text-[#5f6368] mt-2">
          Publish the config to customize thresholds and behavior:
        </p>

        <CodeBlock>{`// config/pulse.php

return [
    'storage' => [
        'database' => [
            'connection' => env('DB_CONNECTION', 'mysql'),
            'table' => 'pulse_entries',
        ],
    ],

    'ignore' => [
        // Ignore these paths
        '/up',           // Health check
        '/horizon/*',    // Horizon routes
    ],

    'slow_threshold' => 1000, // 1 second
    'slow_ignore' => [],
];`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using Different Storage</h4>
        
        <CodeBlock>{`// config/pulse.php - Redis storage for better performance

'storage' => [
    'redis' => [
        'connection' => env('PULSE_REDIS_CONNECTION', 'default'),
        'database' => env('PULSE_REDIS_DATABASE', 1),
    ],
],

// Or SQLite for single-server setups
'storage' => [
    'database' => [
        'connection' => 'sqlite',
        'table' => 'pulse_entries',
    ],
],`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> For multi-server deployments, use Redis for Pulse storage to ensure all servers report to the same data store. Using the default database can cause inconsistent metrics!
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <p className="text-[#5f6368] mt-3">
          Let&apos;s compare Laravel Pulse to Go metrics libraries and Node.js Prometheus integration!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Pulse</th>
              <th>Go (Prometheus)</th>
              <th>Node.js (prom-client)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Setup complexity</td>
              <td>Zero-config</td>
              <td>Manual instrumentation</td>
              <td>Manual setup</td>
            </tr>
            <tr>
              <td>Dashboard</td>
              <td>Built-in UI</td>
              <td>Grafana required</td>
              <td>Grafana required</td>
            </tr>
            <tr>
              <td>Custom metrics</td>
              <td>Livewire component</td>
              <td>Code instrumentation</td>
              <td>Code instrumentation</td>
            </tr>
            <tr>
              <td>Data storage</td>
              <td>DB/Redis</td>
              <td>Prometheus TSDB</td>
              <td>Prometheus TSDB</td>
            </tr>
            <tr>
              <td>Real-time</td>
              <td>Yes (polling)</td>
              <td>Yes (push/pull)</td>
              <td>Yes (push/pull)</td>
            </tr>
            <tr>
              <td>HTTP metrics</td>
              <td>Automatic</td>
              <td>Middleware</td>
              <td>Middleware</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Prometheus Example</h4>
        
        <CodeBlock>{`// Go with Prometheus
import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promhttp"
)

var httpRequests = prometheus.NewCounterVec(
    prometheus.CounterOpts{
        Name: "http_requests_total",
        Help: "Total HTTP requests",
    },
    []string{"method", "endpoint"},
)

func init() {
    prometheus.Register(httpRequests)
}

// In your handler:
httpRequests.WithLabelValues(r.Method, r.URL.Path).Inc()`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js Prometheus Example</h4>
        
        <CodeBlock>{`// Node.js with prom-client
const { Counter, Histogram, Registry } = require('prom-client');
const register = new Registry();

const httpRequests = new Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'endpoint'],
    registers: [register],
});

// In Express middleware:
app.use((req, res, next) => {
    httpRequests.inc({ method: req.method, endpoint: req.path });
    next();
});`}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel Pulse is designed for Laravel developers who want quick insights without 
            external services. Go and Node.js require more setup but offer more flexibility 
            with Prometheus/Grafana integration for production-grade observability.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Advanced: Custom Metric Recording
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Recording Custom Metrics</h4>
        
        <CodeBlock>{`// Using Pulse's timing helper
use Laravel\\Pulse\\Jobs\\RecordPulse;

dispatch(new RecordPulse(
    'top-users',           // Graph name
    'count',               // Type: count, value, timing
    now()->getTimestamp(), // Timestamp
    42,                    // Value
    ['period' => 'hour']   // Tags
));`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Accessing Recorded Data</h4>
        
        <CodeBlock>{`// Retrieve recorded data for your custom card
public function users()
{
    return Cache::remember('pulse:top-users', 60, function () {
        return DB::table('pulse_entries')
            ->where('name', 'top-users')
            ->where('timestamp', '>', now()->subHour())
            ->orderByDesc('value')
            ->limit(10)
            ->get();
    });
}`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> This is like having a lightweight, built-in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">New Relic</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Datadog</code> for your Laravel application. It&apos;s perfect for quickly identifying performance bottlenecks.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Summary
        </h3>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Pulse is Laravel&apos;s built-in health monitoring dashboard</li>
            <li>Zero-config setup with built-in metrics (slow queries, exceptions, etc.)</li>
            <li>Cards are Livewire components that display metrics</li>
            <li>Custom cards can be created by extending the Card class</li>
            <li>Use Redis for multi-server deployments</li>
            <li>Comparable to Prometheus for Go/Node.js, but Laravel-integrated</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}