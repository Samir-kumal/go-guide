import { CodeBlock, Note, Tip } from '@/components/ui'

export function ErrorHandling() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="error-handling" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Error Handling & Logging
        </h2>
        <p>When you start a new Laravel project, error and exception handling is already configured for you. Laravel integrates with the Monolog library, which provides support for a variety of powerful log handlers.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Custom Error Pages</h3>
        <p>Laravel makes it easy to display custom error pages for various HTTP status codes. For example, to customize the error page for 404 HTTP status codes, create a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">resources/views/errors/404.blade.php</code> view file.</p>
        
        <h3 className="text-[#5f6368] mt-8 font-semibold">Logging</h3>
        <p>Laravel provides a powerful logging system that allows you to log messages to files, the system error log, and even Slack to notify your entire team.</p>
        <CodeBlock>{`use Illuminate\\Support\\Facades\\Log;

Log::info('User failed to login.', ['id' => $user->id]);
Log::warning('Something might be going wrong.');
Log::error('Something is definitely wrong.');
Log::critical('The system is down!');`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is similar to <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">winston</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">pino</code> in Node.js, but with zero-config setup out of the box.
        </Tip>
      </section>

      <section>
        <h3 id="exception-handling" className="text-[#5f6368] mt-8 font-semibold">Exception Handling</h3>
        <p>You can customize how exceptions are reported or rendered in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">bootstrap/app.php</code>.</p>
        <CodeBlock>{`->withExceptions(function (Exceptions $exceptions) {
    $exceptions->report(function (InvalidOrderException $e) {
        // ...
    });
})`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
