import { CodeBlock, Tip } from '@/components/ui'

export function RequestsResponses() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="requests-responses" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Requests & Responses
        </h2>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Accessing Request Data</h3>
        <p>You can access the current HTTP request via dependency injection or by using the global <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">request()</code> helper.</p>
        <CodeBlock>{`use Illuminate\\Http\\Request;

// Via Dependency Injection (Recommended)
public function store(Request $request)
{
    $name = $request->input('name');
    $email = $request->input('email', 'default@example.com');
    
    // Check if input exists
    if ($request->has('name')) {
        // ...
    }
}

// Via global helper
$value = request('key', 'default_value');`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$request-&gt;input(&apos;name&apos;)</code> in Laravel is exactly like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">req.body.name</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">req.query.name</code> in Express.js. Laravel abstracts away whether it came from the query string or the POST body.
        </Tip>
      </section>

      <section>
        <h3 id="responses" className="text-[#5f6368] mt-8 font-semibold">Creating Responses</h3>
        <p>All routes and controllers should return a response to be sent back to the user&apos;s browser.</p>
        
        <h4 className="font-semibold mt-4">JSON Responses (APIs)</h4>
        <p>If you return an array or object, Laravel will automatically convert it into a JSON response.</p>
        <CodeBlock>{`Route::get('/api/user', function () {
    return [
        'name' => 'John',
        'role' => 'admin'
    ]; // Automatically returned as JSON
});

// Explicit JSON response with status code
return response()->json([
    'error' => 'Not Found'
], 404);`}</CodeBlock>

        <h4 className="font-semibold mt-4">Redirects</h4>
        <p>Redirecting users to another page or named route.</p>
        <CodeBlock>{`// Basic redirect
return redirect('/home/dashboard');

// Redirect to a named route (Recommended)
return redirect()->route('profile.show', ['id' => 1]);

// Redirect back with flashed session data
return back()->with('success', 'Profile updated!');`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
