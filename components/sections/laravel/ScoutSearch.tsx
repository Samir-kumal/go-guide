import { CodeBlock, Note, Tip } from '@/components/ui'

export function ScoutSearch() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="scout-search" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Scout (Full-text Search)
        </h2>
        <p>Laravel Scout provides a simple, driver-based solution for adding full-text search to your Eloquent models. It supports Algolia, Meilisearch, and a local database driver.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Making a Model Searchable</h3>
        <p>Apply the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Searchable</code> trait to your model.</p>
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

        <h3 className="text-[#5f6368] mt-8 font-semibold">Performing Searches</h3>
        <CodeBlock>{`$articles = Article::search('Laravel')->get();

// With constraints
$articles = Article::search('Laravel')
    ->where('user_id', 1)
    ->get();`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is like integrating <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Elasticsearch</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Algolia</code> into a Node.js app, but it happens automatically as you save your models.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
