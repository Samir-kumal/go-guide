'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function ScoutSearchTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="scout-search" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Scout (Full-text Search) - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Laravel Scout?</li>
            <li>2. Making a Model Searchable</li>
            <li>3. Performing Searches</li>
            <li>4. Search Drivers (Algolia, Meilisearch, Database)</li>
            <li>5. Advanced Features</li>
            <li>6. Go/Node.js Comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Laravel Scout inside and out,
          with Go and Node.js comparisons to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Laravel Scout?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel Scout = A magical librarian who automatically indexes every book as you add it to the library</li>
            <li>Searchable Model = A book that gets catalogued automatically when saved</li>
            <li>Search Query = Asking the librarian to find all books matching "Laravel"</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel Scout provides a simple, driver-based solution for adding full-text search to your Eloquent models.
          It supports Algolia, Meilisearch, and a local database driver. The magic? It syncs automatically as you save your models!
        </p>

        <Tip>
          AHA Moment: Scout is like having Elasticsearch or Algolia built into Laravel, but it happens automatically
          as you save your models - no manual indexing needed!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Making a Model Searchable
        </h3>

        <p className="text-[#5f6368] mt-2">
          Apply the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Searchable</code> trait to your model.
        </p>

        <CodeBlock>{`namespace App\\Models;

use Laravel\\Scout\\Searchable;
use Illuminate\\Database\\Eloquent\\Model;

class Article extends Model
{
    use Searchable;

    /**
     * Get the indexable data array for the model.
     */
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
        ];
    }
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>toSearchableArray() = What information goes on the index card for the librarian</li>
            <li>Only include searchable fields - don't index everything!</li>
          </ul>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Customizing the Index</h4>

        <CodeBlock>{`// Only index published articles
public function shouldBeSearchable(): bool
{
    return $this->is_published;
}

// Use a specific Algolia index
public function searchableAs(): string
{
    return 'articles_index';
}`}</CodeBlock>

        <Note>
          <strong>Note:</strong> By default, Scout indexes ALL model fields. Override toSearchableArray() to control what gets indexed!
        </Note>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Make a Model Searchable</p>
          <p className="mt-2 text-sm">Practice making a model searchable:</p>
          <CodeBlock>{`// Exercise 1: Add Searchable trait to User model
class User extends Model
{
    use Searchable;

    // What fields should be searchable?
    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
        ];
    }
}

// Exercise 2: Only index active users
public function shouldBeSearchable(): bool
{
    return $this->status === 'active';
}`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Performing Searches
        </h3>

        <p className="text-[#5f6368] mt-2">
          Once your model is searchable, searching is simple!
        </p>

        <CodeBlock>{`// Basic search
$articles = Article::search('Laravel')->get();

// With constraints
$articles = Article::search('Laravel')
    ->where('user_id', 1)
    ->get();

// Get first result or null
$article = Article::search('Tutorial')->first();

// Count results without fetching
$count = Article::search('Laravel')->count();`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>{"Article::search('Laravel') = \"Find all books with 'Laravel' in them\""}</li>
            <li>{"->where('user_id', 1) = \"But only books by author #1\""}</li>
            <li>{"->get() = \"Give me the actual books\""}</li>
          </ul>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Pagination</h4>

        <CodeBlock>{`// Simple pagination
$articles = Article::search('Laravel')->paginate(15);

