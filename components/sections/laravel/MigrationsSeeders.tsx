'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function MigrationsSeedersTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="migrations-seeders" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Migrations & Seeders - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What are migrations?</li>
            <li>2. Creating tables with schema builder</li>
            <li>3. Common column types</li>
            <li>4. Relationships and foreign keys</li>
            <li>5. Database seeding</li>
            <li>6. Factories for test data</li>
            <li>7. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel migrations and seeders,
          with comparisons to Go migrate and Node.js db-migrate!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What are Migrations?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Migrations = Git for your database schema - track changes over time</li>
            <li>Seeders = Sample data population - like a test fixture</li>
            <li>Factories = Data generators - create realistic fake data on demand</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Migrations are like version control for your database, allowing your team to easily
          modify and share the application&apos;s database schema. Instead of sharing SQL files,
          you share PHP migration classes that create the same database structure.
        </p>

        <CodeBlock>{`# Create a new migration
php artisan make:migration create_posts_table

# Run all pending migrations
php artisan migrate

# Rollback the last batch
php artisan migrate:rollback

# Reset and re-run all migrations
php artisan migrate:fresh`}</CodeBlock>

        <Tip>
          AHA Moment: Migrations are team-friendly! Each developer can have their own local
          database, run migrations, and get the same schema. No more "it works on my machine"
          because of different database structures.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Creating Tables with Schema Builder
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel&apos;s schema builder provides a fluent interface for creating tables.
        </p>

        <CodeBlock>{`Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('content');
    $table->timestamps();
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Common Column Types</h4>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Laravel Method</th>
              <th>Database Type</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;id()</code></td>
              <td>BIGINT AUTO_INCREMENT</td>
              <td>Primary key (auto-incrementing)</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;string('name')</code></td>
              <td>VARCHAR(255)</td>
              <td>Short strings</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;text('body')</code></td>
              <td>TEXT</td>
              <td>Long text content</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;integer('votes')</code></td>
              <td>INT</td>
              <td>Whole numbers</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;boolean('confirmed')</code></td>
              <td>BOOLEAN/TINYINT</td>
              <td>true/false values</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;timestamps()</code></td>
              <td>created_at, updated_at</td>
              <td>Automatic timestamps</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;date('published_at')</code></td>
              <td>DATE</td>
              <td>Date without time</td>
            </tr>
            <tr>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;decimal('price', 8, 2)</code></td>
              <td>DECIMAL(8,2)</td>
              <td>Precise decimals</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create a Migration</p>
          <p className="mt-2 text-sm">Practice creating a users table migration:</p>
          <CodeBlock>{`Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('password');
    $table->boolean('is_admin')->default(false);
    $table->timestamp('last_login_at')->nullable();
    $table->timestamps();
});`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Relationships and Foreign Keys
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel makes defining relationships easy with fluent foreign key methods.
        </p>

        <CodeBlock>{`// Foreign key with constraints
$table->foreignId('user_id')
    ->constrained('users')
    ->cascadeOnDelete()
    ->cascadeOnUpdate();

// Alternative syntax
$table->unsignedBigInteger('user_id');
$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

// Adding index
$table->index('user_id');`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Always use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">constrained()</code> when possible - it automatically
          determines the table and column. Manual references can lead to errors!
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Cascade Options</h4>

        <ul className="list-disc pl-5 space-y-2 text-[#5f6368] mt-2">
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">cascadeOnDelete()</code> - Delete related rows when parent is deleted</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">cascadeOnUpdate()</code> - Update foreign key when parent primary key changes</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">restrictOnDelete()</code> - Prevent deletion if related rows exist</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">setNullOnDelete()</code> - Set foreign key to NULL on deletion</li>
        </ul>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Database Seeding
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Seeders = Planting seeds in a garden - populating your database with initial data</li>
            <li>Factories = Seed generators - create realistic fake data on demand</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Seeders allow you to populate your database with dummy data, which is great for
          testing and development. Combined with factories, you can generate realistic test data.
        </p>

        <CodeBlock>{`# Create a seeder
php artisan make:seeder UserSeeder

# Run a specific seeder
php artisan db:seed --class=UserSeeder

