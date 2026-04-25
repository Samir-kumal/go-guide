'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function FileStorageTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="file-storage" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          File Storage - The Complete Guide
        </h2>

        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#FF2D20]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is Laravel Storage abstraction?</li>
            <li>2. Storing files (local & cloud)</li>
            <li>3. Retrieving files</li>
            <li>4. Disk configuration</li>
            <li>5. Cloud storage (S3)</li>
            <li>6. Go/Node.js comparison</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will master Laravel's filesystem abstraction,
          with comparisons to Go and Node.js to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          What is Laravel Storage?
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel Storage = A universal remote control that works with ANY TV</li>
            <li>Local disk = Your living room TV</li>
            <li>S3 = A TV at your friend's house</li>
            <li>The code doesn't change - just which "TV" you're controlling!</li>
          </ul>
        </div>

        <p className="text-[#5f6368] mt-4">
          Laravel provides a powerful filesystem abstraction. You can easily switch between local storage 
          and cloud storage like Amazon S3 without changing your code. This is like having a universal 
          remote that works with any TV brand!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Why Use Storage Facade?</h4>

        <p className="text-[#5f6368] mt-2">
          The Storage facade provides a unified API regardless of where files are stored:
        </p>

        <CodeBlock>{`use Illuminate\\Support\\Facades\\Storage;

// Your code stays THE SAME whether files are local or on S3!
// Just change the disk configuration in config/filesystems.php

// This works with local disk, S3, FTP, or any other driver
Storage::put('file.txt', 'Contents');`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is much simpler than manually integrating with <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">aws-sdk</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">multer</code> in Node.js. Laravel handles the driver logic, permissions, and stream management for you.
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Storing Files
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Basic Storage</h4>

        <p className="text-[#5f6368] mt-2">
          Use the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Storage</code> facade to store content or uploaded files.
        </p>

        <CodeBlock>{`use Illuminate\\Support\\Facades\\Storage;

// Store string content
Storage::put('file.txt', 'Contents');

// Store an uploaded file (from a request)
$path = $request->file('avatar')->store('avatars');

// Store on a specific disk (e.g., S3)
Storage::disk('s3')->put('file.txt', 'Contents');

// Check if file exists before writing
if (!Storage::exists('file.txt')) {
    Storage::put('file.txt', 'New contents');
}`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Storing Uploaded Files</h4>

        <p className="text-[#5f6368] mt-2">
          Handle file uploads with ease:
        </p>

        <CodeBlock>{`// Store in default disk (usually local)
$path = $request->file('image')->store('images');

// Store with custom filename
$path = $request->file('image')->storeAs('images', 'custom-name.jpg');

// Store on S3
$path = $request->file('image')->store('images', 's3');

// Get original filename
$filename = $request->file('image')->getClientOriginalName();

// Get file extension
$ext = $request->file('image')->getClientOriginalExtension();`}</CodeBlock>

        <Warning>
          <strong>Warning:</strong> Always validate uploaded files! Use Laravel's validation rules like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">mimes:jpg,png</code> and <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">max:2048</code> to prevent security issues.
        </Warning>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Retrieving Files
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Get File Contents</h4>

        <CodeBlock>{`// Get file contents as string
$contents = Storage::get('file.txt');

// Check if file exists
if (Storage::exists('file.txt')) {
    // File exists!
}

// Get file size (in bytes)
$size = Storage::size('file.txt');

// Get last modified time
$time = Storage::lastModified('file.txt');`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Get Public URLs</h4>

        <CodeBlock>{`// Get public URL (for locally served files)
$url = Storage::url('file.txt');

// For S3, this returns the S3 URL
$url = Storage::disk('s3')->url('file.txt');

// Get temporary URL (for private files)
$url = Storage::temporaryUrl('file.txt', now()->addMinutes(5));`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Download Files</h4>

        <CodeBlock>{`// Download file
return Storage::download('file.txt');

// Download with custom filename
return Storage::download('file.txt', 'custom-name.txt');`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">List Files</h4>

        <CodeBlock>{`// Get all files in a directory
$files = Storage::files('documents');

// Get all files recursively
$files = Storage::allFiles('documents');

// Get all directories
$dirs = Storage::directories('documents');

// Get all directories recursively
$dirs = Storage::allDirectories('documents');`}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Store and Retrieve Files</p>
          <p className="mt-2 text-sm">Practice storing and retrieving files:</p>
          <CodeBlock>{`// Practice: Store a text file
Storage::put('test.txt', 'Hello, Laravel Storage!');

// Practice: Read it back
$contents = Storage::get('test.txt');
echo $contents; // "Hello, Laravel Storage!"

// Practice: Check if it exists
if (Storage::exists('test.txt')) {
    echo "File found!";
}

// Practice: Get its URL
$url = Storage::url('test.txt');
echo $url;`}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Disk Configuration
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Configuring Disks</h4>

        <p className="text-[#5f6368] mt-2">
          Configure disks in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">config/filesystems.php</code>:
        </p>

        <CodeBlock>{`'disks' => [
    'local' => [
        'driver' => 'local',
        'root' => storage_path('app'),
        'throw' => false,
    ],

    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],

    's3' => [
        'driver' => 's3',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION'),
        'bucket' => env('AWS_BUCKET'),
        'url' => env('AWS_URL'),
    ],
],`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Default Disk</h4>

        <p className="text-[#5f6368] mt-2">
          By default, Laravel uses the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">local</code> disk. Change it in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">config/filesystems.php</code>:
        </p>

        <CodeBlock>{`'default' => env('FILESYSTEM_DISK', 'local'),`}</CodeBlock>

        <p className="text-[#5f6368] mt-2">
          Or use the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">FILESYSTEM_DISK</code> env variable to switch between local and S3 without code changes!
        </p>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Cloud Storage (S3)
        </h3>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Setting Up S3</h4>

        <div className="bg-[#fff3e0] border-l-4 border-[#ff9800] p-4 my-4">
          <p className="font-semibold text-[#e65100]">Prerequisites</p>
          <ul className="mt-2 space-y-1">
            <li>1. Install Flysystem adapter: <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">composer require league/flysystem-aws-s3-v3</code></li>
            <li>2. Configure AWS credentials in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">.env</code></li>
            <li>3. Set <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">FILESYSTEM_DISK=s3</code> to use S3 everywhere!</li>
          </ul>
        </div>

        <CodeBlock>{`// Set in .env:
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket
FILESYSTEM_DISK=s3`}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Using S3</h4>

        <p className="text-[#5f6368] mt-2">
          Once configured, your code doesn't need to change at all!
        </p>

        <CodeBlock>{`// This automatically uses S3 if FILESYSTEM_DISK=s3
Storage::put('avatars/user-123.jpg', file_get_contents($request->file('avatar')));

$url = Storage::url('avatars/user-123.jpg');

// Or explicitly use S3 disk
Storage::disk('s3')->put('avatars/user-123.jpg', $contents);`}</CodeBlock>

        <Tip>
          Pro Tip: Use <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">FILESYSTEM_DISK=s3</code> in production and <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">FILESYSTEM_DISK=local</code> in local development to test locally!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#FF2D20] mt-8 text-xl font-semibold">
          Go/Node.js Comparison
        </h3>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Laravel Storage</th>
              <th>Go os package</th>
              <th>Node.js fs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unified API</td>
              <td>Yes (facade)</td>
              <td>No (separate packages)</td>
              <td>fs-extra</td>
            </tr>
            <tr>
              <td>Cloud storage</td>
              <td>Built-in S3 driver</td>
              <td>aws-sdk separately</td>
              <td>aws-sdk separately</td>
            </tr>
            <tr>
              <td>File uploads</td>
              <td>{"Request->file()"}</td>
              <td>Manual parsing</td>
              <td>Multer</td>
            </tr>
            <tr>
              <td>Pre-signed URLs</td>
              <td>temporaryUrl()</td>
              <td>Custom code</td>
              <td>Custom code</td>
            </tr>
            <tr>
              <td>Disks</td>
              <td>Multiple configured</td>
              <td>Manual paths</td>
              <td>Manual paths</td>
            </tr>
            <tr>
              <td>Config-based</td>
              <td>Yes</td>
              <td>No</td>
              <td>Config optional</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Code Comparison</h4>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel</p>
            <CodeBlock>{`// Simple!Storage::put('file.txt', 'content');
$url = Storage::url('file.txt');`}</CodeBlock>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800">Go</p>
            <CodeBlock>{`// More verboseos.WriteFile("file.txt", []byte("content"), 0644)`}</CodeBlock>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 my-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800">Laravel S3</p>
            <CodeBlock>{`// Same code!Storage::disk('s3')->put('file.txt', 'content');`}</CodeBlock>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800">Node.js S3</p>
            <CodeBlock>{`// Requires S3 clients3Client.send(new PutObjectCommand({
    Bucket: 'bucket',
    Key: 'file.txt',
    Body: 'content'
}));`}</CodeBlock>
          </div>
        </div>

        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
          <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
          <ul className="mt-2 space-y-2">
            <li>Laravel Storage = Universal remote for files</li>
            <li>Code stays the same, just change the disk!</li>
            <li>S3 works out of the box with Laravel</li>
            <li>Configure FILESYSTEM_DISK to switch between local/S3</li>
            <li>File uploads handled automatically</li>
            <li>Pre-signed URLs built-in</li>
          </ul>
        </div>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}