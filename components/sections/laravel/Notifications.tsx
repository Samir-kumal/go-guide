import { CodeBlock, Note, Tip } from '@/components/ui'

export function Notifications() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="notifications" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Notifications
        </h2>
        <p>In addition to support for sending email, Laravel provides support for sending notifications across a variety of delivery channels, including SMS and Slack.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining & Sending</h3>
        <CodeBlock>{`# php artisan make:notification OrderPaid

use App\\Notifications\\OrderPaid;

$user->notify(new OrderPaid($invoice));

// Or using the Notification facade
Notification::send($users, new OrderPaid($invoice));`}</CodeBlock>

        <h3 className="text-[#5f6368] mt-8 font-semibold">Delivery Channels</h3>
        <p>Every notification class has a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">via</code> method that determines which channels the notification will be delivered on.</p>
        <CodeBlock>{`public function via(object $notifiable): array
{
    return ['mail', 'database', 'slack'];
}

public function toMail(object $notifiable): MailMessage
{
    return (new MailMessage)
                ->line('Your order has been paid!')
                ->action('View Invoice', url('/invoice/'.$this->invoice->id));
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This allows you to send a single &quot;Notification&quot; and have it automatically deliver an email, store a database record for your UI, and send a Slack alert all at once.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
