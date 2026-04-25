import { CodeBlock, Tip, ComparisonTable } from '@/components/ui'

export function EloquentORM() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="eloquent-orm" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Eloquent ORM
        </h2>
        <p>Laravel includes Eloquent, an object-relational mapper (ORM) that makes it enjoyable to interact with your database. Each database table has a corresponding Model.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining Models</h3>
        <CodeBlock>{`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\HasMany;

class User extends Model
{
    // The attributes that are mass assignable
    protected $fillable = ['name', 'email', 'password'];

    // Define a One-to-Many relationship
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> Eloquent is very similar to Sequelize or Prisma in the Node.js ecosystem, but uses the Active Record pattern.
        </Tip>
      </section>

      <section>
        <h3 id="retrieving-data" className="text-[#5f6368] mt-8 font-semibold">Retrieving & Querying Data</h3>
        <p>Eloquent provides a fluent query builder to fetch data.</p>
        <CodeBlock>{`use App\\Models\\User;

// Retrieve all users
$users = User::all();

// Retrieve a single model by primary key
$user = User::find(1);

// Throw a 404 if not found
$user = User::findOrFail(1);

// Query builder
$activeUsers = User::where('active', 1)
                   ->orderBy('name')
                   ->take(10)
                   ->get();`}</CodeBlock>
      </section>

      <section>
        <h3 id="inserting-updating" className="text-[#5f6368] mt-8 font-semibold">Inserting & Updating</h3>
        <p>To insert a new record, create a new model instance, set attributes, and call the save method.</p>
        <CodeBlock>{`// Method 1: New instance and save
$user = new User;
$user->name = 'John';
$user->email = 'john@example.com';
$user->save();

// Method 2: Mass assignment (requires $fillable property in model)
$user = User::create([
    'name' => 'Sarah',
    'email' => 'sarah@example.com',
]);

// Updating
$user = User::find(1);
$user->name = 'Johnny';
$user->save();

// Mass update
User::where('active', 1)->update(['status' => 'inactive']);`}</CodeBlock>
      </section>

      <section>
        <h3 id="relationships" className="text-[#5f6368] mt-8 font-semibold">Relationships</h3>
        <p>Eloquent makes managing and working with relationships easy and supports eager loading.</p>
        <CodeBlock>{`// Retrieve a user's posts
$user = User::find(1);
$posts = $user->posts; // Dynamic property

// Eager Loading (Solves N+1 query problem)
$users = User::with('posts')->get();

foreach ($users as $user) {
    echo $user->posts; // Does not execute a new query
}`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
