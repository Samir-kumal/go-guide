import { CodeBlock, Note, Tip } from '@/components/ui'

export function Pulse() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="pulse" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Laravel Pulse (Health Monitoring)
        </h2>
        <p>Laravel Pulse provides at-a-glance insights into your application&apos;s performance and usage. It allows you to monitor slow routes, heavy jobs, and system health in real-time.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Dashboard & Cards</h3>
        <p>Pulse uses &quot;Cards&quot; to display different metrics. You can customize the layout and even create your own cards using Livewire.</p>
        <CodeBlock>{`<x-pulse>
    <livewire:pulse.usage cols="4" rows="2" />
    <livewire:pulse.slow-queries expand />
    <livewire:pulse.exceptions />
</x-pulse>`}</CodeBlock>

        <h3 className="text-[#5f6368] mt-8 font-semibold">Custom Cards</h3>
        <p>Creating a custom card is as simple as creating a Livewire component that extends the Pulse Card class.</p>
        <CodeBlock>{`namespace App\\Livewire\\Pulse;

use Laravel\\Pulse\\Livewire\\Card;
use Livewire\\Attributes\\Lazy;

#[Lazy]
class TopSellers extends Card
{
    public function render()
    {
        return view('livewire.pulse.top-sellers');
    }
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is like having a lightweight, built-in <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">New Relic</code> or <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded font-mono text-sm">Datadog</code> for your Laravel application. It&apos;s perfect for quickly identifying performance bottlenecks.
        </Tip>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