// With cursor (better for large datasets)
$articles = Article::search('Laravel')
    ->cursorPaginate(15);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Soft Deletes</h4>

        <CodeBlock>{`// Include soft deleted records
$articles = Article::search('Laravel')
    ->withTrashed()
    ->get();

// Only trashed records
$articles = Article::search('Laravel')
    ->onlyTrashed()
    ->get();`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Search Queries</p>
          <p className="mt-2 text-sm">Practice search queries:</p>
          <CodeBlock>{`// Exercise 1: Find all published articles about "PHP"
$articles = Article::search('PHP')
    ->where('is_published', true)
    ->get();

// Exercise 2: Get first 5 results
$articles = Article::search('Tutorial')
    ->take(5)
    ->get();

// Exercise 3: Search with multiple where clauses
$articles = Article::search('Laravel')
    ->where('category', 'tutorial')
    ->where('is_published', true)
    ->paginate(10);`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Search Drivers
        </h3>

        <p className="text-[#5f6368] mt-2">
          Scout supports multiple search drivers. Choose based on your needs!
        </p>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Best For</th>
              <th>Setup Complexity</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Algolia</td>
              <td>Large apps, hosted solution</td>
              <td>Medium</td>
              <td>Paid (free tier)</td>
            </tr>
            <tr>
              <td>Meilisearch</td>
              <td>Self-hosted, open source</td>
              <td>Medium</td>
              <td>Free (self-hosted)</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>Small apps, simple needs</td>
              <td>None</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>Elasticsearch</td>
              <td>Enterprise, complex queries</td>
              <td>High</td>
              <td>Paid</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Configuring Drivers</h4>

        <CodeBlock>{`// config/scout.php
'driver' => env('SCOUT_DRIVER', 'algolia'),

'algolia' => [
    'id' => env('ALGOLIA_APP_ID', ''),
    'key' => env('ALGOLIA_SECRET', ''),
],

'meilisearch' => [
    'host' => env('MEILISEARCH_HOST', 'http://localhost:7700'),
    'key' => env('MEILISEARCH_KEY', null),
],`}</CodeBlock>

        <Tip>
          <strong>Tip:</strong> Start with the database driver for development/small apps. Switch to Algolia or Meilisearch when you need better performance!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Advanced Features
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Searchable Events</h4>

        <CodeBlock>{`// Automatically sync on save/delete
// Just use the Searchable trait and it works!

// Or manually control:
Article::searchable();     // Index single record
Article::searchableMany($articles);  // Index collection

Article::unsearchable();   // Remove from index
Article::unsearchableMany($articles);`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Batch Import</h4>

        <CodeBlock>{`// Import all existing records to search index
php artisan scout:import "App\\Models\\Article"

// Flush and re-import
php artisan scout:flush "App\\Models\\Article"`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Custom Engines</h4>

        <CodeBlock>{`// Create custom search engine
// app/Scout/ElasticsearchEngine.php

use Laravel\\Scout\\Engines\\Engine;
use Elastic\\Elasticsearch\\Client;

class ElasticsearchEngine extends Engine
{
    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function search($builder)
    {
        return $this->client->search([
            'index' => $builder->model->searchableAs(),
            'body' => [
                'query' => [
                    'match' => [
                        '_all' => $builder->query
                    ]
                ]
            ]
        ]);
    }

    public function map($builder, $results)
    {
        // Map results to models
    }
}`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Custom engines require implementing all required methods. Check Laravel docs for the full interface!
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Scout</th>
              <th>Go</th>
              <th>Node.js (Algolia)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Auto-sync</td>
              <td>Yes (Searchable trait)</td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
            <tr>
              <td>Setup</td>
              <td>Simple (composer require)</td>
              <td>Complex</td>
              <td>Medium</td>
            </tr>
            <tr>
              <td>Query Builder</td>
              <td>Yes (fluent)</td>
              <td>Depends on library</td>
              <td>algoliasearch</td>
            </tr>
            <tr>
              <td>Drivers</td>
              <td>4 built-in</td>
              <td>Multiple libs</td>
              <td>Multiple libs</td>
            </tr>
            <tr>
              <td>Soft deletes</td>
              <td>Built-in</td>
              <td>Manual</td>
              <td>Manual</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Node.js Algolia Example</h4>

        <CodeBlock>{`// Node.js with Algolia
const algoliasearch = require('algoliasearch');
const client = algoliasearch('APP_ID', 'API_KEY');
const index = client.initIndex('articles');

// Search
index.search('Laravel', (err, { hits }) => {
    console.log(hits);
});

// Manual indexing
index.saveObject({
    objectID: '1',
    title: 'Laravel Tutorial',
    body: 'Learn Laravel...'
});`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Go Example</h4>

        <CodeBlock>{`// Go with Elasticsearch (manual sync required)
type Article struct {
    ID    int    \`json:"id"\`
    Title string \`json:"title"\`
    Body  string \`json:"body"\`
}

// Manual indexing required
func indexArticle(article Article) error {
    _, err := es.Index().
        Index("articles").
        BodyJson(article).
        Refresh("true").
        Do(context.Background())
    return err
}

// Manual search
func searchArticles(query string) ([]Article, error) {
    result, err := es.Search().
        Index("articles").
        Query(query).
        Do(context.Background())
    // ... parse results
}`}</CodeBlock>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Key Difference</p>
          <p className="mt-2 text-[#5f6368]">
            Laravel Scout's magic is automatic model syncing - when you save a model, it's automatically indexed.
            In Go and Node.js, you typically need to manually trigger indexing after database writes.
            This makes Scout much easier to use for typical CRUD apps!
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Cheat Sheet: Scout Operations
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Make searchable</td>
              <td>{"use Searchable;"}</td>
              <td>Add trait to model</td>
            </tr>
            <tr>
              <td>Search</td>
              <td>{"Model::search('query')->get()"}</td>
              <td>Full-text search</td>
            </tr>
            <tr>
              <td>Filter</td>
              <td>{"->where('field', 'value')"}</td>
              <td>Add constraints</td>
            </tr>
            <tr>
              <td>Paginate</td>
              <td>{"->paginate(15)"}</td>
              <td>Paginate results</td>
            </tr>
            <tr>
              <td>Import</td>
              <td>{"php artisan scout:import"}</td>
              <td>Bulk index</td>
            </tr>
            <tr>
              <td>Flush</td>
              <td>{"php artisan scout:flush"}</td>
              <td>Remove from index</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Scout provides automatic full-text search for Eloquent models</li>
            <li>Just add the Searchable trait - indexing happens automatically!</li>
            <li>Supports Algolia, Meilisearch, Database, and custom engines</li>
            <li>Search queries use a fluent builder like Eloquent</li>
            <li>Compare to Go/Node.js: much easier auto-sync out of the box</li>
            <li>Start with database driver, upgrade to Algolia/Meilisearch as needed</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}