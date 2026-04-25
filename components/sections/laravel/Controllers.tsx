import { CodeBlock, Tip, ComparisonTable } from '@/components/ui'

export function Controllers() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="controllers" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Controllers
        </h2>
        <p>Instead of defining all of your request handling logic as closures in route files, you can organize this behavior using Controller classes. Controllers group related request handling logic into a single class.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Basic Controllers</h3>
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

        <p className="mt-4">You can route to this controller action like so:</p>
        <CodeBlock>{`use App\\Http\\Controllers\\UserController;

Route::get('/user/{id}', [UserController::class, 'show']);`}</CodeBlock>
      </section>

      <section>
        <h3 id="single-action-controllers" className="text-[#5f6368] mt-8 font-semibold">Single Action Controllers</h3>
        <p>If a controller action is particularly complex, you might find it convenient to dedicate an entire controller class to that single action using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">__invoke</code> method.</p>
        <CodeBlock>{`<?php

namespace App\\Http\\Controllers;

class ProvisionServer extends Controller
{
    public function __invoke()
    {
        // Provision the server...
    }
}`}</CodeBlock>
        <p className="mt-4">Routing to an invokable controller is very clean:</p>
        <CodeBlock>{`use App\\Http\\Controllers\\ProvisionServer;

Route::post('/server', ProvisionServer::class);`}</CodeBlock>
      </section>

      <section>
        <h3 id="resource-controllers" className="text-[#5f6368] mt-8 font-semibold">Resource Controllers (CRUD)</h3>
        <p>Laravel resource routing assigns the typical "CRUD" routes to a controller with a single line of code.</p>
        <CodeBlock>{`// Generate the controller from the terminal
// php artisan make:controller PhotoController --resource

use App\\Http\\Controllers\\PhotoController;

Route::resource('photos', PhotoController::class);`}</CodeBlock>

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

        <Tip>
          <strong>JS Tip:</strong> This is a massive time-saver compared to Express.js where you must manually wire up every single route for a REST API.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
