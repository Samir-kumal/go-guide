'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function ErrorHandlingTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="error-handling" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Error Handling & Logging - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. How Laravel handles errors</li>
            <li>2. Exception handling fundamentals</li>
            <li>3. Logging deep dive</li>
            <li>4. Custom error pages</li>
            <li>5. Reporting & context</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel error handling, logging, 
          and exception management with comparisons to Go and Node.js!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          How Laravel Handles Errors
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel's exception handler = A universal receptionist who knows how to handle every type of complaint</li>
            <li>Logging = The complaint notebook that records everything for later review</li>
            <li>Custom error pages = Branded responses that look professional instead of generic</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          When you start a new Laravel project, error and exception handling is already configured for you. 
          Laravel integrates with the Monolog library, which provides support for a variety of powerful log handlers.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Error Flow</h4>

        <CodeBlock>{`1. Exception thrown in your code
2. Laravel catches it via app/Exceptions/Handler.php
3. Exception reported (logged) based on type
4. Exception rendered (displayed) based on environment
5. User sees either debug page (local) or custom error page (production)`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Exception Handling Fundamentals
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Handler</h4>

        <p className="text-[#5f6368] mt-2">
          In Laravel 11+, exception handling is configured in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">bootstrap/app.php</code>.
          In earlier versions, it lives in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">app/Exceptions/Handler.php</code>.
        </p>

        <CodeBlock>{`->withExceptions(function (Exceptions $exceptions) {
    // Report specific exceptions
    $exceptions->report(function (InvalidOrderException $e) {
        // Log to your monitoring service
        Log::error('Invalid order detected', ['order' => $e->orderId]);
    });

    // Don't report these (404s, etc)
    $exceptions->ignore(NotFoundException::class);
})`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Try-Catch</h4>

        <CodeBlock>{`try {
    $user = User::findOrFail($id);
} catch (ModelNotFoundException $e) {
    // Handle gracefully
    return response()->json(['error' => 'User not found'], 404);
} catch (\\Exception $e) {
    // Log unexpected errors
    Log::error('Unexpected error: ' . $e->getMessage());
    return response()->json(['error' => 'Something went wrong'], 500);
}`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Always catch specific exceptions before general ones. Catching <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Exception</code> first will catch everything!
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Logging Deep Dive
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Log Levels</h4>

        <p className="text-[#5f6368] mt-2">
          Laravel uses Monolog under the hood, with these standard log levels (from most to least severe):
        </p>

        <CodeBlock>{`Log::emergency('System is unusable!');    // 0 - Highest
Log::alert('Action must be taken immediately!');
Log::critical('Application is down!');       // 2
Log::error('Runtime errors occurred');       // 3
Log::warning('Warning conditions');         // 4
Log::notice('Normal but significant');      // 5
Log::info('Informational messages');        // 6
Log::debug('Detailed debug info');          // 7 - Lowest`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Context Data</h4>

        <p className="text-[#5f6368] mt-2">
          Add context to your logs for better debugging:
        </p>

        <CodeBlock>{`Log::info('User failed to login', [
    'email' => $email,
    'ip' => request()->ip(),
    'user_id' => $user?->id,
    'attempt_count' => $attempts
]);`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Always log relevant context. Instead of "Login failed", log "Login failed for user@example.com from IP 192.168.1.1 after 3 attempts". This makes debugging way easier!
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Channels</h4>

        <p className="text-[#5f6368] mt-2">
          You can log to different channels (files, Slack, etc.):
        </p>

        <CodeBlock>{`// Default channel (logs to storage/logs/laravel.log)
Log::info('Message');

// Specific channel
Log::channel('slack')->error('Critical issue!');

// Stack multiple channels
Log::stack(['single', 'slack'])->info('Important message');`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Custom Error Pages
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel makes it easy to display custom error pages for various HTTP status codes:
        </p>

        <CodeBlock>{`// Create: resources/views/errors/404.blade.php
// resources/views/errors/500.blade.php
// resources/views/errors/503.blade.php

// Your custom 404 page
&lt;html&gt;
&lt;body&gt;
    &lt;h1&gt;Oops! Page Not Found&lt;/h1&gt;
    &lt;p&gt;The page you're looking for doesn't exist.&lt;/p&gt;
    &lt;a href="/"&gt;Go Home&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;`}</CodeBlock>

        <Note>
          <strong>Note:</strong> In production, Laravel automatically uses error pages matching the status code. In local development, you'll see the detailed debug page.
        </Note>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Reporting & Context
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Global Exception Context</h4>

        <p className="text-[#5f6368] mt-2">
          Add context to all reported exceptions:
        </p>

        <CodeBlock>{`->withExceptions(function (Exceptions $exceptions) {
    $exceptions->report(function (Throwable $e) {
        if (app()->bound('sentry')) {
            app('sentry')->captureException($e);
        }
    });

    // Add context method to your exception
    $exceptions->shouldReport(function (Throwable $e) {
        return true; // Report all exceptions
    });
})`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Ignoring Exceptions</h4>

        <CodeBlock>{`// Don't report certain exceptions (they still render normally)
$exceptions->ignore([
    NotFoundException::class,
    ValidationException::class,
]);`}</CodeBlock>
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
              <td>Error type</td>
              <td>Exceptions</td>
              <td>Return error values</td>
              <td>Exceptions</td>
            </tr>
            <tr>
              <td>Handling</td>
              <td>try-catch</td>
              <td>if err != nil</td>
              <td>try-catch</td>
            </tr>
            <tr>
              <td>Logging</td>
              <td>Log facade</td>
              <td>log package / slog</td>
              <td>winston, pino</td>
            </tr>
            <tr>
              <td>Global handler</td>
              <td>bootstrap/app.php</td>
              <td>http.HandleError</td>
              <td>express error middleware</td>
            </tr>
            <tr>
              <td>Log levels</td>
              <td>8 levels (Monolog)</td>
              <td>Slog: 4 levels</td>
              <td>winston: 6 levels</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel has "zero-config" error handling - it works out of the box. 
            Go requires explicit error checking everywhere but is more explicit about failure handling. 
            Node.js is similar to Laravel but requires more setup for production logging.
          </p>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}