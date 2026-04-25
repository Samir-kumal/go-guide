import { CodeBlock, Note, Tip } from '@/components/ui'

export function ServiceContainer() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="service-container" className="text-[#FF2D20] mt-10 text-2xl font-semibold">
          Service Container
        </h2>
        <p>The Laravel service container is a powerful tool for managing class dependencies and performing dependency injection.</p>
        
        <h3 className="text-[#5f6368] mt-6 font-semibold">Dependency Injection</h3>
        <p>Laravel automatically injects dependencies by type-hinting them in a constructor.</p>
        <CodeBlock>{`class PodcastController extends Controller
{
    public function __construct(
        protected AppleMusic $apple,
    ) {}

    public function show(string $id)
    {
        return $this->apple->findPodcast($id);
    }
}`}</CodeBlock>

        <Tip>
          <strong>JS Tip:</strong> This is like InversifyJS or the dependency injection in Angular/NestJS. Laravel resolves the entire dependency graph for you automatically.
        </Tip>
      </section>

      <section>
        <h3 id="service-providers" className="text-[#5f6368] mt-8 font-semibold">Service Providers</h3>
        <p>Service providers are the central place of all Laravel application bootstrapping. Your own application, as well as all of Laravel&apos;s core services, are bootstrapped via service providers.</p>
        <CodeBlock>{`public function register(): void
{
    $this->app->bind(EventPusher::class, RedisEventPusher::class);
}`}</CodeBlock>
      </section>

      <hr className="border-none border-t border-[#ddd] my-10" />
    </div>
  )
}