# Fresh migrate + seed
php artisan migrate:fresh --seed`}</CodeBlock>

        <CodeBlock>{`public function run(): void
{
    User::factory()
        ->count(50)
        ->hasPosts(3)
        ->create();
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is much more integrated than tools like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">faker.js</code> scripts in Node.js.
          Laravel combines Factories (data generation) and Seeders (database insertion) into a single, cohesive system.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Factories for Test Data
        </h3>

        <p className="text-[#5f6368] mt-2">
          Factories define how to create realistic fake data for your models.
        </p>

        <CodeBlock>{`// database/factories/UserFactory.php
public function definition(): array
{
    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'password' => bcrypt('password'),
        'is_admin' => false,
    ];
}

// With relationships
public function configure()
{
    return $this->hasPosts(5);
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using Factories</h4>

        <CodeBlock>{`// Create one user
User::factory()->create();

// Create 10 users
User::factory()->count(10)->create();

// Create user with custom data
User::factory()->create([
    'name' => 'Custom Name',
    'email' => 'custom@example.com',
]);

// Create user with 5 posts
User::factory()
    ->hasPosts(5)
    ->create();`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Create Factory Data</p>
          <p className="mt-2 text-sm">Practice creating test data with factories:</p>
          <CodeBlock>{`// Create 5 blog posts with comments
Post::factory()
    ->count(5)
    ->hasComments(3)
    ->create();

// Create an admin user
User::factory()->create([
    'name' => 'Admin User',
    'email' => 'admin@example.com',
    'is_admin' => true,
]);`}</CodeBlock>
        </div>
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
              <th>Go (golang-migrate)</th>
              <th>Node.js (db-migrate)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Create migration</td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">php artisan make:migration</code></td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">migrate create</code></td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">db-migrate create</code></td>
            </tr>
            <tr>
              <td>Run migrations</td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">php artisan migrate</code></td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">migrate up</code></td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">db-migrate up</code></td>
            </tr>
            <tr>
              <td>Rollback</td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">php artisan migrate:rollback</code></td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">migrate down</code></td>
              <td><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">db-migrate down</code></td>
            </tr>
            <tr>
              <td>Seed data</td>
              <td>Built-in (Seeders + Factories)</td>
              <td>Manual SQL/scripts</td>
              <td>Manual scripts</td>
            </tr>
            <tr>
              <td>Fake data generation</td>
              <td>Built-in (Faker)</td>
              <td>Manual</td>
              <td>faker.js</td>
            </tr>
            <tr>
              <td>Schema builder</td>
              <td>Fluent PHP API</td>
              <td>Raw SQL only</td>
              <td>JavaScript API</td>
            </tr>
            <tr>
              <td>Foreign key handling</td>
              <td>Automatic with constraints</td>
              <td>Manual SQL</td>
              <td>Manual</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel migrations are the most integrated - they include schema building (no raw SQL needed),
            automatic timestamps, and built-in seeding with factories. Go and Node.js require more manual
            setup but offer more control over the migration process.
          </p>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Migration Example</h4>

        <CodeBlock>{`// Using golang-migrate
// up.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// down.sql
DROP TABLE users;

// Run migrations
migrate -path ./migrations -database "postgres://localhost/mydb" up`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js db-migrate Example</h4>

        <CodeBlock>{`// migrations/001_initial.js
exports.up = function(db, callback) {
    db.createTable('users', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: { type: 'string', length: 255 },
        email: { type: 'string', length: 255, unique: true },
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};`}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Modifying Existing Tables
        </h3>

        <p className="text-[#5f6368] mt-2">
          Laravel can also modify existing tables using the schema builder.
        </p>

        <CodeBlock>{`// Add a new column to existing table
Schema::table('users', function (Blueprint $table) {
    $table->string('phone')->nullable()->after('email');
});

// Rename a column
Schema::table('users', function (Blueprint $table) {
    $table->renameColumn('name', 'full_name');
});

// Drop a column
Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('phone');
});`}</CodeBlock>

        <Note>
          <strong>Note:</strong> When modifying columns, you may need to enable Doctrine DBAL
          in your composer.json for full support: <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">composer require doctrine/dbal</code>
        </Note>
      </section>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Migrations are version control for your database schema</li>
          <li>Use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">constrained()</code> for automatic foreign key handling</li>
          <li>Seeders + Factories = powerful test data generation built-in</li>
          <li>Laravel is more integrated than Go/Node.js alternatives</li>
          <li>Always use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">cascadeOnDelete()</code> for related records</li>
          <li>Use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">php artisan migrate:fresh --seed</code> for development resets</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}