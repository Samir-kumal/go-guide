'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function AuthenticationAuthorizationTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="authentication-authorization" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Authentication & Authorization - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is authentication vs authorization?</li>
            <li>2. Laravel's auth setup</li>
            <li>3. Authentication methods</li>
            <li>4. Gates (closure-based authorization)</li>
            <li>5. Policies (class-based authorization)</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel authentication and authorization
          with comparisons to Go and Node.js!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Authentication vs Authorization
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Authentication = Checking ID at the door - "Who are you?"</li>
            <li>Authorization = VIP list check - "What are you allowed to do?"</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel makes implementing both very simple. In fact, almost everything is configured for you out of the box.
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Laravel's Auth Setup
        </h3>

        <p className="text-[#5f6368] mt-2">
          Getting started with authentication is incredibly easy in Laravel:
        </p>

        <CodeBlock>{`# Install Laravel Breeze (recommended)
composer require laravel/breeze --dev
php artisan breeze:install

# Or use Laravel UI
composer require laravel/ui
php artisan ui bootstrap --auth`}</CodeBlock>

        <p className="text-[#5f6368] mt-4">
          Laravel Breeze provides a complete authentication scaffold with login, registration,
          password reset, and email verification.
        </p>

        <Tip>
          <strong>AHA Moment:</strong> This replaces complex setups with Passport.js or NextAuth.
          Laravel handles sessions, hashing, and user retrieval automatically!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Authentication Methods
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Auth::attempt()</h4>

        <p className="text-[#5f6368] mt-2">
          The most common way to authenticate users:
        </p>

        <CodeBlock>{`use Illuminate\\Support\\Facades\\Auth;

// Attempt to log in a user
if (Auth::attempt(['email' => $email, 'password' => $password])) {
    // Authentication passed...
    $request->session()->regenerate();
    return redirect()->intended('dashboard');
}

// Get the currently authenticated user
$user = Auth::user();

// Check if user is logged in
if (Auth::check()) {
    // User is authenticated
}

// Logout
Auth::logout();
$request->session()->invalidate();
$request->session()->regenerateToken();`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using Guard</h4>

        <p className="text-[#5f6368] mt-2">
          Different guards for different user types:
        </p>

        <CodeBlock>{`// Use 'web' guard (default)
Auth::guard('web')->attempt($credentials);

// Use 'admin' guard for administrators
Auth::guard('admin')->attempt($credentials);

// Check current guard
$currentGuard = Auth::guard('web')->check();
$user = Auth::guard('admin')->user();`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Login Throttling</h4>

        <CodeBlock>{`// In LoginController
use Illuminate\\Foundation\\Auth\\ThrottlesLogins;

class LoginController extends Controller
{
    use ThrottlesLogins;

    protected $maxAttempts = 5;
    protected $decaySeconds = 60; // 1 minute
}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Basic Authentication</p>
          <p className="mt-2 text-sm">Practice authentication methods:</p>
          <CodeBlock>{`// Exercise 1: Check if user is authenticated
if (Auth::check()) {
    echo "Welcome, " . Auth::user()->name;
}

// Exercise 2: Attempt login
$credentials = ['email' => 'user@example.com', 'password' => 'password'];
if (Auth::attempt($credentials)) {
    return redirect('/dashboard');
}

// Exercise 3: Get authenticated user
$user = Auth::user();
$isAdmin = $user->is_admin;`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Authorization: Gates & Policies
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel provides two primary ways of authorizing actions: Gates and Policies.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Gates (Closure Based)</h4>

        <p className="text-[#5f6368] mt-2">
          Gates are closures that determine if a user can perform an action. They're great for simple, inline authorization:
        </p>

        <CodeBlock>{`// Define in AppServiceProvider boot()
Gate::define('update-post', function (User $user, Post $post) {
    return $user->id === $post->user_id;
});

// Or with method
Gate::define('delete-post', 'PostPolicy@delete');

// Check authorization
if (Gate::allows('update-post', $post)) {
    // User can update
}

if (Gate::denies('delete-post', $post)) {
    // User cannot delete
}

// Or using can() helper
$this->authorize('update', $post);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Policies (Class Based)</h4>

        <p className="text-[#5f6368] mt-2">
          Policies are classes that organize authorization logic around a particular model or resource.
          Better for complex authorization rules:
        </p>

        <CodeBlock>{`# Generate policy
php artisan make:policy PostPolicy --model=Post

# Policy class
class PostPolicy
{
    public function view(User $user, Post $post): bool
    {
        return true; // Anyone can view
    }

    public function create(User $user): bool
    {
        return $user->email_verified_at !== null;
    }

    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    public function delete(User $user, Post $post): bool
    {
        return $user->is_admin && $user->id === $post->user_id;
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using Policies in Controllers</h4>

        <CodeBlock>{`// In controller - automatic policy resolution
public function show(Post $post)
{
    $this->authorize('view', $post);
    return view('posts.show', compact('post'));
}

public function update(Request $request, Post $post)
{
    $this->authorize('update', $post);
    $post->update($request->validated());
}

// Manual policy check
if (Policy::check($user, 'update', $post)) {
    // Can update
}`}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Gates</th>
              <th>Policies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Definition</td>
              <td>Closure in provider</td>
              <td>Dedicated class</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Simple, one-off rules</td>
              <td>Complex CRUD rules</td>
            </tr>
            <tr>
              <td>Organization</td>
              <td>All in one place</td>
              <td>Model-specific</td>
            </tr>
            <tr>
              <td>Testing</td>
              <td>Can test closures</td>
              <td>Testable methods</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Authorization</p>
          <p className="mt-2 text-sm">Practice authorization with gates and policies:</p>
          <CodeBlock>{`// Exercise 1: Define a gate
Gate::define('view-dashboard', function (User $user) {
    return $user->is_active;
});

// Exercise 2: Check gate
if (Gate::allows('view-dashboard')) {
    return redirect('/dashboard');
}

// Exercise 3: Use policy in controller
public function destroy(Post $post)
{
    $this->authorize('delete', $post);
    $post->delete();
    return redirect('/posts');
}`}</CodeBlock>
        </div>
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
              <td>Auth</td>
              <td>Auth::attempt()</td>
              <td>Manual + bcrypt</td>
              <td>Passport.js</td>
            </tr>
            <tr>
              <td>Sessions</td>
              <td>Built-in</td>
              <td> gorilla/sessions</td>
              <td>express-session</td>
            </tr>
            <tr>
              <td>Middleware</td>
              <td>Auth global</td>
              <td>http.Handler</td>
              <td>express middleware</td>
            </tr>
            <tr>
              <td>Authorization</td>
              <td>Gates + Policies</td>
              <td>Casbin</td>
              <td>Access control libs</td>
            </tr>
            <tr>
              <td>Roles</td>
              <td>@can, @role</td>
              <td>Manual check</td>
              <td>Manual check</td>
            </tr>
            <tr>
              <td>Password hashing</td>
              <td>bcrypt (auto)</td>
              <td>bcrypt package</td>
              <td>bcrypt npm</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Go</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-[#ffebee] p-4 rounded-lg">
            <p className="font-semibold text-[#c62828]">Laravel</p>
            <CodeBlock>{`// Authenticateif (Auth::attempt($credentials)) {
    return redirect('/dashboard');
}

// Gate authorization
Gate::define('edit-post', function ($user, $post) {
    return $user->id === $post->user_id;
});`}</CodeBlock>
          </div>

          <div className="bg-[#e3f2fd] p-4 rounded-lg">
            <p className="font-semibold text-[#1565c0]">Go</p>
            <CodeBlock>{`// Manual authenticate
err := bcrypt.CompareHashAndPassword(
    user.PasswordHash,
    []byte(password),
)

// Middleware authorization
func requireAuth(h http.Handler) http.Handler {
    return http.HandlerFunc(func(w, r) {
        session, _ := store.Get(r, "session")
        if session.Values["user_id"] == nil {
            http.Redirect(w, r, "/login", 302)
            return
        }
        h.ServeHTTP(w, r)
    })
}`}</CodeBlock>
          </div>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Node.js</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-[#ffebee] p-4 rounded-lg">
            <p className="font-semibold text-[#c62828]">Laravel</p>
            <CodeBlock>{`// Simple auth
Auth::attempt(['email' => $email, 'password' => $password]);

// Policy
$user->can('update', $post);`}</CodeBlock>
          </div>

          <div className="bg-[#fff3e0] p-4 rounded-lg">
            <p className="font-semibold text-[#e65100]">Node.js</p>
            <CodeBlock>{`// Passport.js
passport.authenticate('local')(req, res, () => {});

// Middleware
function requireAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}`}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel has "batteries included" authentication - Breeze gives you complete
            auth out of the box. Go and Node.js require manual setup but offer more control.
            Laravel's Gates and Policies are more structured than most Node.js access control patterns.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-[#FF2D20] text-2xl font-semibold">
          CHEAT SHEET: Authentication & Authorization
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Login</td>
              <td>{"Auth::attempt($credentials)"}</td>
              <td>Authenticate user</td>
            </tr>
            <tr>
              <td>Check</td>
              <td>{"Auth::check()"}</td>
              <td>Is logged in</td>
            </tr>
            <tr>
              <td>User</td>
              <td>{"Auth::user()"}</td>
              <td>Get current user</td>
            </tr>
            <tr>
              <td>Logout</td>
              <td>{"Auth::logout()"}</td>
              <td>Log out user</td>
            </tr>
            <tr>
              <td>Gate</td>
              <td>{"Gate::define()"}</td>
              <td>Define closure rule</td>
            </tr>
            <tr>
              <td>Gate check</td>
              <td>{"Gate::allows()"}</td>
              <td>Check gate rule</td>
            </tr>
            <tr>
              <td>Policy</td>
              <td>{"php artisan make:policy"}</td>
              <td>Generate policy class</td>
            </tr>
            <tr>
              <td>Authorize</td>
              <td>{"$this->authorize()"}</td>
              <td>Check policy in controller</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </section>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Authentication = "Who are you?" (login)</li>
          <li>Authorization = "What can you do?" (permissions)</li>
          <li>Laravel Breeze handles all auth scaffolding</li>
          <li>Gates are great for simple, one-off rules</li>
          <li>Policies are better for complex CRUD operations</li>
          <li>Gates use closures, Policies use classes</li>
          <li>Use @can in Blade for view-level authorization</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}