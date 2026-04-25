'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function ControllersTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="controllers" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Controllers - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are Controllers?</li>
            <li>2. Basic Controllers</li>
            <li>3. Single Action Controllers</li>
            <li>4. Resource Controllers (CRUD)</li>
            <li>5. Go/Express Comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel controllers with comparisons to Go HTTP handlers and Express routes!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Controllers?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Routes = A receptionist who directs calls to the right department</li>
            <li>Controllers = The department manager who handles the actual work</li>
            <li>Methods = Individual employees within that department</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Instead of defining all of your request handling logic as closures in route files, 
          you can organize this behavior using Controller classes. Controllers group related 
          request handling logic into a single class.
        </p>

        <Warning>
          <strong>Warning:</strong> In Laravel, keep controllers thin! If your controller is doing too much 
          work, consider using Form Requests, Services, or Actions to delegate logic.
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Basic Controllers
        </h3>

        <p className="text-[#5f6368] mt-3">
          Controllers live in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">app/Http/Controllers/</code>. 
          They extend the base Controller class.
        </p>

        <CodeBlock>{`<?php

namespace App\\Http\\Controllers;

use App\\Models\\User;
use Illuminate\\View\\View;

class UserController extends Controller
{
    /**
     * Show the profile for a given user.
     */
    public function show(string $id): View
    {
        return view('user.profile', [
            'user' => User::findOrFail($id)
        ]);
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Routing to Controllers</h4>

        <p className="text-[#5f6368] mt-2">You can route to this controller action like so:</p>

        <CodeBlock>{`use App\\Http\\Controllers\\UserController;

Route::get('/user/{id}', [UserController::class, 'show']);`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create a Controller</p>
          <p className="mt-2 text-sm">Practice creating and routing to a controller:</p>
          <CodeBlock>{`// 1. Create the controller
// php artisan make:controller PostController

// 2. Define the controller
class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', compact('posts'));
    }
}

// 3. Add the route
Route::get('/posts', [PostController::class, 'index']);`}</CodeBlock>
        </div>

        <Tip>
          <strong>Tip:</strong> Use the controller method syntax <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">[Controller::class, 'method']</code> 
          instead of strings like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">'PostController@index'</code>. 
          It's more refactor-friendly!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Single Action Controllers
        </h3>

        <p className="text-[#5f6368] mt-3">
          If a controller action is particularly complex, you might find it convenient to dedicate 
          an entire controller class to that single action using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">__invoke</code> method.
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Regular Controller = A department with multiple employees</li>
            <li>Single Action Controller = A specialist office with just one person</li>
          </ul>
        </div>

        <CodeBlock>{`<?php

namespace App\\Http\\Controllers;

