import { CodeBlock, Note, Tip } from '@/components/ui'

export function Sanctum() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="sanctum" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Sanctum (API Auth)
        </h2>
        <p>Laravel Sanctum provides a featherweight authentication system for SPAs (single page applications), mobile applications, and simple, token-based APIs.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Issuing API Tokens</h3>
        <p>You can issue tokens to users for mobile or desktop apps. Users can have multiple tokens with different abilities.</p>
        <CodeBlock>{`$user = User::where('email', $request->email)->first();

if (! $user || ! Hash::check($request->password, $user->password)) {
    return response()->json(['message' => 'Invalid credentials'], 401);
}

$token = $user->createToken('device-name')->plainTextToken;

return response()->json(['token' => $token]);`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is an alternative to JWT (JSON Web Tokens). Sanctum tokens are simpler to manage because they are stored in your database, making revocation (logging out a specific device) extremely easy.
        </Tip>
      </section>

      <section>
        <h3 id="protecting-api-routes" className="text-[#5f6368] mt-8 font-semibold">Protecting API Routes</h3>
        <p>Protect your API routes using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">auth:sanctum</code> middleware.</p>
        <CodeBlock>{`use Illuminate\\Http\\Request;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
