import { CodeBlock, Note, Tip, Warning } from '@/components/ui'

export function Middleware() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="middleware" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Middleware
        </h2>
        <p>Middleware provide a convenient mechanism for inspecting and filtering HTTP requests entering your application. For example, Laravel includes a middleware that verifies the user of your application is authenticated.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining Middleware</h3>
        <p>To create a new middleware, use the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">make:middleware</code> Artisan command.</p>
        <CodeBlock>{`<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\Response;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->input('token') !== 'my-secret-token') {
            return redirect('/home');
        }

        return $next($request);
    }
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is exactly like Express.js middleware: <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">(req, res, next) =&gt; {"{ ... next(); }"}</code>. The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$next($request)</code> call is what passes the request deeper into the application.
        </Tip>
      </section>

      <section>
        <h3 id="registering-middleware" className="text-[#5f6368] mt-8 font-semibold">Registering Middleware</h3>
        <p>In modern Laravel (11+), middleware are registered in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">bootstrap/app.php</code>.</p>
        <CodeBlock>{`->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'subscribed' => EnsureUserIsSubscribed::class,
    ]);
})`}</CodeBlock>
      </section>

      <section>
        <h3 id="csrf-protection" className="text-[#5f6368] mt-8 font-semibold">CSRF Protection</h3>
        <p>Laravel automatically generates a CSRF "token" for each active user session managed by the application. This token is used to verify that the authenticated user is the one actually making the requests to the application.</p>
        
        <h4 className="font-semibold mt-4">In Blade Forms</h4>
        <p>Any time you define an HTML form in your application, you should include a hidden CSRF token field in the form so that the CSRF protection middleware can validate the request.</p>
        <CodeBlock>{`<form method="POST" action="/profile">
    @csrf
    ...
</form>`}</CodeBlock>

        <Warning>
          <strong>Security:</strong> By default, all <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">POST</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PUT</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PATCH</code>, or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">DELETE</code> routes will fail without a CSRF token.
        </Warning>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