class ProvisionServer extends Controller
{
    public function __invoke()
    {
        // Provision the server...
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Clean Routing</h4>

        <p className="text-[#5f6368] mt-2">Routing to an invokable controller is very clean:</p>

        <CodeBlock>{`use App\\Http\\Controllers\\ProvisionServer;

Route::post('/server', ProvisionServer::class);`}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            In Go, you'd typically create a separate file for each handler function. 
            In Laravel, invokable controllers let you keep the file focused on one action 
            while still having a dedicated class.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Resource Controllers (CRUD)
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>REST API = A library with standardized operations</li>
            <li>Resource Controller = Auto-generating the librarian's playbook</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel resource routing assigns the typical "CRUD" routes to a controller with a single line of code.
        </p>

        <CodeBlock>{`// Generate the controller from the terminal
// php artisan make:controller PhotoController --resource

use App\\Http\\Controllers\\PhotoController;

Route::resource('photos', PhotoController::class);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Routes It Generates</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Verb</th>
              <th>URI</th>
              <th>Action</th>
              <th>Route Name</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>GET</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos</code></td><td>index</td><td>photos.index</td></tr>
            <tr><td>GET</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos/create</code></td><td>create</td><td>photos.create</td></tr>
            <tr><td>POST</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos</code></td><td>store</td><td>photos.store</td></tr>
            <tr><td>GET</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos/{"{photo}"}</code></td><td>show</td><td>photos.show</td></tr>
            <tr><td>GET</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos/{"{photo}"}/edit</code></td><td>edit</td><td>photos.edit</td></tr>
            <tr><td>PUT/PATCH</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos/{"{photo}"}</code></td><td>update</td><td>photos.update</td></tr>
            <tr><td>DELETE</td><td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">/photos/{"{photo}"}</code></td><td>destroy</td><td>photos.destroy</td></tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Resource Controller</p>
          <p className="mt-2 text-sm">Practice creating a resource controller:</p>
          <CodeBlock>{`// 1. Generate with artisan
// php artisan make:controller ArticleController --resource

// 2. The controller skeleton is auto-generated:
// public function index()    { }
// public function create()  { }
// public function store()   { }
// public function show()    { }
// public function edit()     { }
// public function update()   { }
// public function destroy()  { }

// 3. One line to rule them all!
Route::resource('articles', ArticleController::class);

// Check your routes:
// php artisan route:list`}</CodeBlock>
        </div>

        <Tip>
          <strong>JS Tip:</strong> This is a massive time-saver compared to Express.js where you must manually wire up every single route for a REST API.
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Partial Resources</h4>

        <p className="text-[#5f6368] mt-2">Only need some of the CRUD routes?</p>

        <CodeBlock>{`// Only index and show
Route::resource('photos', PhotoController::class)->only([
    'index', 'show'
]);

// Exclude certain routes
Route::resource('photos', PhotoController::class)->except([
    'destroy'
]);`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Express Comparison
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Key Differences</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Laravel</th>
              <th>Go (net/http)</th>
              <th>Express.js</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>File Organization</td>
              <td>One class per file</td>
              <td>Multiple handlers per file</td>
              <td>Multiple handlers per file</td>
            </tr>
            <tr>
              <td>Route Definition</td>
              <td>Declarative (Route::get)</td>
              <td>Handler registration</td>
              <td>Middleware-style</td>
            </tr>
            <tr>
              <td>CRUD Auto-generation</td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Route::resource</code></td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>Invokable Controllers</td>
              <td>Yes (<code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">__invoke</code>)</td>
              <td>N/A (functions)</td>
              <td>N/A (middleware)</td>
            </tr>
            <tr>
              <td>Dependency Injection</td>
              <td>Automatic via constructor</td>
              <td>Manual</td>
              <td>Manual (middleware)</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Go Handler</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel</p>
            <CodeBlock>{`class UserController extends Controller
{
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return view('user.profile', [
            'user' => $user
        ]);
    }
}

Route::get('/user/{id}', 
    [UserController::class, 'show']);`}</CodeBlock>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">Go</p>
            <CodeBlock>{`func showHandler(w http.ResponseWriter, 
    r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
    
    var user User
    if err := db.First(&user, id).Error; 
        err != nil {
        http.NotFound(w, r)
        return
    }
    tmpl.ExecuteTemplate(w, 
        "user/profile", user)
}

router.HandleFunc("/user/{id}", 
    showHandler).Methods("GET")`}</CodeBlock>
          </div>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel vs Express.js</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel (Resource)</p>
            <CodeBlock>{`// One line = 7 routes!
Route::resource('posts', 
    PostController::class);

// Auto-generated:
// GET    /posts
// GET    /posts/create
// POST   /posts
// GET    /posts/{id}
// GET    /posts/{id}/edit
// PUT    /posts/{id}
// DELETE /posts/{id}`}</CodeBlock>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Express.js (Manual)</p>
            <CodeBlock>{`// Must define all 7 routes manually
router.get('/', postController.index);
router.get('/create', postController.create);
router.post('/', postController.store);
router.get('/:id', postController.show);
router.get('/:id/edit', postController.edit);
router.put('/:id', postController.update);
router.delete('/:id', postController.destroy);`}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel controllers group related request handling into classes</li>
            <li>Resource controllers auto-generate all CRUD routes</li>
            <li>Single action controllers use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">__invoke</code> for focused endpoints</li>
            <li>Go handlers are typically functions, not classes</li>
            <li>Express requires manual route wiring compared to Laravel's resource</li>
            <li>All three frameworks can achieve the same results - it's about ergonomics</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}