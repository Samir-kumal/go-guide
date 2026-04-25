import { CodeBlock, Tip } from '@/components/ui'

export function BladeTemplates() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="blade-templates" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Blade Templates
        </h2>
        <p>Blade is the simple, yet powerful templating engine that is included with Laravel. Unlike other PHP templating engines, Blade does not restrict you from using plain PHP code in your views.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Displaying Data</h3>
        <p>You may display data passed to your Blade views by wrapping the variable in curly braces. Blade automatically escapes HTML to prevent XSS attacks.</p>
        <CodeBlock>{`// Route
Route::get('/', function () {
    return view('welcome', ['name' => 'Samantha']);
});

// welcome.blade.php
Hello, {{ $name }}.

// Display unescaped data (Be careful!)
{!! $name !!}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> Blade&apos;s <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{{ $name }}"}</code> is identical in concept to React&apos;s JSX <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{name}"}</code> or Vue&apos;s <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">{"{{ name }}"}</code>.
        </Tip>
      </section>

      <section>
        <h3 id="blade-directives" className="text-[#5f6368] mt-8 font-semibold">Blade Directives</h3>
        <p>Blade provides convenient shortcuts for common PHP control structures.</p>
        
        <h4 className="font-semibold mt-4">If Statements</h4>
        <CodeBlock>{`@if (count($records) === 1)
    I have one record!
@elseif (count($records) > 1)
    I have multiple records!
@else
    I don't have any records!
@endif`}</CodeBlock>

        <h4 className="font-semibold mt-4">Loops</h4>
        <CodeBlock>{`@foreach ($users as $user)
    <p>This is user {{ $user->id }}</p>
@endforeach

// forelse is amazing: it loops, but provides an empty state!
@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users found.</p>
@endforelse`}</CodeBlock>
      </section>

      <section>
        <h3 id="blade-layouts" className="text-[#5f6368] mt-8 font-semibold">Layouts & Inheritance</h3>
        <p>You can define a master layout and extend it in child views.</p>
        
        <h4 className="font-semibold mt-4">Master Layout (layouts/app.blade.php)</h4>
        <CodeBlock>{`<html>
    <head>
        <title>App Name - @yield('title')</title>
    </head>
    <body>
        <div class="container">
            @yield('content')
        </div>
    </body>
</html>`}</CodeBlock>

        <h4 className="font-semibold mt-4">Child View</h4>
        <CodeBlock>{`@extends('layouts.app')

@section('title', 'Home Page')

@section('content')
    <h1>Welcome to my website!</h1>
    <p>This will be injected into the master layout.</p>
@endsection`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
