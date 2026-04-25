import { CodeBlock, Note, Tip } from '@/components/ui'

export function Pennant() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="pennant" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Pennant (Feature Flags)
        </h2>
        <p>Laravel Pennant is a simple, lightweight feature flag package for Laravel. It allows you to define features and check their state for different users or teams.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Defining Features</h3>
        <p>Features are defined using the <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Feature</code> facade in a service provider.</p>
        <CodeBlock>{`use Laravel\\Pennant\\Feature;

// Simple boolean flag
Feature::define('new-ui', fn (User $user) => $user->is_beta_tester);

// Rich value flag (A/B testing)
Feature::define('button-color', fn () => Arr::random(['red', 'blue', 'green']));`}</CodeBlock>

        <h3 className="text-[#5f6368] mt-8 font-semibold">Checking Features</h3>
        <CodeBlock>{`if (Feature::active('new-ui')) {
    // ...
}

// Or on a specific user
if ($user->features()->active('new-ui')) {
    // ...
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is like using <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">LaunchDarkly</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Flagsmith</code>, but built into your application code and database. It&apos;s great for gradual rollouts and A/B testing.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
