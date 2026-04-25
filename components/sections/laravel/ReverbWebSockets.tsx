import { CodeBlock, Note, Tip } from '@/components/ui'

export function ReverbWebSockets() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="reverb-websockets" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Reverb & WebSockets
        </h2>
        <p>Laravel Reverb is a first-party, high-performance WebSocket server for Laravel applications. It brings real-time communication to your app without external dependencies like Pusher.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Broadcasting Events</h3>
        <p>To broadcast an event, implement the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">ShouldBroadcast</code> interface on your event class.</p>
        <CodeBlock>{`class OrderUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Order $order) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('orders.'.$this->order->id),
        ];
    }
}`}</CodeBlock>

        <h3 className="text-[#5f6368] mt-8 font-semibold">Client Side (Laravel Echo)</h3>
        <p>On the client side, you use Laravel Echo to listen for these events.</p>
        <CodeBlock>{`import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Echo.private(\`orders.\${orderId}\`)
    .listen('OrderUpdated', (e) => {
        console.log('Order status:', e.order.status);
    });`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is the Laravel equivalent of using <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Socket.io</code>. The main advantage is that Laravel handles the authentication for private channels automatically using your existing app auth.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
