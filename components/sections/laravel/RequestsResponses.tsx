'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function RequestsResponsesTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="requests-responses" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Requests & Responses - The Complete Guide
        </h2>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. Accessing Request Data</li>
            <li>2. Request input methods</li>
            <li>3. Creating responses</li>
            <li>4. JSON & redirects</li>
            <li>5. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel request/response handling 
          with comparisons to Go and Node.js Express!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Accessing Request Data
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Request = A mail carrier delivering all incoming data to your controller</li>
            <li><code className="text-sm">$request-&gt;input()</code> = Opening the envelope to read specific fields</li>
            <li>Response = Your reply letter - can be JSON, redirect, or anything</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          You can access the current HTTP request via dependency injection or by using the global <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">request()</code> helper.
        </p>

        <CodeBlock>{"use Illuminate\\Http\\Request;\n\n// Via Dependency Injection (Recommended)\npublic function store(Request $request)\n{\n    $name = $request->input('name');\n    $email = $request->input('email', 'default@example.com');\n    \n    // Check if input exists\n    if ($request->has('name')) {\n        // ...\n    }\n}\n\n// Via global helper\n$value = request('key', 'default_value');"}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$request-&gt;input(&apos;name&apos;)</code> in Laravel is exactly like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">req.body.name</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">req.query.name</code> in Express.js. Laravel abstracts away whether it came from the query string or the POST body.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Request Input Methods
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel provides multiple ways to access request data:
        </p>

        <CodeBlock>{"public function handle(Request $request)\n{\n    // Get single value\n    $name = $request->input('name');\n    \n    // Get with default\n    $name = $request->input('name', 'Guest');\n    \n    // Get all input as array\n    $all = $request->all();\n    \n    // Get only specific fields\n    $only = $request->only(['name', 'email']);\n    \n    // Get except certain fields\n    $except = $request->except(['password', 'secret']);\n    \n    // Check if key exists\n    if ($request->has('email')) { }\n    \n    // Check if multiple keys exist\n    if ($request->has(['name', 'email'])) { }\n    \n    // Check if any key exists\n    if ($request->hasAny(['name', 'email'])) { }\n    \n    // Query string only\n    $query = $request->query('search');\n    \n    // POST body only\n    $post = $request->post('username');\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Route Parameters</h4>
        
        <CodeBlock>{"// Route: /user/{id}/post/{postId}\npublic function show(Request $request, $id, $postId)\n{\n    // Route parameters\n    $id = $request->route('id');\n    $postId = $request->route('postId');\n}"}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Access Request Data</p>
          <p className="mt-2 text-sm">Practice accessing different request data types:</p>
          <CodeBlock>{"public function practice(Request $request)\n{\n    // Get name with default\n    $name = $request->input('name', 'Anonymous');\n    \n    // Get multiple fields\n    $data = $request->only(['email', 'password']);\n    \n    // Check if email exists\n    if ($request->has('email')) {\n        return \"Email provided: \" . $request->input('email');\n    }\n    \n    return \"No email provided\";\n}"}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 id="responses" className="text-[#FF2D20] mt-10 text-xl font-semibold">
          Creating Responses
        </h3>
        
        <p className="text-[#5f6368] mt-2">
          All routes and controllers should return a response to be sent back to the user's browser.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Basic Response</h4>
        
        <CodeBlock>{"// Return string (auto-wrapped)\nreturn 'Hello World';\n\n// Return with status code\nreturn response('Not Found', 404);\n\n// Explicit response object\nreturn response()->json(['message' => 'Done'], 200);"}</CodeBlock>

        <h4 className="font-semibold mt-4">JSON Responses (APIs)</h4>
        <p>If you return an array or object, Laravel will automatically convert it into a JSON response.</p>
        
        <CodeBlock>{"Route::get('/api/user', function () {\n    return [\n        'name' => 'John',\n        'role' => 'admin'\n    ]; // Automatically returned as JSON\n});\n\n// Explicit JSON response with status code\nreturn response()->json([\n    'error' => 'Not Found'\n], 404);"}</CodeBlock>

        <h4 className="font-semibold mt-4">Redirects</h4>
        <p>Redirecting users to another page or named route.</p>
        
        <CodeBlock>{"// Basic redirect\nreturn redirect('/home/dashboard');\n\n// Redirect to a named route (Recommended)\nreturn redirect()->route('profile.show', ['id' => 1]);\n\n// Redirect back with flashed session data\nreturn back()->with('success', 'Profile updated!');"}</CodeBlock>

        <h4 className="font-semibold mt-4">Response with Headers</h4>
        
        <CodeBlock>{"return response()\n    ->json(['data' => $user])\n    ->header('Content-Type', 'application/json')\n    ->withHeaders([\n        'X-Custom-Header' => 'value'\n    ]);"}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Laravel automatically sets Content-Type to application/json when you return arrays or use response()-&gt;json()
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
              <th>Laravel</th>
              <th>Go</th>
              <th>Node.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Get Request Body</td>
              <td>{"$request->input()"}</td>
              <td>{"r.Body"}</td>
              <td>{"req.body"}</td>
            </tr>
            <tr>
              <td>Get Query String</td>
              <td>{"$request->query()"}</td>
              <td>{"r.URL.Query()"}</td>
              <td>{"req.query"}</td>
            </tr>
            <tr>
              <td>Get Route Param</td>
              <td>{"$request->route()"}</td>
              <td>{"chi.Params()"}</td>
              <td>{"req.params"}</td>
            </tr>
            <tr>
              <td>JSON Response</td>
              <td>{"return []"}</td>
              <td>{"json.NewEncoder"}</td>
              <td>{"res.json()"}</td>
            </tr>
            <tr>
              <td>Redirect</td>
              <td>{"redirect()->route()"}</td>
              <td>{"http.Redirect()"}</td>
              <td>{"res.redirect()"}</td>
            </tr>
            <tr>
              <td>Response Headers</td>
              <td>{"response()->header()"}</td>
              <td>{"w.Header()"}</td>
              <td>{"res.setHeader()"}</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Code Comparison</h4>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-[#fdf2f2] p-4 rounded-lg">
            <p className="font-semibold text-[#FF2D20]">Laravel</p>
            <CodeBlock>{"// Get input with default\n$name = $request->input('name', 'Guest');\n\n// Return JSON\nreturn ['user' => $name];"}</CodeBlock>
          </div>
          
          <div className="bg-[#e8f5e9] p-4 rounded-lg">
            <p className="font-semibold text-[#2e7d32]">Go</p>
            <CodeBlock>{"// Get form value\nname := r.FormValue(\"name\")\nif name == \"\" {\n    name = \"Guest\"\n}\n\n// Return JSON\nw.Header().Set(\"Content-Type\", \"application/json\")\njson.NewEncoder(w).Encode(map[string]string{\n    \"user\": name,\n})"}</CodeBlock>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-[#fff3e0] p-4 rounded-lg">
            <p className="font-semibold text-[#f57c00]">Node.js Express</p>
            <CodeBlock>{"// Get input with default\nconst name = req.body.name || 'Guest';\n\n// Return JSON\nres.json({ user: name });"}</CodeBlock>
          </div>
          
          <div className="bg-[#e3f2fd] p-4 rounded-lg">
            <p className="font-semibold text-[#1976d2]">Node.js Fastify</p>
            <CodeBlock>{"// Get input with default\nconst name = request.body.name || 'Guest';\n\n// Return JSON\nreply.send({ user: name });"}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel makes request handling effortless with automatic type detection and clean helper methods. 
            Go requires more explicit handling but gives you complete control. 
            Express sits in the middle - easy but requires middleware for advanced features.
          </p>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}