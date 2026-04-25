'use client'

import { CodeBlock, Note, Tip, ComparisonTable } from '@/components/ui'

export function EventsListenersTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="events-listeners" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Events & Listeners - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are events & listeners?</li>
            <li>2. Creating events & listeners</li>
            <li>3. Dispatching events</li>
            <li>4. Event subscribers</li>
            <li>5. Queueable listeners</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel events and listeners with comparisons 
          to Go channels and Node.js EventEmitter!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Events & Listeners?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Events = News announcements broadcast on a radio station</li>
            <li>Listeners = Subscribers who tune in to hear specific news</li>
            <li>Event Dispatch = Broadcasting "Order #123 has shipped!"</li>
            <li>Listener Response = Email team sends notification, warehouse logs the shipment</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel&apos;s events provide a simple observer implementation, allowing you to subscribe 
          and listen for various events that occur in your application. This creates loose coupling 
          - the dispatcher doesn&apos;t need to know who&apos;s listening!
        </p>

        <Tip>
          AHA Moment: Events are like a newsletter. The publisher (event) doesn&apos;t know or care who subscribes. 
          Each subscriber (listener) acts independently!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Creating Events & Listeners
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using Artisan Commands</h4>

        <p className="text-[#5f6368] mt-2">
          The fastest way to create events and listeners:
        </p>

        <CodeBlock>{`# Create an event
php artisan make:event OrderShipped

# Create a listener
php artisan make:listener SendShipmentNotification --event=OrderShipped

# Or auto-handle with event listener binding
# In EventServiceProvider or bootstrap/app.php:
protected $listen = [
    OrderShipped::class => [
        SendShipmentNotification::class,
        LogShipmentListener::class,
    ],
];`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Event Structure</h4>

        <p className="text-[#5f6368] mt-2">
          Events are classes that hold data about what happened:
        </p>

        <CodeBlock>{`<?php
// app/Events/OrderShipped.php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderShipped
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Order $order
    ) {}
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Listener Structure</h4>

        <CodeBlock>{`<?php
// app/Listeners/SendShipmentNotification.php

namespace App\Listeners;

use App\Events\OrderShipped;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    public function handle(OrderShipped $event): void
    {
        // Access the order
        $order = $event->order;

        // Send notification...
        $order->user->notify(new OrderShippedNotification($order));
    }
}`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Dispatching Events
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Basic Dispatch</h4>

        <CodeBlock>{`// Using the event helper
event(new OrderShipped($order));

// Or using the Event facade
use Illuminate\Support\Facades\Event;

Event::dispatch(new OrderShipped($order));

// Or using the event() helper in older Laravel
event('order.shipped', $order);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Queued Events</h4>

        <p className="text-[#5f6368] mt-2">
          Make your listener async by implementing ShouldQueue:
        </p>

        <CodeBlock>{`use Illuminate\Contracts\Queue\ShouldQueue;

class SendShipmentNotification implements ShouldQueue
{
    // Custom queue name (optional)
    public string $queue = 'notifications';

    // Delay before processing (optional)
    public int $delay = 60;

    public function handle(OrderShipped $event): void
    {
        // This runs in the queue...
    }

    // Optional: logic if the job fails
    public function failed(OrderShipped $event, \Throwable $exception): void
    {
        Log::error('Notification failed: ' . $exception->getMessage());
    }
}`}</CodeBlock>

        <Note>
          Queueable listeners automatically run in the background. Use them for slow operations 
          like sending emails, SMS, or external API calls!
        </Note>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Event Subscribers
        </h3>

        <p className="text-[#5f6368] mt-2">
          Subscribers are classes that handle multiple related events:
        </p>

        <CodeBlock>{`<?php
// app/Listeners/OrderEventSubscriber.php

namespace App\Listeners;

class OrderEventSubscriber
{
    public function handleOrderShipped(OrderShipped $event): void
    {
        // Send confirmation email
    }

    public function handleOrderCreated(OrderCreated $event): void
    {
        // Send welcome email
    }

    public function handleOrderCancelled(OrderCancelled $event): void
    {
        // Process refund
    }

    // Register the events this subscriber listens to
    public function subscribe($events): void
    {
        $events->listen(
            OrderShipped::class,
            'handleOrderShipped'
        );

        $events->listen(
            OrderCreated::class,
            'handleOrderCreated'
        );

        $events->listen(
            OrderCancelled::class,
            'handleOrderCancelled'
        );
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Registering Subscribers</h4>

        <CodeBlock>{`// In EventServiceProvider or bootstrap/app.php
protected $subscribe = [
    OrderEventSubscriber::class,
];`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Events</th>
              <th>Go Channels</th>
              <th>Node.js EventEmitter</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Core pattern</td>
              <td>Observer</td>
              <td>Channel communication</td>
              <td>Observer</td>
            </tr>
            <tr>
              <td>Publish</td>
              <td>{"event(new Event())"}</td>
              <td>{"ch <- data"}</td>
              <td>{"emitter.emit('event', data)"}</td>
            </tr>
            <tr>
              <td>Subscribe</td>
              <td>Listener class</td>
              <td>go func() &#123; for range ch &#125;</td>
              <td>{"emitter.on('event', fn)"}</td>
            </tr>
            <tr>
              <td>Async support</td>
              <td>ShouldQueue interface</td>
              <td>goroutines</td>
              <td>Built-in</td>
            </tr>
            <tr>
              <td>Decoupling</td>
              <td>Full (separate classes)</td>
              <td>Full (channels)</td>
              <td>Full (emitters)</td>
            </tr>
            <tr>
              <td>Wildcards</td>
              <td>No (explicit)</td>
              <td>No</td>
              <td>Yes (on('*'))</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Channels Example</h4>

        <CodeBlock>{`// Go: Using channels for event-like patterns
type OrderShipped struct &#123;
    OrderID int
    UserID  int
&#125;

// Channel acts like an event bus
var orderEvents chan OrderShipped

func shipOrder(order OrderShipped) &#123;
    orderEvents <- order // Dispatch event
&#125;

func init() &#123;
    orderEvents = make(chan OrderShipped)

    // Listener goroutine
    go func() &#123;
        for order := range orderEvents &#123;
            sendNotification(order.UserID)
        &#125;
    &#125;()
&#125;`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js EventEmitter Example</h4>

        <CodeBlock>{`// Node.js: Using EventEmitter
const { EventEmitter } = require('events');

class OrderEmitter extends EventEmitter &#123;
    shipOrder(order) &#123;
        this.emit('orderShipped', order);
    &#125;
&#125;

const orderEmitter = new OrderEmitter();

// Listener 1
orderEmitter.on('orderShipped', (order) => &#123;
    sendEmail(order.userId);
&#125;);

// Listener 2
orderEmitter.once('orderShipped', (order) => &#123;
    analytics.track('order_shipped', order);
&#125;);

// In Express
app.on('error', (err) => &#123;
    console.error(err);
&#125;);`}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Differences</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel events are class-based and explicit. Go uses message passing with channels (no explicit event system). 
            Node.js EventEmitter is most similar to Laravel but with more flexibility (wildcards, one-time listeners).
          </p>
        </div>
      </section>

      <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
        <p className="font-semibold text-[#1565c0]">TRY IT: Create Events & Listeners</p>
        <p className="mt-2 text-sm">Practice creating and dispatching events:</p>

        <CodeBlock>{`# 1. Create an event
# php artisan make:event UserRegistered

# 2. Create a listener
# php artisan make:listener SendWelcomeEmail --event=UserRegistered

# 3. Dispatch in controller
public function register(Request $request) &#123;
    $user = User::create($request->validated());

    event(new UserRegistered($user));

    return response()->json(['message' => 'Registered!']);
&#125;

# 4. Listener handles the event
# public function handle(UserRegistered $event): void
# &#123;
#     $event->user->notify(new WelcomeNotification());
# &#125;`}</CodeBlock>
      </div>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Events decouple dispatchers from listeners</li>
          <li>Use event() helper to dispatch</li>
          <li>Listeners can be queued for async processing</li>
          <li>Subscribers handle multiple events in one class</li>
          <li>Similar to Go channels (explicit) and Node EventEmitter (flexible)</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}