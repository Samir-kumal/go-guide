'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function EloquentORMTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="eloquent-orm" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Eloquent ORM - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Eloquent ORM?</li>
            <li>2. Defining Models</li>
            <li>3. Retrieving & Querying Data</li>
            <li>4. Inserting & Updating Records</li>
            <li>5. Relationships & Eager Loading</li>
            <li>6. Go gORM & Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Eloquent ORM inside and out,
          with comparisons to Go gORM and Node.js ORMs!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Eloquent ORM?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Eloquent Model = A robot butler that interacts with your database tables</li>
            <li>Each Model = One table (e.g., <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">User</code> model = <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">users</code> table)</li>
            <li>Relationships = The butler knows how tables connect (User hasMany Posts)</li>
            <li>Active Record pattern = Each row is an object with built-in save/find methods</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel includes Eloquent, an object-relational mapper (ORM) that makes it enjoyable to interact with your database.
          Each database table has a corresponding Model that allows you to query, insert, update, and delete records
          using expressive, chainable methods.
        </p>

        <Tip>
          <strong>JS/Node.js Tip:</strong> Eloquent uses the Active Record pattern, similar to Sequelize or Prisma.
          Unlike Prisma's query builder approach, Eloquent models have built-in methods directly on the model instance.
        </Tip>
      </section>

      <section>
        <h3 id="defining-models" className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Defining Models
        </h3>

        <p className="text-[#5f6368] mt-3">
          Models extend the base <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Model</code> class and define
          the table name, fillable attributes, and relationships.
        </p>

        <CodeBlock>{`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class User extends Model
{
    // The table name (optional if it matches convention)
    protected $table = 'users';

    // The attributes that are mass assignable
    protected $fillable = ['name', 'email', 'password'];

    // Hide attributes when converted to array/JSON
    protected $hidden = ['password'];

    // The attributes that should be cast
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    // Define a One-to-Many relationship
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create a Model</p>
          <p className="mt-2 text-sm">Practice creating Eloquent models:</p>
          <CodeBlock>{`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;

class Comment extends Model
{
    protected $fillable = ['body', 'user_id', 'post_id'];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    // Relationship to parent post
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    // Relationship to author
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}`}</CodeBlock>
        </div>

        <Note>
          <strong>Convention over Configuration:</strong> Laravel automatically assumes the table name is the plural
          snake_case of the model name (e.g., <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">User</code> → <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">users</code>,
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">BlogPost</code> → <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">blog_posts</code>).
        </Note>
      </section>

      <section>
        <h3 id="retrieving-data" className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Retrieving & Querying Data
        </h3>

        <p className="text-[#5f6368] mt-3">
          Eloquent provides a fluent query builder to fetch data. Each query returns a Builder
          that you can chain methods on before calling <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">get()</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">first()</code>.
        </p>

        <CodeBlock>{`use App\\Models\\User;

// Retrieve all users
$users = User::all();

// Retrieve a single model by primary key
$user = User::find(1);

// Throw a 404 if not found
$user = User::findOrFail(1);

// Query builder with conditions
$activeUsers = User::where('active', 1)
                   ->orderBy('name')
                   ->take(10)
                   ->get();

// Find or create
$user = User::firstOrCreate(['email' => 'john@example.com'], [
    'name' => 'John',
    'password' => 'hashed',
]);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Common Query Methods</h4>

        <CodeBlock>{`// Basic where clauses
$users = User::where('status', 'active')->get();
$users = User::where('age', '>=', 18)->get();
$users = User::where('name', 'like', '%John%')->get();

// OR conditions
$users = User::where('status', 'active')
    ->orWhere('is_admin', true)
    ->get();

// Multiple conditions
$users = User::where([
    ['status', 'active'],
    ['age', '>=', 18],
])->get();

// Aggregates
$count = User::where('active', 1)->count();
$oldest = User::max('age');
$average = User::avg('age');`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Query Data</p>
          <p className="mt-2 text-sm">Practice querying with Eloquent:</p>
          <CodeBlock>{`<?php

// Find users who registered in the last 7 days
$recentUsers = User::where('created_at', '>=', now()->subDays(7))->get();

// Find active users over 18, ordered by name
$adults = User::where('is_active', true)
    ->where('age', '>=', 18)
    ->orderBy('name')
    ->get();

// Paginate results
$users = User::paginate(15); // 15 per page

// Get first 5 users
$topUsers = User::orderBy('created_at', 'desc')->limit(5)->get();`}</CodeBlock>
        </div>

        <Warning>
          <strong>N+1 Problem:</strong> Accessing relationships in a loop without eager loading
          causes one query per iteration! Always use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">with()</code> to load related data efficiently.
        </Warning>
      </section>

      <section>
        <h3 id="inserting-updating" className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Inserting & Updating Records
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Create a record = Fill out a form and save it</li>
            <li>Mass assignment = Submit the form with all fields at once (using <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$fillable</code> as a whitelist)</li>
            <li>Update = Find the record, change fields, save</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          To insert a new record, create a new model instance, set attributes, and call the save method.
          Or use mass assignment with the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">create()</code> method.
        </p>

        <CodeBlock>{`// Method 1: New instance and save
$user = new User;
$user->name = 'John';
$user->email = 'john@example.com';
$user->password = Hash::make('secret');
$user->save();

// Method 2: Mass assignment (requires $fillable)
$user = User::create([
    'name' => 'Sarah',
    'email' => 'sarah@example.com',
    'password' => Hash::make('secret'),
]);

// Method 3: firstOrCreate / updateOrCreate
$user = User::firstOrCreate(
    ['email' => 'john@example.com'],
    ['name' => 'John', 'password' => Hash::make('secret')]
);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Updating Records</h4>

        <CodeBlock>{`// Update a single record
$user = User::find(1);
$user->name = 'Johnny';
$user->save();

// Mass update
User::where('active', 1)->update(['status' => 'inactive']);

// Update or create
$user = User::updateOrCreate(
    ['email' => 'john@example.com'],
    ['name' => 'John Updated', 'password' => Hash::make('newpass')]
);

// Delete and recreate pattern
$user->delete();
$user = User::create([...]);`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: CRUD Operations</p>
          <p className="mt-2 text-sm">Practice creating and updating records:</p>
          <CodeBlock>{`<?php

// Create a new post
$post = Post::create([
    'title' => 'My First Post',
    'body' => 'Content here...',
    'user_id' => auth()->id(),
]);

// Update the post
$post->title = 'Updated Title';
$post->save();

// Bulk update views count
Post::where('id', '>', 0)->increment('views_count');

// Delete old posts
Post::where('created_at', '<', now()->subYear())->delete();`}</CodeBlock>
        </div>

        <Tip>
          <strong>Tip:</strong> Always use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$fillable</code> (whitelist) or
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$guarded</code> (blacklist) to protect against mass assignment vulnerabilities!
        </Tip>
      </section>

      <section>
        <h3 id="relationships" className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Relationships & Eager Loading
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Eager loading = Pre-fetch all related data in one query (no waiting)</li>
            <li>Lazy loading = Load related data on-demand (one query per access)</li>
            <li>N+1 problem = Asking for related data one-by-one = too many questions!</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Eloquent makes managing and working with relationships easy. Define them in your model,
          then access them as properties or use eager loading to avoid the N+1 query problem.
        </p>

        <CodeBlock>{`// Retrieve a user's posts (triggers new query each time!)
$user = User::find(1);
$posts = $user->posts; // Query executed HERE

// Eager Loading - Fetch all users AND their posts in 2 queries
$users = User::with('posts')->get();

foreach ($users as $user) {
    echo $user->posts; // No extra queries!
}

// Nested eager loading
$posts = Post::with('author', 'comments.author')->get();

// Lazy eager loading
$user = User::find(1);
$user->load('posts', 'comments');`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">All Relationship Types</h4>

        <CodeBlock>{`<?php

// One-to-One
public function phone(): BelongsTo
{
    return $this->belongsTo(Phone::class);
}

// One-to-Many
public function posts(): HasMany
{
    return $this->hasMany(Post::class);
}

// Many-to-Many
public function roles(): BelongsToMany
{
    return $this->belongsToMany(Role::class);
}

// Has-One-Through
public function seat(): HasOneThrough
{
    return $this->hasOneThrough(Seat::class, Team::class);
}

// Polymorphic
public function comments(): MorphMany
{
    return $this->morphMany(Comment::class, 'commentable');
}`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Relationships</p>
          <p className="mt-2 text-sm">Practice with relationships and eager loading:</p>
          <CodeBlock>{`<?php

// Get all posts with their authors
$posts = Post::with('author')->get();

// Get user with posts AND comments count
$user = User::withCount('posts')->find(1);
echo $user->posts_count;

// Access through relationships
$post->author->name;

// Get posts with comments that have replies
$posts = Post::with(['comments.replies'])->get();`}</CodeBlock>
        </div>

        <Tip>
          <strong>Performance Tip:</strong> Always profile your queries! Use Laravel Debugbar or
          <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">DB::getQueryLog()</code> to check how many queries are being executed.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go gORM & Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Eloquent</th>
              <th>Go gORM</th>
              <th>Node.js Prisma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pattern</td>
              <td>Active Record</td>
              <td>Active Record / GORM</td>
              <td>Query Builder (Prisma Client)</td>
            </tr>
            <tr>
              <td>Model Definition</td>
              <td>PHP class extending Model</td>
              <td>Go struct + struct tags</td>
              <td>schema.prisma file</td>
            </tr>
            <tr>
              <td>Relationships</td>
              <td>Method definitions in class</td>
              <td>Struct tags</td>
              <td>Relations in schema</td>
            </tr>
            <tr>
              <td>Query Builder</td>
              <td>Model::where()...get()</td>
              <td>db.Where().Find()</td>
              <td>prisma.user.findMany()</td>
            </tr>
            <tr>
              <td>Eager Loading</td>
              <td>{"with('relation')"}</td>
              <td>Preload</td>
              <td>include / include nested</td>
            </tr>
            <tr>
              <td>Mass Assignment</td>
              <td>$fillable / $guarded</td>
              <td>Select specific fields</td>
              <td>Select specific fields</td>
            </tr>
            <tr>
              <td>Migrations</td>
              <td>Artisan migrate</td>
              <td>AutoMigrate / Migrator</td>
              <td>prisma migrate</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel Eloquent</p>
            <CodeBlock>{`// Create
User::create(['name' => 'Alice']);

// Read
$user = User::find(1);

// With relationships
$user = User::with('posts')->find(1);

// Update
$user->update(['name' => 'Bob']);

// Delete
$user->delete();`}</CodeBlock>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">Go gORM</p>
            <CodeBlock>{`// Create
user := User{Name: "Alice"}
db.Create(&user)

// Read
var user User
db.First(&user, 1)

// With relationships
db.Preload("Posts").First(&user)

// Update
db.Model(&user).Update("name", "Bob")

// Delete
db.Delete(&user)`}</CodeBlock>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800">Node.js Prisma</p>
            <CodeBlock>{`// Create
await prisma.user.create({
    data: { name: 'Alice' }
});

// Read
await prisma.user.findUnique({
    where: { id: 1 }
});

// With relationships
await prisma.user.findUnique({
    include: { posts: true }
});

// Update
await prisma.user.update({
    where: { id: 1 },
    data: { name: 'Bob' }
});

// Delete
await prisma.user.delete({
    where: { id: 1 }
});`}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Eloquent uses Active Record pattern - each model instance = one row</li>
            <li>Always use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">with()</code> to prevent N+1 queries</li>
            <li>Mass assignment protection via <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$fillable</code> is required for security</li>
            <li>Go gORM uses struct tags and pointer receivers for models</li>
            <li>Prisma uses a schema file and generates type-safe client</li>
            <li>All three support eager loading to solve N+1 problem</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}