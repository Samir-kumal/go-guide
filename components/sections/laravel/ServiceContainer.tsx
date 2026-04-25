'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function ServiceContainerTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="service-container" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Service Container - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is a Service Container?</li>
            <li>2. Dependency Injection explained</li>
            <li>3. Service Providers</li>
            <li>4. Binding & Resolving</li>
            <li>5. Automatic Resolution</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel's Service Container, 
          with comparisons to Go dependency injection and Node.js IoC containers!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is a Service Container?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Service Container = A smart warehouse that knows how to build and deliver anything</li>
            <li>Service Provider = The instruction manual telling the warehouse how to build each item</li>
            <li>Dependency Injection = The warehouse automatically assembles everything needed</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          The Laravel Service Container (also called Inversion of Control Container) is a powerful tool 
          for managing class dependencies and performing dependency injection. It automatically resolves 
          dependencies when needed.
        </p>

        <CodeBlock>{`// The container automatically resolves this!
class PodcastController extends Controller
{
    public function __construct(
        protected AppleMusic $apple,
        protected Spotify $spotify,
        protected AudioProcessor $processor,
    ) {}

    public function show(string $id)
    {
        // Container injected ALL dependencies automatically!
        return $this->apple->findPodcast($id);
    }
}`}</CodeBlock>

        <Tip>
          AHA Moment: You don't need to manually instantiate dependencies. 
          Laravel builds the entire dependency tree automatically!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Dependency Injection Explained
        </h3>

        <p className="text-[#5f6368] mt-2">
          Dependency Injection (DI) is a technique where an object receives other objects it depends on, 
          rather than creating them internally. This makes your code more testable and flexible.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Constructor Injection</h4>

        <CodeBlock>{`class OrderService
{
    protected PaymentGateway $payment;
    protected Logger $logger;

    // Dependencies injected via constructor
    public function __construct(
        PaymentGateway $payment,
        Logger $logger
    ) {
        $this->payment = $payment;
        $this->logger = $logger;
    }

    public function process(Order $order): bool
    {
        $this->logger->info('Processing order', ['order_id' => $order->id]);
        
        try {
            return $this->payment->charge($order->total);
        } catch (PaymentFailed $e) {
            $this->logger->error('Payment failed', ['error' => $e->getMessage()]);
            return false;
        }
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Method Injection</h4>

        <p className="text-[#5f6368] mt-2">
          You can also inject dependencies directly into controller methods:
        </p>

        <CodeBlock>{`class PodcastController extends Controller
{
    public function show(Request $request, string $id)
    {
        // Request is automatically injected!
        $user = $request->user();
        
        return Podcast::findOrFail($id);
    }
}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Constructor Injection</p>
          <p className="mt-2 text-sm">Practice creating a class with dependencies:</p>
          <CodeBlock>{`// Create a class with 3 dependencies
class UserNotifier
{
    public function __construct(
        protected Mailer $mailer,
        protected SmsGateway $sms,
        protected SlackWebhook $slack,
    ) {}

    public function notify(string $message, string $channel = 'email')
    {
        match($channel) {
            'email' => $this->mailer->send($message),
            'sms' => $this->sms->send($message),
            'slack' => $this->slack->notify($message),
        };
    }
}

// Laravel automatically injects all 3 dependencies!
// Just type-hint them in the constructor`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Service Providers
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Service Provider = A recipe card telling the kitchen how to prepare a dish</li>
            <li>register() method = Writing down the recipe</li>
            <li>boot() method = Cooking time - using registered services</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Service providers are the central place of all Laravel application bootstrapping. 
          Your application and all of Laravel's core services are bootstrapped via service providers.
        </p>

        <CodeBlock>{`class PodcastServiceProvider extends ServiceProvider
{
    /**
     * Register services - bind interfaces to implementations
     */
    public function register(): void
    {
        // Simple binding
        $this->app->bind(EventPusher::class, RedisEventPusher::class);

        // Singleton - same instance every time
        $this->app->singleton(CacheManager::class, function ($app) {
            return new CacheManager($app->make('config'));
        });

        // Instance - pass existing object
        $this->app->instance(Logger::class, $logger);
    }

    /**
     * Boot services - after all bindings are registered
     */
    public function boot(): void
    {
        // Use the bound services
        config(['podcast.push_enabled' => true]);
    }
}`}</CodeBlock>

        <Note>
          <strong>Note:</strong> The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">register()</code> method should only bind things. 
          Don't try to use services in register() - they might not be available yet!
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Binding Types</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Method</th>
              <th>Description</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>bind()</td>
              <td>New instance every time</td>
              <td>Stateless services</td>
            </tr>
            <tr>
              <td>singleton()</td>
              <td>Same instance once</td>
              <td>Database connection, config</td>
            </tr>
            <tr>
              <td>instance()</td>
              <td>Bind existing object</td>
              <td>Third-party libraries</td>
            </tr>
            <tr>
              <td>scoped()</td>
              <td>Same instance per request</td>
              <td>User-specific services</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Binding & Resolving
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Binding Interfaces to Implementations</h4>

        <p className="text-[#5f6368] mt-2">
          Use interfaces to decouple your code:
        </p>

        <CodeBlock>{`// Define an interface
interface PaymentGateway
{
    public function charge(float $amount): bool;
    public function refund(string $transactionId): bool;
}

// Implement the interface
class StripePayment implements PaymentGateway
{
    public function charge(float $amount): bool
    {
        // Stripe implementation
    }

    public function refund(string $transactionId): bool
    {
        // Stripe implementation
    }
}

// Bind interface to implementation
$this->app->bind(PaymentGateway::class, StripePayment::class);

// Now inject the interface, get Stripe!
public function __construct(protected PaymentGateway $payment) {}

// Resolve manually
$payment = app(PaymentGateway::class);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Contextual Binding</h4>

        <p className="text-[#5f6368] mt-2">
          Bind different implementations based on context:
        </p>

        <CodeBlock>{`// When someone asks for Billable, give them StripeBillable
$this->app->when(Billable::class)
    ->needs(StripeClient::class)
    ->give(function () {
        return new StripeClient(config('services.stripe.secret'));
    });

// When someone asks for Analytics, give them GoogleAnalytics
$this->app->when(Analytics::class)
    ->needs(AnalyticsClient::class)
    ->give(GoogleAnalytics::class);`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Bind and Resolve</p>
          <p className="mt-2 text-sm">Practice binding interfaces:</p>
          <CodeBlock>{`// 1. Create an interface
interface Notifier {
    public function send(string $message): void;
}

// 2. Create implementation
class EmailNotifier implements Notifier {
    public function send(string $message): void {
        mail('user@example.com', 'Notification', $message);
    }
}

// 3. Bind in service provider
$this->app->bind(Notifier::class, EmailNotifier::class);

// 4. Use it anywhere!
class OrderController extends Controller
{
    public function __construct(protected Notifier $notifier) {}

    public function completed(Order $order)
    {
        $this->notifier->send('Order completed!');
    }
}`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Automatic Resolution
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel can automatically resolve classes without explicit binding if they have no dependencies, 
          or if all their dependencies can be resolved automatically!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Automatic Dependency Resolution</h4>

        <CodeBlock>{`// No binding needed! Laravel figures it out.
// Just type-hint what you need.

class PodcastController extends Controller
{
    // Laravel sees AppleMusic, creates it, injects it
    // AppleMusic needs AudioProcessor, Laravel creates and injects it
    // AudioProcessor needs Config, Laravel creates and injects it
    // ... builds entire dependency tree automatically!
    public function __construct(
        protected AppleMusic $apple,
    ) {}

    public function show(string $id)
    {
        return $this->apple->findPodcast($id);
    }
}`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Automatic resolution only works for classes. 
          Always bind interfaces explicitly!
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Tagging</h4>

        <p className="text-[#5f6368] mt-2">
          Group multiple bindings and resolve them together:
        </p>

        <CodeBlock>{`// Register multiple services with same tag
$this->app->tag([ReportGenerator::class], 'reports');
$this->app->tag([PdfReport::class], 'reports');
$this->app->tag([ExcelReport::class], 'reports');

// Resolve all tagged services
$reports = $app->tagged('reports');

foreach ($reports as $report) {
    $report->generate();
}`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go / Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel</th>
              <th>Go (Wire)</th>
              <th>Node.js (InversifyJS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Container</td>
              <td>Service Container</td>
              <td>Wire (compile-time DI)</td>
              <td>InversifyJS</td>
            </tr>
            <tr>
              <td>Binding</td>
              <td>Service Providers</td>
              <td>Provider sets</td>
              <td>Container.bind()</td>
            </tr>
            <tr>
              <td>Auto-wire</td>
              <td>Yes - automatic</td>
              <td>Yes (with code gen)</td>
              <td>Yes (reflect-metadata)</td>
            </tr>
            <tr>
              <td>Interfaces</td>
              <td>Optional</td>
              <td>Go interfaces (implicit)</td>
              <td>Yes - required</td>
            </tr>
            <tr>
              <td>Scope</td>
              <td>Singleton/Scoped</td>
              <td>No (manual)</td>
              <td>Singleton/Transient/Request</td>
            </tr>
            <tr>
              <td>Lifetime</td>
              <td>App lifecycle</td>
              <td>Compile time</td>
              <td>Container scope</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go: Manual DI</h4>

        <CodeBlock>{`// Go: Manual dependency injection (no container)
// Define interfaces
type PaymentProcessor interface {
    Charge(amount float64) error
}

// Implement interface
type StripeProcessor struct {
    apiKey string
}

func (s *StripeProcessor) Charge(amount float64) error {
    // Stripe implementation
    return nil
}

// Service that needs dependency
type OrderService struct {
    processor PaymentProcessor
}

// Manually inject (no container!)
func NewOrderService(p PaymentProcessor) *OrderService {
    return &OrderService{processor: p}
}

// Usage
func main() {
    stripe := &StripeProcessor{apiKey: "key"}
    service := NewOrderService(stripe)
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js: InversifyJS</h4>

        <CodeBlock>{`// Node.js: InversifyJS container
import { inject, injectable, Container } from 'inversify';

const container = new Container();

// Bind interface to implementation
container.bind<PaymentProcessor>('PaymentProcessor')
    .to(StripePaymentProcessor);

// Inject into class
@injectable()
class OrderService {
    constructor(
        @inject('PaymentProcessor') private payment: PaymentProcessor
    ) {}

    async processOrder(amount: number) {
        await this.payment.charge(amount);
    }
}

// Resolve
const orderService = container.resolve(OrderService);`}</CodeBlock>

        <Tip>
          Key Difference: Laravel's container is the most feature-rich out of the box. 
          Go prefers manual DI (simpler), while Node.js requires extra setup like InversifyJS.
        </Tip>
      </section>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Service Container is Laravel's dependency injection system</li>
          <li>Type-hint dependencies in constructors - Laravel resolves them</li>
          <li>Service Providers register bindings (register method)</li>
          <li>Use interfaces to decouple code from implementations</li>
          <li>bind() = new instance each time, singleton() = same instance</li>
          <li>Auto-resolution works for classes without explicit binding</li>
          <li>Go uses manual DI, Node.js needs libraries like InversifyJS</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}