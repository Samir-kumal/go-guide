'use client'

import { CodeBlock, Note, Tip, ComparisonTable } from '@/components/ui'

export function BladeTemplatesTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="blade-templates" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Blade Templates - The Complete Guide
        </h2>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Blade? Why use it?</li>
            <li>2. Displaying data (the basics)</li>
            <li>3. Blade directives (control structures)</li>
            <li>4. Layouts & inheritance</li>
            <li>5. Components & slots</li>
            <li>6. React/Go templates comparison</li>
          </ul>
        </div>
        
        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel Blade templating, 
          with React and Go template comparisons to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Blade? Why Use It?
        </h3>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Blade = A smart HTML file that knows how to inject PHP without you writing PHP</li>
            <li>Directives = Shorthand commands like @if that compile to PHP</li>
            <li>Layouts = The master template that child templates extend</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Blade is the simple, yet powerful templating engine included with Laravel. 
          Unlike other PHP templating engines, Blade does not restrict you from using plain PHP code 
          in your views. But most of the time, you won't need to!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Blade</th>
              <th>Plain PHP Views</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Syntax</td>
              <td>@if, @foreach</td>
              <td>if(), foreach()</td>
            </tr>
            <tr>
              <td>HTML Escaping</td>
              <td>Automatic with {"{{ }}"}</td>
              <td>Manual htmlspecialchars()</td>
            </tr>
            <tr>
              <td>Layouts</td>
              <td>@extends, @section</td>
              <td>require/include</td>
            </tr>
            <tr>
              <td>Components</td>
              <td>@component, slots</td>
              <td>Manual includes</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <Tip>
          AHA Moment: Blade templates are compiled to plain PHP and cached - there's no 
          performance penalty for using Blade over raw PHP!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-10 text-xl font-semibold">
          Displaying Data
        </h3>
        
        <p className="text-[#5f6368] mt-3">
          You may display data passed to your Blade views by wrapping the variable in curly braces. 
          Blade automatically escapes HTML to prevent XSS attacks.
        </p>

        <CodeBlock>{`// Route - passing data to view
Route::get('/', function () {
    return view('welcome', ['name' => 'Samantha']);
});

// welcome.blade.php
Hello, {{ $name }}.

// Output: Hello, Samantha.`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> Blade's <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{{ $name }}"}</code> is identical in concept to React's JSX <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{name}"}</code> or Vue's <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{{ name }}"}</code>.
        </Tip>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Raw Unescaped Output</h4>
        <p className="text-[#5f6368] mt-2">
          Use {"{!! $name !!}"} for unescaped output (be careful - XSS risk!):
        </p>

        <CodeBlock>{`// Dangerous - use only with trusted data!
{!! $name !!}

// Safe alternative: escape then unescape
{{ htmlspecialchars($name, ENT_QUOTES, 'UTF-8', false) }}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Display Data</p>
          <p className="mt-2 text-sm">Practice displaying data in Blade:</p>
          <CodeBlock>{`// routes/web.php
Route::get('/user/{id}', function ($id) {
    return view('user.profile', [
        'user' => [
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'role' => 'admin'
        ]
    ]);
});

// resources/views/user/profile.blade.php
<h1>Welcome, {{ $user['name'] }}!</h1>
<p>Email: {{ $user['email'] }}</p>
<p>Role: {{ $user['role'] }}</p>`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-10 text-xl font-semibold">
          Blade Directives
        </h3>
        
        <p className="text-[#5f6368] mt-3">
          Blade provides convenient shortcuts for common PHP control structures. 
          These compile to PHP under the hood!
        </p>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">If Statements</h4>
        <CodeBlock>{`@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don't have any records!
@endif

@unless (auth()->check())
    You are not logged in.
@endunless

@isset($records)
    Records are set!
@endisset

@empty($records)
    Records are empty!
@endempty`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Loops</h4>
        <CodeBlock>{`@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users found.</p>
@endforelse

@for ($i = 0; $i < 10; $i++)
    <p>Current value: {{ $i }}</p>
@endfor

@while (true)
    <p>I'm looping forever!</p>
@endwhile`}</CodeBlock>

        <Tip>
          Pro Tip: Use @forelse whenever you're looping over a collection! 
          It handles the empty state automatically - no more checking count() first.
        </Tip>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Use Directives</p>
          <p className="mt-2 text-sm">Practice using Blade directives:</p>
          <CodeBlock>{`// Display a list of products with conditional styling
@forelse ($products as $product)
    <div class="{{ $product->in_stock ? 'in-stock' : 'out-of-stock' }}">
        <h3>{{ $product->name }}</h3>
        @if ($product->on_sale)
            <span class="sale-badge">SALE!</span>
        @endif
    </div>
@empty
    <p>No products available.</p>
@endforelse

// Show/hide based on auth
@auth
    <p>Welcome back, {{ auth()->user()->name }}!</p>
@else
    <p>Please log in.</p>
@endauth`}</CodeBlock>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Other Useful Directives</h4>
        <CodeBlock>{`// Include another view
@include('partials.header')

// Include if exists
@includeIf('partials.optional')

// Include with data
@include('partials.card', ['title' => 'Hello'])

// Stack for scripts/styles
@push('scripts')
    <script src="/js/app.js"></script>
@endpush

// Auth check shortcuts
@auth('admin')
    Admin only content
@else
    Not admin
@endauth

@guest
    Show login button
@endguest`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-10 text-xl font-semibold">
          Layouts & Inheritance
        </h3>
        
        <p className="text-[#5f6368] mt-3">
          Define a master layout and extend it in child views. This is like React's layout system!
        </p>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">Master Layout</h4>
        <CodeBlock>{`{{-- resources/views/layouts/app.blade.php --}}
<html>
    <head>
        <title>App Name - @yield('title')</title>
    </head>
    <body>
        <nav>
            @section('navigation')
                <a href="/">Home</a>
                <a href="/about">About</a>
            @show
        </nav>
        
        <div class="container">
            @yield('content')
        </div>
        
        <footer>
            @yield('footer')
        </footer>
    </body>
</html>`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Child View</h4>
        <CodeBlock>{`{{-- resources/views/home.blade.php --}}
@extends('layouts.app')

@section('title', 'Home Page')

@section('navigation')
    @parent
    <a href="/contact">Contact</a>
@endsection

@section('content')
    <h1>Welcome to my website!</h1>
    <p>This will be injected into the master layout.</p>
@endsection

@section('footer')
    <p>&copy; 2024 My App</p>
@endsection`}</CodeBlock>

        <Note>
          <strong>Note:</strong> Use @parent to include the parent section's content. 
          Use @yield('section') to mark where content goes. Use @section/@endsection to define content.
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Component Syntax (Laravel 7+)</h4>
        <p className="text-[#5f6368] mt-2">
          Modern Blade components are cleaner and more reusable:
        </p>
        
        <CodeBlock>{`{{-- resources/views/components/layout.blade.php --}}
<div class="card">
    <div class="card-header">
        {{ $title }}
    </div>
    <div class="card-body">
        {{ $slot }}
    </div>
</div>

{{-- Using the component --}}
<x-layout title="My Title">
    This is the slot content!
</x-layout>`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create a Layout</p>
          <p className="mt-2 text-sm">Build a master layout with child pages:</p>
          <CodeBlock>{`{{-- master.blade.php --}}
<html>
<head>
    <title>@yield('title', 'Default Title')</title>
    @stack('styles')
</head>
<body>
    <header>@yield('header')</header>
    <main>@yield('content')</main>
    <footer>&copy; 2024</footer>
    @stack('scripts')
</body>
</html>

{{-- page.blade.php --}}
@extends('master')

@section('title', 'About Us')

@section('header')
    <h1>About Us</h1>
@endsection

@section('content')
    <p>We are a great company!</p>
@endsection`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-10 text-xl font-semibold">
          React & Go Templates Comparison
        </h3>
        
        <p className="text-[#5f6368] mt-3">
          Let's compare Blade to other template engines you might know!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Blade</th>
              <th>React JSX</th>
              <th>Go Templates</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data interpolation</td>
              <td>{"{{ $var }}"}</td>
              <td>{"{var}"}</td>
              <td>{"{{ .Var }}"}</td>
            </tr>
            <tr>
              <td>Unescaped output</td>
              <td>{"{!! $var !!}"}</td>
              <td>{"{/*dangerous*/}"}</td>
              <td>{"{{ .Var | safe }"}</td>
            </tr>
            <tr>
              <td>If statement</td>
              <td>{"@if() @endif"}</td>
              <td>{"{if cond && ...}"}</td>
              <td>{"{{if .Cond}} {{end}}"}</td>
            </tr>
            <tr>
              <td>Loop</td>
              <td>{"@foreach $items as $item"}</td>
              <td>{"{items.map(i => ...)"}</td>
              <td>{"{{range .Items}} {{end}}"}</td>
            </tr>
            <tr>
              <td>Include/partial</td>
              <td>{"@include('partial')"}</td>
              <td>import Component</td>
              <td>{"{{template \"partial\" .}}"}</td>
            </tr>
            <tr>
              <td>Layout/extend</td>
              <td>{"@extends @section"}</td>
              <td>Layouts/children</td>
              <td>{"{{define \"base\"}} {{end}}"}</td>
            </tr>
            <tr>
              <td>Components</td>
              <td>{"<x-component>"}</td>
              <td>{"<Component />"}</td>
              <td>N/A (use partials)</td>
            </tr>
            <tr>
              <td>Server-side</td>
              <td>Yes (PHP)</td>
              <td>Can be (SSR)</td>
              <td>Yes (Go)</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Code Comparison</h4>
        
        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Laravel Blade</p>
            <CodeBlock>{`@foreach ($users as $user)
    <div class="user">
        <h2>{{ $user->name }}</h2>
        @if ($user->admin)
            <span>Admin</span>
        @endif
    </div>
@endforeach`}</CodeBlock>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">React JSX</p>
            <CodeBlock>{`{users.map(user => (
    <div className="user">
        <h2>{user.name}</h2>
        {user.admin && <span>Admin</span>}
    </div>
))}`}</CodeBlock>
          </div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg my-4">
          <p className="font-semibold text-orange-800">Go Templates</p>
          <CodeBlock>{"{{range .Users}}\n<div class=\"user\">\n    <h2>{{.Name}}</h2>\n    {{if .Admin}}\n        <span>Admin</span>\n    {{end}}\n</div>\n{{end}}"}</CodeBlock>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Loop Comparison</h4>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Task</th>
              <th>Blade</th>
              <th>React</th>
              <th>Go</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Iterate</td>
              <td>{"@foreach $items as $item"}</td>
              <td>{"items.map(item =>)"}</td>
              <td>{"{{range $item := .Items}}"}</td>
            </tr>
            <tr>
              <td>Index</td>
              <td>{"$loop->index"}</td>
              <td>{"map((item, i) =>)"}</td>
              <td>{"{{$i := index .Items}}"}</td>
            </tr>
            <tr>
              <td>First/last</td>
              <td>{"$loop->first / last"}</td>
              <td>{"i === 0 / len-1"}</td>
              <td>{"$first / $last"}</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-10 text-xl font-semibold">
          Advanced Blade Features
        </h3>
        
        <h4 className="text-[#5f6368] mt-6 font-semibold">Blade Service Injection</h4>
        <CodeBlock>{`// Inject a service directly into the view
@inject('metrics', 'App\Services\MetricsService')

<p>Total users: {{ $metrics->getTotalUsers() }}</p>`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Custom Directives</h4>
        <CodeBlock>{`// In AppServiceProvider boot():
Blade::directive('datetime', function ($expression) {
    return "<?php echo ($expression)->format('m/d/Y H:i'); ?>";
});

// Usage in view:
@datetime($user->created_at)`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">View Composers</h4>
        <CodeBlock>{`// Bind data to all views automatically
View::composer('*', function ($view) {
    $view->with('currentUser', auth()->user());
});

// Or for specific views
View::composer(['home', 'dashboard'], function ($view) {
    $view->with('notifications', Notification::unread());
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Blade Components (Class-based)</h4>
        <CodeBlock>{`// app/View/Components/Alert.php
namespace App\\View\\Components;

use Illuminate\\View\\Component;

class Alert extends Component
{
    public function __construct(
        public string $type = 'info'
    ) {}

    public function render()
    {
        return view('components.alert');
    }
}

// resources/views/components/alert.blade.php
<div class="alert alert-{{ $type }}">
    {{ $slot }}
</div>

// Usage
<x-alert type="error">
    Something went wrong!
</x-alert>`}</CodeBlock>
      </section>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Blade compiles to PHP - no runtime overhead!</li>
          <li>Always use {"{{ }}"} for output - it escapes automatically</li>
          <li>Use @forelse for loops with empty states</li>
          <li>Layouts use @extends + @section/@yield</li>
          <li>Modern components use {"<x-component>"} syntax</li>
          <li>Use @parent to include parent content in overrides</li>
          <li>React/Go have similar concepts but different syntax</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}