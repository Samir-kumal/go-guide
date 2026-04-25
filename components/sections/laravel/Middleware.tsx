'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function MiddlewareTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="middleware-tutorial" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Middleware - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is middleware?</li>
            <li>2. Creating middleware</li>
            <li>3. Registering middleware</li>
            <li>4. Middleware parameters</li>
            <li>5. CSRF protection</li>
            <li>6. Go/Express comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel middleware, understand how it compares 
          to Go and Express.js, and know when to use each type!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Middleware?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Middleware = The security checkpoint at an airport</li>
            <li>Before you board your flight (reach the controller), you must pass through security (middleware)</li>
            <li>They check your ID, scan your bags, verify you have a boarding pass</li>
            <li>If you fail, you dont get through. If you pass, you continue to your destination!</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Middleware provide a convenient mechanism for inspecting and filtering HTTP requests 
          entering your application. They act as a bridge between the request and your controller.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Request Flow</h4>

        <CodeBlock>{`1. HTTP Request enters app
         ->
2. Global middleware (CSRF, CORS, Auth)
         ->
3. Route middleware (custom)
         ->
4. Controller processes request
         ->
5. Response flows back through middleware`}</CodeBlock>

        <Tip>
          <strong>AHA Moment:</strong> Middleware can run BEFORE the controller (request) or AFTER (response). 
          This is called "before" and "after" middleware.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Creating Middleware
        </h3>

        <p className="text-[#5f6368] mt-2">
          To create a new middleware, use the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">make:middleware</code> Artisan command:
        </p>

        <CodeBlock>{`php artisan make:middleware EnsureTokenIsValid`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Middleware Structure</h4>

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
        // BEFORE: Inspect request
        if ($request->input('token') !== 'my-secret-token') {
            return redirect('/home');
        }

        // Pass to next middleware/controller
        return $next($request);
    }
}`}</CodeBlock>

        <Tip>
          <strong>JS Comparison:</strong> This is exactly like Express.js middleware:
          <CodeBlock>{`app.use((req, res, next) => {
  if (req.query.token === 'my-secret-token') {
    next();  // Continue
  } else {
    res.redirect('/home');
  }
});`}</CodeBlock>
          The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$next($request)</code> call is what passes the request deeper into the application.
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">After Middleware</h4>

        <p className="text-[#5f6368] mt-2">
          You can also create "after" middleware that runs after the controller:
        </p>

        <CodeBlock>{`<?php

class LogResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // AFTER: Modify response or log
        \\Log::info('Response sent', [
            'status' => $response->getStatusCode(),
        ]);

        return $response;
    }
}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create Middleware</p>
          <p className="mt-2 text-sm">Practice creating middleware:</p>
          <CodeBlock>{`<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Symfony\\Component\\HttpFoundation\\Response;

class CheckAge
{
    public function handle(Request $request, Closure $next): Response
    {
        // Check if age parameter is set and >= 18
        if ($request->has('age') && $request->input('age') >= 18) {
            return $next($request);
        }

        return response()->json(['error' => 'Must be 18+'], 403);
    }
}`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Registering Middleware
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Global Middleware</h4>

        <p className="text-[#5f6368] mt-2">
          In Laravel 11+, middleware are registered in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">bootstrap/app.php</code>:
        </p>

        <CodeBlock>{`->withMiddleware(function (Middleware $middleware) {
    // Global middleware - runs on every request
    $middleware->web(append: [
        \\App\\Http\\Middleware\\EncryptCookies::class,
        \\Illuminate\\Cookie\\Middleware\\AddQueuedCookiesToResponse::class,
    ]);
})`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Route Middleware</h4>

        <p className="text-[#5f6368] mt-2">
          Assign middleware to routes using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">middleware</code> method:
        </p>

        <CodeBlock>{`// In routes/web.php
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'subscribed']);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Middleware Aliases</h4>

        <p className="text-[#5f6368] mt-2">
          Register aliases for cleaner route definitions:
        </p>

        <CodeBlock>{`->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'subscribed' => EnsureUserIsSubscribed::class,
        'admin' => EnsureUserIsAdmin::class,
    ]);
})`}</CodeBlock>

        <CodeBlock>{`// Now you can use:
Route::get('/admin', function () {
    //
})->middleware('admin');`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Middleware Groups</h4>

        <p className="text-[#5f6368] mt-2">
          Group multiple middleware together:
        </p>

        <CodeBlock>{`$middleware->group('web', [
    \\App\\Http\\Middleware\\EncryptCookies::class,
    \\Illuminate\\Session\\Middleware\\StartSession::class,
    \\Illuminate\\View\\Middleware\\ShareErrorsFromSession::class,
    \\App\\Http\\Middleware\\VerifyCsrfToken::class,
    \\Illuminate\\Routing\\Middleware\\SubstituteBindings::class,
]);`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Register Middleware</p>
          <CodeBlock>{`// routes/web.php
Route::middleware(['auth', CheckAge::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
});`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Middleware Parameters
        </h3>

        <p className="text-[#5f6368] mt-2">
          You can pass parameters to middleware:
        </p>

        <CodeBlock>{`// In your middleware
class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if ($request->user()->role !== $role) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}`}</CodeBlock>

        <CodeBlock>{`// In routes
