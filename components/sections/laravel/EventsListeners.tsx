import { CodeBlock, Note, Tip } from '@/components/ui'

export function EventsListeners() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="events-listeners" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Events & Listeners
        </h2>
        <p>Laravel&apos;s events provide a simple observer implementation, allowing you to subscribe and listen for various events that occur in your application.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining Events & Listeners</h3>
        <CodeBlock>{`# php artisan make:event OrderShipped
# php artisan make:listener SendShipmentNotification --event=OrderShipped

// Dispatching the event
OrderShipped::dispatch($order);

// Listener handle method
public function handle(OrderShipped $event): void
{
    // Access the order using $event->order...
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is conceptually similar to <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">EventEmitter</code> in Node.js or a Pub/Sub pattern, allowing you to decouple different parts of your system.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
