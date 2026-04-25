'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function SanctumTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="sanctum" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Sanctum (API Auth) - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Sanctum and when to use it</li>
            <li>2. Issuing API tokens</li>
            <li>3. Protecting API routes</li>
            <li>4. Token abilities (scopes)</li>
            <li>5. SPA authentication</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Laravel Sanctum authentication
          with comparisons to Go and Node.js patterns!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Laravel Sanctum?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Sanctum token = A hotel key card - easy to issue, easy to revoke</li>
            <li>JWT = A permanent tattoo - hard to change once issued</li>
            <li>Session = A velvet rope - works great in person, poor over API</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel Sanctum provides a featherweight authentication system for SPAs
          (single page applications), mobile applications, and simple, token-based APIs.
          It is the recommended auth solution for Laravel APIs.
        </p>

        <Tip>
          When to use Sanctum: Use Sanctum for mobile apps, SPAs (React/Vue/Next.js frontends),
          and any API consumed by multiple clients. Use Laravel Breeze/Jetstream for full-stack auth.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Issuing API Tokens
        </h3>

        <p className="text-[#5f6368] mt-2">
          Users can have multiple tokens for different devices. Each token can have specific abilities.
        </p>

        <CodeBlock>{`$user = User::where('email', $request->email)->first();

if (! $user || ! Hash::check($request->password, $user->password)) {
    return response()->json(['message' => 'Invalid credentials'], 401);
}

// Create a token with optional name and abilities
$token = $user->createToken('device-name', ['read', 'write'])->plainTextToken;

return response()->json(['token' => $token]);`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create an API Token</p>
          <p className="mt-2 text-sm">Practice issuing tokens with different abilities:</p>
          <CodeBlock>{`// In your controller:
// 1. Find user (or auth()->user())
$user = User::find(1);

// 2. Create token with abilities
$token = $user->createToken('my-phone', [
    'posts:read',
    'posts:write',
])->plainTextToken;

// 3. Return to client (save securely!)
return response()->json([
    'token' => $token,
    'token_type' => 'Bearer'
]);`}</CodeBlock>
        </div>

        <Tip>
          AHA Moment: Sanctum tokens are simpler than JWT because they are stored in your database.
          This makes revocation extremely easy - just delete the token from the database!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Protecting API Routes
        </h3>

        <p className="text-[#5f6368] mt-2">
          Protect your API routes using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">auth:sanctum</code> middleware.
        </p>

        <CodeBlock>{`use Illuminate\\Http\\Request;

// Single route
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route group
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/posts', [PostController::class, 'store']);
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Getting the Authenticated User</h4>

        <CodeBlock>{`// From Request
Route::get('/profile', function (Request $request) {
    return $request->user();
});

// From auth() helper
Route::get('/profile', function () {
    return auth()->user();
});`}</CodeBlock>

        <Note>
          Note: The <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">auth:sanctum</code> middleware
          is just an alias for <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">auth:api</code>
          in older versions.
        </Note>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Token Abilities (Scopes)
        </h3>

        <p className="text-[#5f6368] mt-2">
          Define what each token can do with abilities:
        </p>

        <CodeBlock>{`// Create token with specific abilities
$token = $user->createToken('read-only', ['posts:read']);

// Check ability in request
Route::get('/posts', function (Request $request) {
    // Has the 'posts:read' ability?
    if ($request->user()->tokenCan('posts:read')) {
        return Post::all();
    }
    return response()->json(['error' => 'Forbidden'], 403);
})->middleware('auth:sanctum');`}</CodeBlock>

        <CodeBlock>{`// Require specific ability for route
Route::get('/posts', function () {
    return Post::all();
})->middleware('auth:sanctum:posts:read');`}</CodeBlock>

        <Warning>
          Warning: Token abilities are simple strings. In production, consider using more granular permissions
          checking for critical operations.
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          SPA Authentication
        </h3>

        <p className="text-[#5f6368] mt-2">
          Sanctum provides SPA authentication out of the box:
        </p>

        <CodeBlock>{`// .env
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000

// routes/sanctum.php (auto-generated)
// $node->any('sanctum/csrf-cookie');

// Frontend: Get CSRF token first
async function csrf() {
    await axios.get('/sanctum/csrf-cookie');
}

// Then make authenticated requests
async function fetchPosts() {
    await csrf();
    const response = await axios.get('/api/posts');
    return response.data;
}`}</CodeBlock>

        <Tip>
          Tip: The CSRF cookie flow: (1) Frontend calls /sanctum/csrf-cookie,
          (2) Laravel sets XSRF-TOKEN cookie, (3) Frontend reads cookie and sends
          in X-XSRF-TOKEN header for subsequent requests.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Sanctum</th>
              <th>Go</th>
              <th>Node.js Passport</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Token storage</td>
              <td>Database</td>
              <td>Custom (DB/redis)</td>
              <td>Database</td>
            </tr>
            <tr>
              <td>Token type</td>
              <td>Server-signed</td>
              <td>JWT or server-signed</td>
              <td>JWT or server-signed</td>
            </tr>
            <tr>
              <td>Revocation</td>
              <td>Database delete</td>
              <td>DB/redis delete</td>
              <td>DB token delete</td>
            </tr>
            <tr>
              <td>Scopes</td>
              <td>Built-in abilities</td>
              <td>Custom claims</td>
              <td>Custom scopes</td>
            </tr>
            <tr>
              <td>CSRF protection</td>
              <td>Built-in</td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>SPA auth</td>
              <td>Built-in</td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Sanctum provides "batteries included" auth - CSRF, token management, and SPA auth come built-in.
            Go and Node.js require manual implementation or third-party packages for similar features.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go Auth Comparison
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go: JWT Middleware</h4>

        <CodeBlock>{`// Go with JWT:
// Generate token (server signs)
token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "user_id": user.ID,
    "exp": time.Now().Add(time.Hour*24).Unix(),
})
tokenString, _ := token.SignedString([]byte("secret"))

// Verify token middleware
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenStr := c.GetHeader("Authorization")
        // Parse and validate token...
        c.Set("userID", claims.UserID)
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js: Passport</h4>

        <CodeBlock>{`// Node.js with Passport:
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Configure strategy
passport.use(new LocalStrategy(async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid credentials');
    }
    return user;
}));

// Generate token (JWT)
const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          CHEAT SHEET: Sanctum Operations
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
              <td>Create token</td>
              <td>{"$user->createToken('name')"}</td>
              <td>Issue new API token</td>
            </tr>
            <tr>
              <td>Create with abilities</td>
              <td>{"$user->createToken('name', ['read'])"}</td>
              <td>Token with scopes</td>
            </tr>
            <tr>
              <td>Get all tokens</td>
              <td>{"$user->tokens"}</td>
              <td>User's tokens</td>
            </tr>
            <tr>
              <td>Revoke token</td>
              <td>{"$token->delete()"}</td>
              <td>Delete specific token</td>
            </tr>
            <tr>
              <td>Check ability</td>
              <td>{"$user->tokenCan('read')"}</td>
              <td>Verify scope</td>
            </tr>
            <tr>
              <td>Current token</td>
              <td>{"$request->user()->token()"}</td>
              <td>Token used in request</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Sanctum tokens are simpler than JWT</li>
            <li>Storage in database = easy revocation</li>
            <li>Use auth:sanctum middleware</li>
            <li>Token abilities provide scopes</li>
            <li>CSRF cookie for SPA auth</li>
            <li>Multiple tokens per user supported</li>
            <li>Alternative: JWT for stateless auth</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}