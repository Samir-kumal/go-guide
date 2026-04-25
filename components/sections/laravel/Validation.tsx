import { CodeBlock, Note, Tip, Warning } from '@/components/ui'

export function Validation() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="validation" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Validation
        </h2>
        <p>Laravel provides several different approaches to validate your application&apos;s incoming data. By default, Laravel&apos;s base controller class uses a trait which provides a convenient method to validate incoming HTTP requests with a variety of powerful validation rules.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Basic Validation</h3>
        <CodeBlock>{`public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|unique:posts|max:255',
        'body' => 'required',
    ]);

    // The blog post is valid...
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is similar to libraries like <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Joi</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Zod</code>, but built directly into the framework. If validation fails, Laravel automatically redirects back with errors.
        </Tip>
      </section>

      <section>
        <h3 id="form-requests" className="text-[#5f6368] mt-8 font-semibold">Form Requests</h3>
        <p>For more complex validation scenarios, you may wish to create a "form request". Form requests are custom request classes that encapsulate their own validation and authorization logic.</p>
        <CodeBlock>{`# php artisan make:request StorePostRequest

class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
        ];
    }
}`}</CodeBlock>
        <p className="mt-4">Using it in your controller is clean:</p>
        <CodeBlock>{`public function store(StorePostRequest $request)
{
    // The incoming request is already validated...
    $validated = $request->validated();
}`}</CodeBlock>
      </section>

      <section>
        <h3 id="displaying-errors" className="text-[#5f6368] mt-8 font-semibold">Displaying Validation Errors</h3>
        <p>If validation fails, Laravel will redirect the user back to their previous location. All of the validation errors will automatically be flashed to the session.</p>
        <CodeBlock>{`<!-- resources/views/post/create.blade.php -->

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
