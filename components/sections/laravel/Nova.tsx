'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function NovaTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="nova-tutorial" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Nova (Admin Panel)
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Laravel Nova?</li>
            <li>2. Defining Resources</li>
            <li>3. Fields and validation</li>
            <li>4. Relationships (HasMany, BelongsTo, etc.)</li>
            <li>5. Actions and Filters</li>
            <li>6. Custom tools and cards</li>
            <li>7. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Laravel Nova inside and out,
          with Go and Node.js admin panel comparisons to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Laravel Nova?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel Nova = A professionally designed admin panel builder</li>
            <li>It takes your Eloquent models and automatically generates a beautiful CRUD interface</li>
            <li>Think of it like admin generators (Strapi, KeystoneJS) but running directly in your Laravel app</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel Nova is a beautifully crafted administration panel for Laravel.
          It allows you to manage your database records with ease using code-driven configuration.
          No separate SPA needed - it lives right inside your Laravel application!
        </p>

        <Note>
          <strong>Note:</strong> Nova is a paid package ($99/site). But it is ONE of the best admin solutions for Laravel.
        </Note>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Defining Resources
        </h3>

        <p className="text-[#5f6368] mt-3">
          In Nova, each Eloquent model has a corresponding "Resource" class that defines how it should be displayed and edited.
        </p>

        <CodeBlock>{`namespace App\\Nova;

use Laravel\\Nova\\Fields\\ID;
use Laravel\\Nova\\Fields\\Text;
use Laravel\\Nova\\Fields\\HasMany;
use Laravel\\Nova\\Http\\Resources\\Resource;

class User extends Resource
{
    public static string \\$model = \\App\\Models\\User::class;

    public function fields(NovaRequest \\$request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Name')->rules('required', 'max:255'),
            Text::make('Email')->rules('required', 'email', 'max:255'),
            HasMany::make('Posts'),
        ];
    }
}`}</CodeBlock>

        <Tip>
          <strong>AHA Moment:</strong> This is similar to "Admin" generators like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Strapi</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">KeystoneJS</code>, but it lives directly inside your Laravel app and uses your existing models.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Fields and Validation
        </h3>

        <p className="text-[#5f6368] mt-3">
          Nova provides dozens of field types out of the box:
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Common Fields</h4>

        <CodeBlock>{`public function fields(NovaRequest \\$request): array
{
    return [
        // Text inputs
        Text::make('Name')->rules('required', 'max:255'),
        Text::make('Slug')->readonly()->withMeta(['value' => '\\str_slug($this->name)']),

        // Numbers
        Number::make('Age')->min(18)->max(150),
        Boolean::make('Active')->default(true),

        // Rich text
        Trix::make('Content'),
        Markdown::make('Description'),

        // Files & Images
        Image::make('Avatar')->disk('public')->maxWidth(500),
        File::make('Attachment'),

        // Dates
        Date::make('Published At'),
        Datetime::make('Scheduled For'),
        Timestamp::make('Created At')->exceptOnForms(),
    ];
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Validation</h4>

        <CodeBlock>{`Text::make('Email')
    ->rules('required', 'email', 'unique:users,email,\\'.$this->id.')

Number::make('Price')
    ->min(0)
    ->step(0.01)

// Custom rules
->rules([
    'required',
    new \App\\Rules\\CouponValid(),
])`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create a Resource</p>
          <p className="mt-2 text-sm">Practice defining a Post resource:</p>
          <CodeBlock>{`namespace App\\Nova;

use Laravel\\Nova\\Fields\\ID;
use Laravel\\Nova\\Fields\\Text;
use Laravel\\Nova\\Fields\\Slug;
use Laravel\\Nova\\Fields\\Textarea;

class Post extends Resource
{
    public static string \\$model = \\App\\Models\\Post::class;

    public function fields(NovaRequest \\$request): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Title')->rules('required', 'max:200'),
            Slug::make('Slug')->from('Title')->rules('required'),
            Textarea::make('Excerpt'),
        ];
    }
}`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Relationships
        </h3>

        <p className="text-[#5f6368] mt-3">
          Nova makes it easy to display and manage model relationships:
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">HasMany (One-to-Many)</h4>

        <CodeBlock>{`// In User Nova resource - show user's posts
HasMany::make('Posts')`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">BelongsTo (Foreign Key)</h4>

        <CodeBlock>{`// In Post Nova resource
BelongsTo::make('Author', User::class)->searchable()`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">BelongsToMany (Many-to-Many)</h4>

        <CodeBlock>{`// In User resource - roles/permissions
BelongsToMany::make('Roles', Role::class);
BelongsToMany::make('Permissions', Permission::class);

