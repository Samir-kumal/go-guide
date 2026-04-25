'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function NotificationsTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="notifications" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Notifications - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are notifications?</li>
            <li>2. Defining & sending notifications</li>
            <li>3. Delivery channels (mail, database, Slack, SMS)</li>
            <li>4. The via() method</li>
            <li>5. On-demand notifications</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel notifications with comparisons to Go and Node.js!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Notifications?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Notification class = A message template (like an email template)</li>
            <li>Channel (via) = How the message gets delivered (email, SMS, Slack)</li>
            <li>Notifiable = The recipient (User model with notification routes)</li>
            <li>{"$user->notify()"} = Sending the templated message to the recipient</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          In addition to support for sending email, Laravel provides support for sending notifications 
          across a variety of delivery channels, including SMS (via Vonage) and Slack.
        </p>

        <Tip>
          <strong>Key Insight:</strong> Instead of sending different types of messages manually, 
          define ONE notification class and let Laravel handle delivering it across multiple channels!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Defining & Sending Notifications
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Creating a Notification</h4>
        <p className="text-[#5f6368] mt-2">
          Use the artisan command to generate a notification class:
        </p>

        <CodeBlock>{"# Generate a notification class\nphp artisan make:notification OrderPaid\n\n# This creates:\n# app/Notifications/OrderPaid.php"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Sending to a User</h4>
        <p className="text-[#5f6368] mt-2">
          The easiest way - send directly to a notifiable entity:
        </p>

        <CodeBlock>{"use App\\Notifications\\OrderPaid;\n\n// Send to a single user\n$user->notify(new OrderPaid($invoice));\n\n// Or use the Notification facade\nNotification::send($user, new OrderPaid($invoice));"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Sending to Multiple Users</h4>

        <CodeBlock>{"// Send to multiple users\n$users = User::where('active', true)->get();\nNotification::send($users, new OrderPaid($invoice));\n\n// Send to all users\nNotification::send(User::all(), new OrderPaid($invoice));"}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Send a Notification</p>
          <p className="mt-2 text-sm">Practice sending notifications:</p>
          <CodeBlock>{"// In your controller:\nuse App\\Notifications\\OrderPaid;\nuse App\\Models\\Order;\n\npublic function markAsPaid(Order $order)\n{\n    $order->update(['paid_at' => now()]);\n    \n    // Send the notification\n    $order->user->notify(new OrderPaid($order));\n    \n    return response()->json(['message' => 'Order paid!']);\n}"}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Delivery Channels
        </h3>

        <p className="text-[#5f6368] mt-2">
          Every notification class has a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">via()</code> method 
          that determines which channels the notification will be delivered on.
        </p>

        <CodeBlock>{"public function via(object $notifiable): array\n{\n    return ['mail', 'database', 'slack'];\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Mail Channel</h4>
        <p className="text-[#5f6368] mt-2">
          Customize the email content:
        </p>

        <CodeBlock>{"public function toMail(object $notifiable): MailMessage\n{\n    return (new MailMessage)\n        ->line('Your order has been paid!')\n        ->line('Thank you for your purchase.')\n        ->action('View Invoice', url('/invoice/' . $this->invoice->id))\n        ->line('If you have questions, reply to this email.');\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Database Channel</h4>
        <p className="text-[#5f6368] mt-2">
          Store notification in database for UI display:
        </p>

        <CodeBlock>{"public function toDatabase(object $notifiable): array\n{\n    return [\n        'order_id' => $this->invoice->order_id,\n        'amount' => $this->invoice->amount,\n        'message' => 'Your order has been paid!',\n    ];\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Slack Channel</h4>

        <CodeBlock>{"public function toSlack(object $notifiable): SlackMessage\n{\n    return (new SlackMessage)\n        ->content('New order paid!: ' . $this->invoice->order_id);\n}"}</CodeBlock>

        <Tip>
          <strong>Multi-Channel Power:</strong> This allows you to send ONE "Notification" and have it automatically 
          deliver an email, store a database record for your UI, and send a Slack alert all at once!
        </Tip>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Method</th>
              <th>Returns</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mail</td>
              <td>toMail()</td>
              <td>MailMessage</td>
              <td>Email notifications</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>toDatabase()</td>
              <td>array</td>
              <td>UI notifications</td>
            </tr>
            <tr>
              <td>Slack</td>
              <td>toSlack()</td>
              <td>SlackMessage</td>
              <td>Team alerts</td>
            </tr>
            <tr>
              <td>SMS</td>
              <td>toVonage()</td>
              <td>VoidMessage</td>
              <td>Text messages</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          On-Demand Notifications
        </h3>

        <p className="text-[#5f6368] mt-2">
          Sometimes you need to notify someone who isn't a registered user:
        </p>

        <CodeBlock>{"use Illuminate\\Notifications\\AnonymousNotifiable;\n\nNotification::route('mail', 'taylor@example.com')\n    ->notify(new OrderPaid($invoice));\n\n// Multiple routes\nNotification::send(\n    $users,\n    (new Notification)\n        ->route('mail', 'dries@example.com')\n        ->route('slack', '#orders'),\n    new OrderPaid($invoice)\n);"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Route Customization</h4>
        <p className="text-[#5f6368] mt-2">
          Customize notification routes on your User model:
        </p>

        <CodeBlock>{"// In your User model:\npublic function routeNotificationFor($channel)\n{\n    switch ($channel) {\n        case 'mail':\n            return $this->email_address;\n        case 'slack':\n            return $this->slack_id;\n        case 'vonage':\n            return $this->phone_number;\n    }\n}"}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Make sure to configure the notification driver in config/services.php 
          before using channels like Slack or Vonage!
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel</th>
              <th>Go</th>
              <th>Node.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Multi-channel</td>
              <td>Built-in (mail, SMS, Slack)</td>
              <td>Manual / packages</td>
              <td>Manual / packages</td>
            </tr>
            <tr>
              <td>Notification class</td>
              <td>Single class per notification</td>
              <td>Struct + interface</td>
              <td>Class or function</td>
            </tr>
            <tr>
              <td>Database storage</td>
              <td>Built-in channel</td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>Queue support</td>
              <td>Built-in</td>
              <td>goroutines</td>
              <td>bull, bee-queue</td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>routeNotificationFor()</td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Go (net/http + channels)</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel</p>
            <CodeBlock>{"// Single notification, multiple channels\n$user->notify(new OrderPaid($order));\n\n// via() returns: ['mail', 'database', 'slack']"}</CodeBlock>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Go (manual)</p>
            <CodeBlock>{"// Send email\ngo sendEmail(order)\n\n// Store in DB\ngo storeNotification(order)\n\n// Send Slack\ngo sendSlack(order)\n\n// All separate, no abstraction"}</CodeBlock>
          </div>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Node.js</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel</p>
            <CodeBlock>{"// One line, multiple channels\n$user->notify(new OrderPaid($order));\n\n// Configured in notification class"}</CodeBlock>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800">Node.js (nodemailer)</p>
            <CodeBlock>{"// Separate for each channel\nawait transporter.sendMail(...)\nawait slackClient.postMessage(...)\nawait db.notifications.create(...)\n\n// No unified interface"}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel notifications provide a unified interface - ONE notification class automatically supports multiple channels.
            Go and Node.js require manual implementation for each channel, though packages help.
          </p>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}