import { CodeBlock, Note, Tip } from '@/components/ui'

export function Testing() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="testing" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Testing
        </h2>
        <p>Laravel is built with testing in mind. In fact, support for testing with Pest or PHPUnit is included out of the box and a <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">phpunit.xml</code> file is already setup for your application.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">HTTP Tests</h3>
        <p>HTTP tests allow you to make requests to your application and assert the output without manually simulating the network layer.</p>
        <CodeBlock>{`test('basic example', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

test('making a post request', function () {
    $response = $this->postJson('/api/user', ['name' => 'Sally']);

    $response
        ->assertStatus(201)
        ->assertJson([
            'created' => true,
        ]);
});`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is like having <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Supertest</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Cypress</code>-like API assertions built directly into your test runner.
        </Tip>
      </section>

      <section>
        <h3 id="mocking" className="text-[#5f6368] mt-8 font-semibold">Mocking Facades</h3>
        <p>Laravel provides convenient helpers for mocking facades, so you can test code without actually hitting external services (like the cache or mailer).</p>
        <CodeBlock>{`test('orders can be shipped', function () {
    Mail::fake();

    // Perform order shipping...

    Mail::assertSent(OrderShipped::class);
});`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
