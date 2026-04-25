import { CodeBlock, Note, Tip } from '@/components/ui'

export function FileStorage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="file-storage" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          File Storage
        </h2>
        <p>Laravel provides a powerful filesystem abstraction. You can easily switch between local storage and cloud storage like Amazon S3 without changing your code.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Storing Files</h3>
        <p>Use the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Storage</code> facade to store content or uploaded files.</p>
        <CodeBlock>{`use Illuminate\\Support\\Facades\\Storage;

// Store string content
Storage::put('file.txt', 'Contents');

// Store an uploaded file (from a request)
$path = $request->file('avatar')->store('avatars');

// Store on a specific disk (e.g., S3)
Storage::disk('s3')->put('file.txt', 'Contents');`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is much simpler than manually integrating with <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">aws-sdk</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">multer</code> in Node.js. Laravel handles the driver logic, permissions, and stream management for you.
        </Tip>
      </section>

      <section>
        <h3 id="retrieving-files" className="text-[#5f6368] mt-8 font-semibold">Retrieving Files</h3>
        <CodeBlock>{`$contents = Storage::get('file.txt');

$url = Storage::url('file.txt'); // Get a public URL

if (Storage::exists('file.txt')) {
    // ...
}`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
