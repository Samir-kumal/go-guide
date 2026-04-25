import { CodeBlock, Note, Tip, Warning } from '@/components/ui'

export function AuthenticationAuthorization() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="authentication-authorization" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Authentication & Authorization
        </h2>
        <p>Laravel makes implementing authentication very simple. In fact, almost everything is configured for you out of the box.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Authentication Basics</h3>
        <CodeBlock>{`use Illuminate\\Support\\Facades\\Auth;

// Attempt to log in a user
if (Auth::attempt(['email' => $email, 'password' => $password])) {
    // Authentication passed...
    return redirect()->intended('dashboard');
}

// Get currently authenticated user
$user = Auth::user();

// Check if user is logged in
if (Auth::check()) {
    // ...
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This replaces complex setups with <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Passport.js</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">NextAuth</code>. Laravel handles sessions, hashing, and user retrieval automatically.
        </Tip>
      </section>

      <section>
        <h3 id="gates-policies" className="text-[#5f6368] mt-8 font-semibold">Authorization: Gates & Policies</h3>
        <p>Laravel provides two primary ways of authorizing actions: Gates and Policies. Think of Gates as closures and Policies as classes organized around a specific model.</p>
        
        <h4 className="font-semibold mt-4">Gates (Closure Based)</h4>
        <CodeBlock>{`Gate::define('update-post', function (User $user, Post $post) {
    return $user->id === $post->user_id;
});

if (Gate::allows('update-post', $post)) {
    // The user can update the post...
}`}</CodeBlock>

        <h4 className="font-semibold mt-4">Policies (Class Based)</h4>
        <p>Policies are classes that organize authorization logic around a particular model or resource.</p>
        <CodeBlock>{`# php artisan make:policy PostPolicy --model=Post

class PostPolicy
{
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }
}

// In Controller:
$this->authorize('update', $post);`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
