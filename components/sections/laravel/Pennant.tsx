'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function PennantTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="pennant-tutorial" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Pennant (Feature Flags) - The Complete Guide
        </h2>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are feature flags?</li>
            <li>2. Installing and configuring Pennant</li>
            <li>3. Defining features</li>
            <li>4. Checking feature states</li>
            <li>5. Built-in storages</li>
            <li>6. Rich values & A/B testing</li>
            <li>7. Go/Node.js comparison</li>
          </ul>
        </div>
        
        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel Pennant for feature flags, 
          gradual rollouts, and A/B testing with comparisons to Go and Node.js ecosystems!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Feature Flags?
        </h3>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Feature flags = Light switches that control who sees what in your app</li>
            <li>Boolean flags = ON/OFF switches for entire features</li>
            <li>Rich value flags = Dimmer switches that can be set to any level</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Feature flags let you toggle features on/off without deploying new code. 
          This is essential for:
        </p>
        <ul className="list-disc pl-6 mt-2 text-[#5f6368] space-y-1">
          <li>Gradual rollouts (1% → 10% → 50% → 100%)</li>
          <li>A/B testing (different users see different versions)</li>
          <li>Kill switches (quickly disable broken features)</li>
          <li>Beta testing (let specific users try new features)</li>
        </ul>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Traditional Flow vs Flag Flow</h4>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Without Flags (Deploy Required)</p>
            <CodeBlock>{`// Deploy to enable
if (app()->isProduction()) {
    showNewFeature();
}`}</CodeBlock>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">With Flags (Instant Control)</p>
            <CodeBlock>{`// No deploy needed
if (Feature::active('new-feature')) {
    showNewFeature();
}`}</CodeBlock>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Installing and Configuring Pennant
        </h3>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">Installation</h4>
        <p className="text-[#5f6368] mt-2">Install via Composer:</p>
        
        <CodeBlock>{`composer require laravel/pennant`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Publish Configuration</h4>
        <p className="text-[#5f6368] mt-2">Publish the config and migration:</p>
        
        <CodeBlock>{`php artisan vendor:publish --provider="Laravel\\Pennant\\PennantServiceProvider"`}</CodeBlock>

        <p className="text-[#5f6368] mt-2">Run migrations:</p>
        
        <CodeBlock>{`php artisan migrate`}</CodeBlock>

        <p className="text-[#5f6368] mt-2">
          This creates the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">feature_flags</code> table with columns: 
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">feature</code>, 
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">featureable_type</code>, 
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">featureable_id</code>, 
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">value</code>.
        </p>

        <Tip>
          <strong>Note:</strong> For simple boolean checks without database, use the in-memory driver. 
          Add <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">pennant</code> in config/app.php with driver array for testing.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Defining Features
        </h3>
        
        <p className="text-[#5f6368] mt-2">
          Features are defined using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Feature</code> facade or the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Pennant</code> Facade in a service provider.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Boolean Flags</h4>
        <p className="text-[#5f6368] mt-2">Return true/false based on user properties:</p>
        
        <CodeBlock>{`use Laravel\\Pennant\\Feature;

Feature::define('new-dashboard', function (User $user) {
    return $user->is_beta_tester;
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Percentage-based Rollout</h4>
        <p className="text-[#5f6368] mt-2">Gradually enable for percentage of users:</p>
        
        <CodeBlock>{`Feature::define('new-checkout', function (User $user) {
    return $user->id % 100 < 10; // 10% rollout
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Team-based Features</h4>
        <p className="text-[#5f6368] mt-2">Enable for entire teams:</p>
        
        <CodeBlock>{`Feature::define('enterprise-api', function (User $user) {
    return $user->team->is_enterprise;
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Registered Features (for multiple)</h4>
        <p className="text-[#5f6368] mt-2">Register all features in a service provider:</p>
        
        <CodeBlock>{`// AppServiceProvider boot() method
public function boot(): void
{
    Feature::define('new-ui', fn (User $user) => $user->is_beta_tester);
    Feature::define('dark-mode', fn (User $user) => $user->prefers_dark);
    Feature::define('ai-assistant', fn (User $user) => $user->has_ai_access);
}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Define Features</p>
          <p className="mt-2 text-sm">Practice defining feature flags:</p>
          <CodeBlock>{`// Exercise 1: Boolean flag for beta users
Feature::define('beta-feature', function (User $user) {
    return $user->is_beta === true;
});

// Exercise 2: 25% rollout
Feature::define('quarter-rollout', function (User $user) {
    return $user->id % 100 < 25;
});

// Exercise 3: Feature for paying users only
Feature::define('premium-dashboard', function (User $user) {
    return $user->subscription === 'pro';
});`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Checking Feature States
        </h3>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">Global Check</h4>
        <CodeBlock>{`// Check if feature is active for current user
if (Feature::active('new-dashboard')) {
    return view('dashboard.new');
}

// Or use the blade directive
@feature('new-dashboard')
    <p>This is shown to beta users!</p>
@endfeature`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">User-specific Check</h4>
        <CodeBlock>{`// Check on a specific user instance
if ($user->features()->active('new-dashboard')) {
    return view('dashboard.new');
}

// Get value for a user
$color = $user->features()->value('button-color');`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Check Without User</h4>
        <CodeBlock>{`// Check feature definition directly (anonymous closure)
Feature::define('maintenance-mode', function () {
    return app()->isDownForMaintenance();
});

if (Feature::active('maintenance-mode')) {
    return view('maintenance');
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">In Middleware</h4>
        <CodeBlock>{`// app/Http/Middleware/FeatureAccess.php
public function handle(Request $request, Closure $next, string $feature)
{
    if (!Feature::active($feature)) {
        return redirect('/')->with('error', 'Feature not available yet!');
    }
    
    return $next($request);
}`}</CodeBlock>

        <CodeBlock>{`// routes/web.php
Route::middleware(['feature:new-checkout'])->group(function () {
    Route::get('/checkout', [CheckoutController::class, 'new']);
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">In Blade Views</h4>
        <CodeBlock>{`@feature('new-dashboard')
    <p>Welcome to the new dashboard!</p>
@else
    <p>Welcome to the classic dashboard.</p>
@endfeature`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Check Feature States</p>
          <p className="mt-2 text-sm">Practice checking features:</p>
          <CodeBlock>{`// Exercise 1: Simple check
if (Feature::active('beta-feature')) {
    echo "Welcome beta tester!";
}

// Exercise 2: User-specific
$user = User::find(1);
$result = $user->features()->active('premium-dashboard');
var_dump($result);

// Exercise 3: Middleware usage
// Route::middleware(['feature:ai-assistant'])
//     ->get('/ai', [AiController::class, 'chat']);`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Rich Values & A/B Testing
        </h3>
        
        <p className="text-[#5f6368] mt-2">
          Pennant supports rich values, not just boolean! This is powerful for A/B testing.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Defining Rich Values</h4>
        <CodeBlock>{`// A/B testing: button color
Feature::define('button-color', function () {
    return ['red', 'blue', 'green'][array_rand(['red', 'blue', 'green'])];
});

// Percentage-based values
Feature::define('pricing-tier', function (User $user) {
    return $user->id % 10 < 3 ? 'control' : 'treatment';
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Reading Rich Values</h4>
        <CodeBlock>{`// Get the value
$color = Feature::value('button-color');  // 'blue'
$tier = $user->features()->value('pricing-tier');  // 'control' or 'treatment'

// Use in view
<button className="btn btn-{{ $color }}">
    Click Me
</button>`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">A/B Testing Example</h4>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Controller</p>
            <CodeBlock>{`// Get the user's assigned variant
$variant = $user->features()->value('pricing-experiment');

// Pass to view
return view('checkout', [
    'variant' => $variant
]);`}</CodeBlock>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-purple-800">Views</p>
            <CodeBlock>{`@if($variant === 'control')
    @include('checkout.pricing-original')
@else
    @include('checkout.pricing-new')
@endif`}</CodeBlock>
          </div>
        </div>

        <Tip>
          <strong>A/B Testing Tip:</strong> Track which variant users see in your analytics! 
          Pennant doesn't track metrics - you need to log the variant along with user actions.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Built-in Storages
        </h3>
        
        <p className="text-[#5f6368] mt-2">
          Pennant comes with multiple storage drivers out of the box.
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Storage</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>database</td>
              <td>MySQL/PostgreSQL/etc</td>
              <td>Production (persisted)</td>
            </tr>
            <tr>
              <td>array</td>
              <td>PHP memory</td>
              <td>Testing/local dev</td>
            </tr>
            <tr>
              <td>redis</td>
              <td>Redis</td>
              <td>High-scale apps</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Configuring Redis</h4>
        
        <CodeBlock>{`// config/pennant.php
return [
    'driver' => env('PENNANT_DRIVER', 'database'),
    
    'stores' => [
        'redis' => [
            'driver' => 'redis',
            'connection' => 'pennant',
        ],
    ],
];`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using for Specific Features</h4>
        
        <CodeBlock>{`// Override store for a specific feature
Feature::define('high-scale-feature', function (User $user) {
    // This feature uses Redis
    return $user->id % 2 === 0;
}, ['store' => 'redis']);`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Pennant</th>
              <th>Go</th>
              <th>Node.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Package</td>
              <td>laravel/pennant</td>
              <td>Unleash-client-go</td>
              <td>unleash-client</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>Database/Redis/Memory</td>
              <td>File/API/Redis</td>
              <td>File/API/Redis</td>
            </tr>
            <tr>
              <td>Rich values</td>
              <td>Yes (any value)</td>
              <td>Yes</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Blade directive</td>
              <td>@feature</td>
              <td>N/A</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>Setup complexity</td>
              <td>Low (composer + migrate)</td>
              <td>Medium</td>
              <td>Medium</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel Pennant vs Unleash</h4>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="font-semibold text-orange-800">Laravel Pennant (Simple)</p>
            <CodeBlock>{`// Quick setup
composer require laravel/pennant
php artisan vendor:publish...
php artisan migrate

// Use - no API call needed
Feature::define('new-feature', fn () => true);
if (Feature::active('new-feature')) {
    // show feature
}`}</CodeBlock>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Unleash (Enterprise)</p>
            <CodeBlock>{`// Requires Unleash server
// Or use hosted service

// Client-side check
const client = new UnleashClient({
    url: 'https://api.unleash.io/...',
    appName: 'my-app',
});

await client.start();
const enabled = client.isEnabled('new-feature');`}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel Pennant is built into your app - no external service required. 
            Unleash requires a separate Unleash server (self-hosted or cloud). 
            For simple boolean features, Pennant is much simpler. For complex enterprise 
            feature management with analytics, Unleash is more powerful.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Pro Tips & Best Practices
        </h3>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Always Return Value from Feature</h4>
        
        <Warning>
          <strong>Warning:</strong> Feature definitions must return a value. Don't use Feature::active() inside a definition!
        </Warning>

        <CodeBlock>{`// WRONG - Feature::active() in definition
Feature::define('nested-feature', function (User $user) {
    return Feature::active('parent-feature'); // Don't do this!
});

// CORRECT - Simple boolean logic
Feature::define('nested-feature', function (User $user) {
    return $user->is_admin && $user->has_beta_access;
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Gate Integration</h4>
        
        <CodeBlock>{`// Define gate from feature
Gate::define('access-new-feature', function (User $user) {
    return Feature::active('new-feature');
});

// Use in authorization
if (Gate::allows('access-new-feature')) {
    // show feature
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Testing</h4>
        
        <CodeBlock>{`// Enable for test
Feature::define('new-feature', fn () => true);

// Or mock the service
$this->mock(PennantService::class, function ($mock) {
    $mock->shouldReceive('active')
        ->with('new-feature')
        ->andReturn(true);
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Clean Up Old Features</h4>
        
        <CodeBlock>{`// Remove old features - just delete the define() call
// After migrating users off:

// 1. Remove definition from code
// 2. Or comment it out temporarily

// The database table keeps old values
// Run a migration to clean up if needed`}</CodeBlock>

        <Tip>
          <strong>Performance Tip:</strong> For high-traffic apps, use Redis driver 
          to avoid database overhead on every feature check!
        </Tip>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Feature flags = Light switches for your app</li>
            <li>Define in service provider with closures</li>
            <li>Check with Feature::active() or $user-&gt;features()-&gt;active()</li>
            <li>Rich values enable A/B testing</li>
            <li>Built-in drivers: database, array, redis</li>
            <li>Simpler than Unleash - no external service needed</li>
            <li>@feature Blade directive for views</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}