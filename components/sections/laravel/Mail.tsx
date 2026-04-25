import { CodeBlock, Note, Tip } from '@/components/ui'

export function Mail() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="mail" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Mail
        </h2>
        <p>Laravel provides a clean, simple API over the popular Symfony Mailer library. It supports sending email via SMTP, Mailgun, Postmark, and more.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Sending Mail</h3>
        <p>Emails in Laravel are typically represented as &quot;Mailable&quot; classes, which keep your controller code clean.</p>
        <CodeBlock>{`# php artisan make:mail OrderShipped

use App\\Mail\\OrderShipped;
use Illuminate\\Support\\Facades\\Mail;

Mail::to($request->user())->send(new OrderShipped($order));`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is a massive upgrade over <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">nodemailer</code>. Laravel handles the view rendering (Blade), attachments, and driver configuration automatically.
        </Tip>
      </section>

      <section>
        <h3 id="mailables" className="text-[#5f6368] mt-8 font-semibold">Markdown Mailables</h3>
        <p>You can create beautiful, responsive emails using Markdown components.</p>
        <CodeBlock>{`# php artisan make:mail OrderShipped --markdown=mail.orders.shipped

// In your mailable class:
public function content(): Content
{
    return new Content(
        markdown: 'mail.orders.shipped',
        with: ['url' => $this->orderUrl],
    );
}`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
