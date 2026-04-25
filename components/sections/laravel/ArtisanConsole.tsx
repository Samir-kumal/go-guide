import { CodeBlock, Tip, ComparisonTable } from '@/components/ui'

export function ArtisanConsole() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="artisan-console" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Artisan Console
        </h2>
        <p>Artisan is the command-line interface included with Laravel. It provides a number of helpful commands that can assist you while you build your application.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Common Commands</h3>
        <CodeBlock>{`# List all available commands
php artisan list

# Display help for a specific command
php artisan help make:controller`}</CodeBlock>

        <h4 className="font-semibold mt-4">Generators (Make Commands)</h4>
        <p>Artisan can scaffold various classes to speed up development.</p>
        <CodeBlock>{`# Create a new Controller
php artisan make:controller UserController

# Create a Controller with resource methods (CRUD)
php artisan make:controller UserController --resource

# Create a Model
php artisan make:model Post

# Create a Model along with a Migration (-m) and Controller (-c)
php artisan make:model Product -mc`}</CodeBlock>

        <h4 className="font-semibold mt-4">Database Migrations</h4>
        <p>Migrations are like version control for your database.</p>
        <CodeBlock>{`# Run all pending migrations
php artisan migrate

# Rollback the last database migration
php artisan migrate:rollback

# Drop all tables and re-run all migrations
php artisan migrate:fresh`}</CodeBlock>

        <h4 className="font-semibold mt-4">Clearing Caches</h4>
        <p>If you make configuration or routing changes and they don&apos;t seem to apply, clearing caches usually fixes it.</p>
        <CodeBlock>{`# Clear application cache
php artisan cache:clear

# Clear route cache
php artisan route:clear

# Clear configuration cache
php artisan config:clear

# Clear compiled views
php artisan view:clear

# Clear everything at once!
php artisan optimize:clear`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> Artisan is similar to tools like the Angular CLI or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">npx prisma</code>, but deeply integrated into every aspect of the framework.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
