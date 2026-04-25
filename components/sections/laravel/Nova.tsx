import { CodeBlock, Note, Tip } from '@/components/ui'

export function Nova() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="nova" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Nova (Admin Panel)
        </h2>
        <p>Laravel Nova is a beautifully designed administration panel for Laravel. It allows you to manage your database records with ease using code-driven configuration.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining Resources</h3>
        <p>In Nova, each Eloquent model has a corresponding &quot;Resource&quot; class that defines how it should be displayed and edited.</p>
        <CodeBlock>{`namespace App\\Nova;

use Laravel\\Nova\\Fields\\ID;
use Laravel\\Nova\\Fields\\Text;
use Laravel\\Nova\\Fields\\HasMany;

class User extends Resource
{
    public static $model = \\App\\Models\\User::class;

    public function fields(NovaRequest $request)
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
          <strong>JS Tip:</strong> This is similar to &quot;Admin&quot; generators like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Strapi</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">KeystoneJS</code>, but it lives directly inside your Laravel app and uses your existing models.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
