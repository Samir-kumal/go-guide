import { CodeBlock, Note, Tip, Warning, ComparisonTable } from '@/components/ui'

export function Routing() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="routing" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Routing
        </h2>
        <p>Routing in Laravel is the process of mapping URLs to specific controller actions or closures.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Basic Routes</h3>
        <p>Laravel uses a fluent API to define routes for different HTTP verbs.</p>
        <CodeBlock>{`use Illuminate\\Support\\Facades\\Route;

Route::get('/users', function () {
    return 'Hello World';
});

Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);`}</CodeBlock>

        <Note>
          <strong>JS Tip:</strong> This is very similar to Express.js: <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">app.get('/users', (req, res) =&gt; ...)</code>.
        </Note>
      </section>

      <section>
        <h3 id="route-parameters" className="text-[#5f6368] mt-8 font-semibold">Route Parameters</h3>
        <p>Parameters are wrapped in curly braces <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{}"}</code> and passed as arguments to your closure or controller.</p>
        <CodeBlock>{`Route::get('/user/{id}', function (string $id) {
    return 'User '.$id;
});

// Optional parameters
Route::get('/user/{name?}', function (string $name = 'Guest') {
    return $name;
});

// With Regex constraints
Route::get('/user/{id}', function (string $id) {
    // ...
})->where('id', '[0-9]+');`}</CodeBlock>
      </section>

      <section>
        <h3 id="route-groups" className="text-[#5f6368] mt-8 font-semibold">Route Groups & Middleware</h3>
        <p>Groups allow you to share route attributes, such as middleware or prefixes, across a large number of routes.</p>
        <CodeBlock>{`Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        // Uses 'auth' & 'verified' middleware...
    });

    Route::prefix('admin')->group(function () {
        // All routes here are prefixed with /admin/...
        Route::get('/users', [AdminController::class, 'index']);
    });
});`}</CodeBlock>
      </section>

      <section>
        <h3 id="named-routes" className="text-[#5f6368] mt-8 font-semibold">Named Routes</h3>
        <p>Naming routes allows the convenient generation of URLs or redirects for specific routes.</p>
        <CodeBlock>{`Route::get('/user/profile', function () {
    // ...
})->name('profile');

// Generating URLs...
$url = route('profile');

// Generating Redirects...
return redirect()->route('profile');`}</CodeBlock>

        <Tip>
          <strong>Best Practice:</strong> Always name your routes! It makes your application much easier to maintain if you decide to change a URL later.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