// In Role resource - users with this role
BelongsToMany::make('Users', User::class);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">MorphMany (Polymorphic)</h4>

        <CodeBlock>{`// For Comment model that can belong to Post, User, etc.
MorphMany::make('Comments');`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">HasOne (One-to-One)</h4>

        <CodeBlock>{`// User has one Profile
HasOne::make('Profile');`}</CodeBlock>

        <div className="bg-[#fce4ec] border-l-4 border-[#ec407a] p-4 my-4">
          <p className="font-semibold text-[#c2185b]">Important: Relationship Display</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>HasMany shows as a link with count badge</li>
            <li>BelongsTo shows as searchable dropdown</li>
            <li>Add <code>{'->withoutTrashed()'}</code> to filter soft deletes</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Actions and Filters
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Actions</h4>

        <p className="text-[#5f6368] mt-2">
          Actions let you perform operations on resources:
        </p>

        <CodeBlock>{`// app/Nova/Actions/PublishPost.php

namespace App\\Nova\\Actions;

use Laravel\\Nova\\Actions\\Action;
use Laravel\\Nova\\Fields\\ActionFields;

class PublishPost extends Action
{
    public function handle(ActionFields \\$fields, \\$model)
    {
        \\$model->update(['published_at' => now()]);
        return \\$model;
    }
}`}</CodeBlock>

        <CodeBlock>{`// In Post Nova resource:
public function actions(NovaRequest \\$request)
{
    return [
        new PublishPost(),
    ];
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Filters</h4>

        <p className="text-[#5f6368] mt-2">
          Filters let you scope the index query:
        </p>

        <CodeBlock>{`// app/Nova/Filters/PostStatus.php

namespace App\\Nova\\Filters;

use Laravel\\Nova\\Filters\\Filter;

class PostStatus extends Filter
{
    public function apply(\\$request, \\$query, \\$value)
    {
        return \\$query->where('status', \\$value);
    }

    public function options(\\$request): array
    {
        return [
            'Draft' => 'draft',
            'Published' => 'published',
            'Archived' => 'archived',
        ];
    }
}`}</CodeBlock>

        <CodeBlock>{`// In Post Nova resource:
public function filters(NovaRequest \\$request)
{
    return [
        new PostStatus(),
    ];
}`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Custom Tools and Cards
        </h3>

        <p className="text-[#5f6368] mt-3">
          Nova can be extended with custom tools and cards:
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Dashboard Cards</h4>

        <CodeBlock>{`// Built-in metrics
Metric::make('Total Users', function () {
    return User::count();
});

Partition::make('Users by Role', function () {
    return User::role()
        ->get()
        ->groupBy('role')
        ->map(fn ($items) => $items->count());
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Custom Tools</h4>

        <p className="text-[#5f6368] mt-2">
          Full custom pages (tools) can be added to Nova sidebar:
        </p>

        <CodeBlock>{`// php artisan nova:tool --name=Analytics

// This creates:
// - app/Tools/Analytics.php
// - resources/js/tools/Analytics.vue

// Tool registration in NovaServiceProvider:
// Nova::tools([
//     new \\App\\Tools\\Analytics,
// ]);`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Custom tools open up endless possibilities - you can build anything for your admin panel!
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
              <th>Laravel Nova</th>
              <th>Go Admin</th>
              <th>Node.js Admin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Setup</td>
              <td>Instant ($99)</td>
              <td>Build from scratch</td>
              <td>Strapi, AdminJS</td>
            </tr>
            <tr>
              <td>CRUD auto-generation</td>
              <td>Yes (resources)</td>
              <td>Manual</td>
              <td>Yes (models)</td>
            </tr>
            <tr>
              <td>Built-in auth</td>
              <td>Yes</td>
              <td>+ Gitea, Casbin</td>
              <td>Strapi has it</td>
            </tr>
            <tr>
              <td>File uploads</td>
              <td>Yes (disks)</td>
              <td>Manual</td>
              <td>Multer + S3</td>
            </tr>
            <tr>
              <td>API included</td>
              <td>Separate</td>
              <td>Manual</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Custom UI</td>
              <td>Vue tools</td>
              <td>HTML/Go templates</td>
              <td>React admin</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Nova is a premium admin panel for Laravel</li>
            <li>Each Eloquent model = One Nova Resource</li>
            <li>Fields define how data displays/edits</li>
            <li>Relationships handled automatically</li>
            <li>Actions for bulk operations</li>
            <li>Filters for scoping data</li>
            <li>Cards for dashboard metrics</li>
            <li>Custom tools extend functionality</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}