Route::get('/admin', function () {
    //
})->middleware('role:admin');`}</CodeBlock>

        <p className="text-[#5f6368] mt-2">
          Multiple parameters are comma-separated:
        </p>

        <CodeBlock>{`->middleware('role:admin,moderator')`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          CSRF Protection
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#ffebee] border-l-4 border-[#f44336] p-4 my-4">
          <p className="font-semibold text-[#c62828]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>CSRF token = A one-time entry ticket to a concert</li>
            <li>Only the person who bought the ticket (the form) can use it</li>
            <li>If someone tries to use a stolen ticket, they get caught at the door</li>
            <li>This prevents cross-site request forgery!</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel automatically generates a CSRF "token" for each active user session. 
          This token is used to verify that the authenticated user is the one making the requests.
        </p>

        <h4 className="font-semibold mt-4">In Blade Forms</h4>

        <p className="text-[#5f6368] mt-2">
          Any time you define an HTML form, include a hidden CSRF token field:
        </p>

        <CodeBlock>{`<form method="POST" action="/profile">
    @csrf
    <input type="text" name="name" />
    <button type="submit">Update</button>
</form>`}</CodeBlock>

        <h4 className="font-semibold mt-4">In JavaScript</h4>

        <CodeBlock>{`// AJAX with CSRF
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': '{{ csrf_token() }}'
    }
});`}</CodeBlock>

        <CodeBlock>{`// Or use the cookie
fetch('/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.cookie
            .split('; ')
            .find(row => row.startsWith('XSRF-TOKEN='))
            .split('=')[1]
    },
    body: JSON.stringify({ name: 'value' })
});`}</CodeBlock>

        <Warning>
          <strong>Security:</strong> By default, all <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">POST</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PUT</code>, <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">PATCH</code>, or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">DELETE</code> routes will fail without a CSRF token.
        </Warning>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: CSRF in Forms</p>
          <CodeBlock>{`<form method="POST" action="/posts">
    @csrf
    <input type="text" name="title" placeholder="Title" />
    <textarea name="content" placeholder="Content"></textarea>
    <button type="submit">Create Post</button>
</form>`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Express Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel</th>
              <th>Express.js</th>
              <th>Go (HTTP)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Definition</td>
              <td>Class with handle()</td>
              <td>Function (req, res, next)</td>
              <td>HandlerFunc</td>
            </tr>
            <tr>
              <td>Registration</td>
              <td>bootstrap/app.php</td>
              <td>app.use()</td>
              <td>http.Handle()</td>
            </tr>
            <tr>
              <td>Parameters</td>
              <td>Yes (via constructor)</td>
              <td>Yes (closure)</td>
              <td>Wrap with closure</td>
            </tr>
            <tr>
              <td>Before/After</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td>Global auth</td>
              <td>Auth middleware</td>
              <td>express-session</td>
              <td>Middleware pattern</td>
            </tr>
            <tr>
              <td>CSRF</td>
              <td>Built-in</td>
              <td>csurf package</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>Groups</td>
              <td>Yes (middleware groups)</td>
              <td>Router groups</td>
              <td>Subroutes</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Express.js Middleware</h4>

        <CodeBlock>{`// Express.js middleware
const authenticate = (req, res, next) => {
  if (req.headers.authorization) {
    // Verify token
    next();  // Pass to next middleware
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use(authenticate);`}</CodeBlock>

        <CodeBlock>{`// Route with multiple middleware
app.get('/dashboard', authenticate, checkSubscription, (req, res) => {
  res.json({ user: req.user });
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Middleware Pattern</h4>

        <CodeBlock>{`// Go: Middleware as Higher-Order Function
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

// Wrap handler
handler := Logger(authenticateHandler)`}</CodeBlock>

        <CodeBlock>{`// Go: Authentication middleware
func authenticate(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}`}</CodeBlock>

        <CodeBlock>{`// Go: Apply middleware to routes
mux := http.NewServeMux()
wrapped := Logger(Auth(mux))
http.Handle("/", wrapped)`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Express vs Go</h4>

        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel</p>
            <p className="text-sm mt-2">Class-based, automatic DI, built-in auth/CSRF, groups</p>
            <CodeBlock>{`Route::get('/dashboard')
  ->middleware('auth');`}</CodeBlock>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800">Express.js</p>
            <p className="text-sm mt-2">Function-based, flexible, npm packages</p>
            <CodeBlock>{`app.get('/dashboard', 
  auth, (req, res) => {});`}</CodeBlock>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Go</p>
            <p className="text-sm mt-2">Higher-order functions, manual pattern</p>
            <CodeBlock>{`mux := http.NewServeMux()
mux = Logger(auth(mux))`}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Differences</p>
          <ul className="mt-2 space-y-2 text-[#5f6368]">
            <li><strong>Laravel:</strong> Full-stack, automatic CSRF/auth, dependency injection</li>
            <li><strong>Express:</strong> Minimal, flexible, huge ecosystem</li>
            <li><strong>Go:</strong> No built-in, manual patterns, high performance</li>
          </ul>
        </div>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Middleware = Security checkpoints for HTTP requests</li>
            <li>Laravel uses classes with handle() method</li>
            <li>Express uses functions with (req, res, next)</li>
            <li>Go uses higher-order functions wrapping http.Handler</li>
            <li>All pass "request" deeper via next() / next.ServeHTTP()</li>
            <li>CSRF is built-in in Laravel, manual in Go/Express</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}