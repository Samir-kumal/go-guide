import { CodeBlock, Note, Tip, Warning } from '@/components/ui'

export function MigrationsSeeders() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="migrations-seeders" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Migrations & Seeders
        </h2>
        <p>Migrations are like version control for your database, allowing your team to easily modify and share the application&apos;s database schema.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Creating Tables</h3>
        <CodeBlock>{`Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('content');
    $table->timestamps();
});`}</CodeBlock>

        <h4 className="font-semibold mt-4">Common Column Types:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;string(&apos;name&apos;)</code>: VARCHAR equivalent.</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;text(&apos;body&apos;)</code>: TEXT equivalent.</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;integer(&apos;votes&apos;)</code>: INTEGER equivalent.</li>
          <li><code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">$table-&gt;boolean(&apos;confirmed&apos;)</code>: BOOLEAN equivalent.</li>
        </ul>
      </section>

      <section>
        <h3 id="database-seeding" className="text-[#5f6368] mt-8 font-semibold">Database Seeding</h3>
        <p>Seeders allow you to populate your database with dummy data, which is great for testing and development.</p>
        <CodeBlock>{`# php artisan make:seeder UserSeeder

public function run(): void
{
    User::factory()
        ->count(50)
        ->hasPosts(3)
        ->create();
}`}</CodeBlock>
        
        <Tip>
          <strong>JS Tip:</strong> This is much more integrated than tools like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">faker.js</code> scripts in Node.js. Laravel combines Factories (data generation) and Seeders (database insertion) into a single, cohesive system.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
