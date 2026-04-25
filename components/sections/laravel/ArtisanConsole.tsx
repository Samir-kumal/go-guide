'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function ArtisanConsoleTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="artisan-console" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Artisan Console - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Artisan and why it matters</li>
            <li>2. Essential commands you need daily</li>
            <li>3. Generators - scaffold your code</li>
            <li>4. Database migrations</li>
            <li>5. Cache management</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel's Artisan CLI and understand
          how it compares to Go Cobra/CLI and Node.js command tools!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Artisan?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Artisan = Your personal robot assistant that can do tedious tasks instantly</li>
            <li>Commands = Specific instructions you give the robot (make, migrate, clear)</li>
            <li>Generators = The robot's ability to create boilerplate code for you</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Artisan is the command-line interface included with Laravel. It provides a number of
          helpful commands that can assist you while you build your application. Think of it as
          your project's control center!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Running Artisan</h4>

        <CodeBlock>{`# List all available commands
php artisan list

# Display help for a specific command
php artisan help make:controller

# Check Artisan version
php artisan --version`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: First Commands</p>
          <p className="mt-2 text-sm">Run these commands to see Artisan in action:</p>
          <CodeBlock>{`# See all available commands
php artisan list

# Find commands related to "make"
php artisan list make

# Get help for any command
php artisan help make:model`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Generators (Make Commands)
        </h3>

        <p className="text-[#5f6368] mt-2">
          Artisan can scaffold various classes to speed up development. This is like having
          a code generator that creates perfectly structured files!
        </p>

        <CodeBlock>{`# Create a new Controller
php artisan make:controller UserController

# Create a Controller with resource methods (CRUD)
php artisan make:controller UserController --resource

# Create a Model
php artisan make:model Post

# Create a Model along with a Migration (-m) and Controller (-c)
php artisan make:model Product -mc

# Create everything at once: Model, Controller, Migration, Factory, Seeder
php artisan make:model Article --all`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Other Useful Generators</h4>

        <CodeBlock>{`# Create a Middleware
php artisan make:middleware EnsureTokenIsValid

# Create a Request (form validation)
php artisan make:request StoreUserRequest

# Create an Event
php artisan make:event UserRegistered

# Create a Listener
php artisan make:listener SendWelcomeEmail

# Create a Job
php artisan make:job ProcessUpload

# Create a Notification
php artisan make:notification InvoicePaid`}</CodeBlock>

        <Tip>
          <strong>Pro Tip:</strong> Use <code className={"bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm"}>{"--resource"}</code> flag
          to generate CRUD methods (index, create, store, show, edit, update, destroy) automatically!
        </Tip>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Scaffold a Resource</p>
          <p className="mt-2 text-sm">Create a complete CRUD resource:</p>
          <CodeBlock>{`# Create a Blog Post resource (all at once)
php artisan make:model Post -mcr

# Creates:
# - app/Models/Post.php
# - database/migrations/xxxx_create_posts_table.php
# - app/Http/Controllers/PostController.php (with resource methods)`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Database Migrations
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Migrations = A detailed changelog for your database schema</li>
            <li>Each migration = One "change" you want to make</li>
            <li>Rollback = Undo that change (like Ctrl+Z for database)</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Migrations are like version control for your database. They let you define your
          schema in code and share it with your team!
        </p>

        <CodeBlock>{`# Run all pending migrations
php artisan migrate

# Rollback the last database migration
php artisan migrate:rollback

# Drop all tables and re-run all migrations
php artisan migrate:fresh

# Rollback all migrations and re-run them
php artisan migrate:refresh

# Check migration status
php artisan migrate:status`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Creating Migrations</h4>

        <CodeBlock>{`# Create a new migration file manually
php artisan make:migration create_posts_table

# Modify existing table
php artisan make:migration add_user_id_to_posts_table --table=posts`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> migrate:fresh will DROP all tables! Never run it on production
          databases. Use migrate:rollback instead.
        </Warning>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Migration Workflow</p>
          <p className="mt-2 text-sm">Practice the migration cycle:</p>
          <CodeBlock>{`# 1. Create a migration
php artisan make:migration create_products_table

# 2. Edit the migration file in database/migrations/

# 3. Run it
php artisan migrate

# 4. Made a mistake? Rollback!
php artisan migrate:rollback`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Clearing Caches
        </h3>

        <p className="text-[#5f6368] mt-2">
          If you make configuration or routing changes and they don't seem to apply,
          clearing caches usually fixes it!
        </p>

        <CodeBlock>{`# Clear application cache
php artisan cache:clear

# Clear route cache
php artisan route:clear

# Clear configuration cache
php artisan config:clear

# Clear compiled views
php artisan view:clear

# Clear everything at once!
php artisan optimize:clear

# Re-cache everything (optimize for production)
php artisan optimize
php artisan route:cache
php artisan config:cache
php artisan view:cache`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> In production, caching improves performance. After deploying,
          always run optimize:clear followed by optimize to rebuild caches!
        </Tip>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">When to Clear Caches</p>
          <ul className="mt-2 space-y-1 text-sm text-[#5f6368]">
            <li>Added new route → Clear route cache</li>
            <li>Changed .env settings → Clear config cache</li>
            <li>Updated Blade views → Clear view cache</li>
            <li>Nothing works after changes → Clear everything!</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js/PHP Comparison
        </h3>

        <p className="text-[#5f6368] mt-2">
          Let's see how Laravel Artisan compares to CLI tools in other ecosystems!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Artisan</th>
              <th>Go (Cobra/CLI)</th>
              <th>Node.js (Commander/Prisma)</th>
              <th>PHP Native</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Code Generation</td>
              <td>make:controller, make:model, etc.</td>
              <td>cobra init, cobra add</td>
              <td>npx prisma generate</td>
              <td>Manual or Composer packages</td>
            </tr>
            <tr>
              <td>Migration Support</td>
              <td>Built-in migrate command</td>
              <td>External (golang-migrate)</td>
              <td>Prisma migrate, drizzle-kit</td>
              <td>Phinx, Doctrine Migrations</td>
            </tr>
            <tr>
              <td>Cache Commands</td>
              <td>cache:clear, route:clear, etc.</td>
              <td>Custom implementation</td>
              <td>Framework-specific</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>Task Scheduling</td>
              <td>Scheduler (cron integration)</td>
              <td>External (cron, systemd)</td>
              <td>node-cron, BullMQ</td>
              <td>PHP cron or packages</td>
            </tr>
            <tr>
              <td>Interactive CLI</td>
              <td>Yes (Tinker)</td>
              <td>Yes (Cobra prompts)</td>
              <td>Yes (Inquirer)</td>
              <td>Limited</td>
            </tr>
            <tr>
              <td>Built-in</td>
              <td>Yes (core feature)</td>
              <td>No (add library)</td>
              <td>No (add framework)</td>
              <td>No</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Cobra Example</h4>

        <CodeBlock>{`// Go with Cobra CLI
package main

import (
    "fmt"
    "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
    Use: "myapp",
    Short: "My CLI application",
}

func init() {
    rootCmd.AddCommand(&cobra.Command{
        Use: "create",
        Run: func(cmd *cobra.Command, args []string) {
            fmt.Println("Creating resource...")
        },
    })
}

func main() {
    rootCmd.Execute()
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js Prisma Example</h4>

        <CodeBlock>{`// Node.js with Prisma CLI
// package.json scripts
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  }
}

// Run migrations
// npm run db:migrate`}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel Artisan is a first-class citizen - it's built into the framework and
            handles code generation, migrations, caching, and more. Go and Node.js require
            adding libraries (Cobra, Commander, Prisma) to get similar functionality.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Custom Artisan Commands
        </h3>

        <p className="text-[#5f6368] mt-2">
          You can create your own Artisan commands for repetitive tasks!
        </p>

        <CodeBlock>{`# Create a custom command
php artisan make:command ProcessReports

# Your command will be in app/Console/Commands/ProcessReports.php

# Run it
php artisan reports:process`}</CodeBlock>

        <CodeBlock>{`// app/Console/Commands/ProcessReports.php
namespace App\\Console\\Commands;

use Illuminate\\Console\\Command;

class ProcessReports extends Command
{
    protected $signature = 'reports:process {--date= : Date to process}';
    protected $description = 'Process daily reports';

    public function handle(): int
    {
        $date = $this->option('date') ?? now()->toDateString();
        $this->info("Processing reports for {$date}...");
        
        // Your logic here
        $this->info("Done!");
        
        return Command::SUCCESS;
    }
}`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Use <code className={"bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm"}>{'$this->info()'}</code>,
          <code className={"bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm"}>{'$this->warn()'}</code>, and
          <code className={"bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm"}>{'$this->error()'}</code>
          for user-friendly output!
        </Tip>
      </section>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Artisan is Laravel's built-in CLI - no setup required!</li>
          <li>Use --resource flag for automatic CRUD scaffolding</li>
          <li>Migrations give you database version control</li>
          <li>Clear caches when changes don't seem to apply</li>
          <li>Create custom commands for repetitive tasks</li>
          <li>php artisan list shows all available commands</li>
        </ul>
      </div>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}