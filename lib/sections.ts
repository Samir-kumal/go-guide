export type SectionEntry = {
  id: string
  label: string
  group: string | null
  lang: string
}

// Go sections
export const goSections: SectionEntry[] = [
  { id: 'quick-comparison', label: 'Quick Comparison', group: null, lang: 'go' },
  { id: 'code-breakdown', label: 'Code Breakdown', group: null, lang: 'go' },
  { id: 'every-single-line-explained', label: 'Every Single Line Explained', group: '🔍 Deep Dive', lang: 'go' },
  { id: 'source-code-representation', label: 'Source Code Representation', group: null, lang: 'go' },
  { id: 'floating-point-literals', label: 'Floating-Point Literals', group: '📝 Literals & Types', lang: 'go' },
  { id: 'imaginary-literals', label: 'Imaginary Literals', group: null, lang: 'go' },
  { id: 'rune-literals', label: 'Rune Literals', group: null, lang: 'go' },
  { id: 'string-literals', label: 'String Literals', group: null, lang: 'go' },
  { id: 'constants', label: 'Constants', group: null, lang: 'go' },
  { id: 'variables', label: 'Variables', group: null, lang: 'go' },
  { id: 'types', label: 'Types Overview', group: null, lang: 'go' },
  { id: 'boolean-types', label: 'Boolean Types', group: null, lang: 'go' },
  { id: 'numeric-types', label: 'Numeric Types', group: null, lang: 'go' },
  { id: 'string-types', label: 'String Types', group: null, lang: 'go' },
  { id: 'array-types', label: 'Array Types', group: null, lang: 'go' },
  { id: 'getlogfile', label: 'getLogFile()', group: null, lang: 'go' },
  { id: 'getlogfile-detailed', label: 'getLogFile() Deep Dive', group: null, lang: 'go' },
  { id: 'if-initialization', label: 'if With Initialization', group: null, lang: 'go' },
  { id: 'why-no-error', label: 'Why No Error', group: null, lang: 'go' },
  { id: 'pointers', label: '2. Pointers', group: '⚡ Key Concepts', lang: 'go' },
  { id: 'error-handling', label: '3. Error Handling', group: null, lang: 'go' },
  { id: 'defer', label: '4. Defer', group: null, lang: 'go' },
  { id: 'structs', label: '5. Structs', group: null, lang: 'go' },
  { id: 'interfaces', label: '6. Interfaces', group: null, lang: 'go' },
  { id: 'concurrency', label: 'Go vs JS', group: '🎮 Concurrency', lang: 'go' },
  { id: 'production', label: 'Production Use', group: null, lang: 'go' },
  { id: 'sql-basics', label: 'SQL Basics', group: '📊 Database', lang: 'go' },
  { id: 'sqlc', label: 'SQLC', group: null, lang: 'go' },
  { id: 'transactions', label: 'Transactions', group: null, lang: 'go' },
  { id: 'learning-path', label: 'Learning Path', group: '📖 Learning', lang: 'go' },
  { id: 'resources', label: 'Resources', group: null, lang: 'go' },
  { id: 'deep-dive-environment-variable-validation', label: 'Environment Validation', group: null, lang: 'go' },
  { id: 'deep-dive-http-handler-parameters', label: 'HTTP Handler Params', group: null, lang: 'go' },
  { id: 'major-go-concepts-deep-dive', label: 'Major Go Concepts', group: null, lang: 'go' },
  { id: 'goroutines-concurrent-execution', label: '1. Goroutines', group: null, lang: 'go' },
  { id: 'channels-communication-between-goroutines', label: '2. Channels', group: null, lang: 'go' },
  { id: 'interfaces-defining-behavior', label: '3. Interfaces', group: null, lang: 'go' },
  { id: 'error-handling-1', label: '4. Error Handling', group: null, lang: 'go' },
  { id: 'defer-panic-and-recovery', label: '5. Defer/Panic/Recover', group: null, lang: 'go' },
  { id: 'sync-package-waiting-for-goroutines', label: '6. Sync Package', group: null, lang: 'go' },
  { id: 'context-cancellation-and-timeouts', label: '7. Context', group: null, lang: 'go' },
  { id: 'structs-and-tags', label: '8. Structs and Tags', group: null, lang: 'go' },
  { id: 'slices-and-maps', label: '9. Slices and Maps', group: null, lang: 'go' },
  { id: 'testing-in-go', label: '10. Testing', group: null, lang: 'go' },
  { id: 'modules-and-dependency-management', label: '11. Modules', group: null, lang: 'go' },
  { id: 'generics-type-parameters', label: '12. Generics', group: null, lang: 'go' },
  { id: 'memory-management', label: '13. Memory & GC', group: null, lang: 'go' },
  { id: 'advanced-concurrency', label: '14. Adv. Concurrency', group: null, lang: 'go' },
  { id: 'profiling-observability', label: '15. Observability', group: null, lang: 'go' },
  { id: 'architecture-layout', label: '16. Architecture', group: null, lang: 'go' },
  { id: 'summary-table', label: 'Summary Table', group: null, lang: 'go' },
]

// PHP sections
export const phpSections: SectionEntry[] = [
  { id: 'basics', label: 'PHP Basics', group: null, lang: 'php' },
  { id: 'data-types', label: 'Data Types', group: null, lang: 'php' },
  { id: 'control-structures', label: 'Control Structures', group: null, lang: 'php' },
  { id: 'loops', label: 'Loops & Iteration', group: null, lang: 'php' },
]

// Laravel sections
export const laravelSections: SectionEntry[] = [
  { id: 'routing', label: 'Basic Routing', group: '🌐 Routing & Controllers', lang: 'laravel' },
  { id: 'route-parameters', label: 'Route Parameters', group: null, lang: 'laravel' },
  { id: 'route-groups', label: 'Groups & Middleware', group: null, lang: 'laravel' },
  { id: 'named-routes', label: 'Named Routes', group: null, lang: 'laravel' },
  { id: 'controllers', label: 'Controllers', group: null, lang: 'laravel' },
  { id: 'resource-controllers', label: 'Resource Controllers', group: null, lang: 'laravel' },
  { id: 'requests-responses', label: 'Requests & Responses', group: '📨 HTTP', lang: 'laravel' },
  { id: 'responses', label: 'Creating Responses', group: null, lang: 'laravel' },
  { id: 'middleware', label: 'Middleware', group: null, lang: 'laravel' },
  { id: 'csrf-protection', label: 'CSRF Protection', group: null, lang: 'laravel' },
  { id: 'sanctum', label: 'Laravel Sanctum', group: null, lang: 'laravel' },
  { id: 'validation', label: 'Validation', group: '🛡️ Logic & Safety', lang: 'laravel' },
  { id: 'form-requests', label: 'Form Requests', group: null, lang: 'laravel' },
  { id: 'error-handling', label: 'Error Handling', group: null, lang: 'laravel' },
  { id: 'testing', label: 'Testing', group: null, lang: 'laravel' },
  { id: 'sessions-cookies', label: 'Sessions & Cookies', group: null, lang: 'laravel' },
  { id: 'blade-templates', label: 'Blade Templates', group: '🎨 Views', lang: 'laravel' },
  { id: 'blade-directives', label: 'Blade Directives', group: null, lang: 'laravel' },
  { id: 'blade-layouts', label: 'Layouts & Inheritance', group: null, lang: 'laravel' },
  { id: 'eloquent-orm', label: 'Eloquent ORM', group: '💾 Database', lang: 'laravel' },
  { id: 'retrieving-data', label: 'Retrieving Data', group: null, lang: 'laravel' },
  { id: 'inserting-updating', label: 'Inserting & Updating', group: null, lang: 'laravel' },
  { id: 'relationships', label: 'Relationships', group: null, lang: 'laravel' },
  { id: 'migrations-seeders', label: 'Migrations & Seeders', group: null, lang: 'laravel' },
  { id: 'scout-search', label: 'Laravel Scout (Search)', group: null, lang: 'laravel' },
  { id: 'file-storage', label: 'File Storage', group: '📁 Storage & Services', lang: 'laravel' },
  { id: 'mail', label: 'Mail', group: null, lang: 'laravel' },
  { id: 'notifications', label: 'Notifications', group: null, lang: 'laravel' },
  { id: 'reverb-websockets', label: 'Laravel Reverb (WebSockets)', group: null, lang: 'laravel' },
  { id: 'collections', label: 'Collections', group: '🛠️ Advanced Logic', lang: 'laravel' },
  { id: 'higher-order-messages', label: 'Higher Order Messages', group: null, lang: 'laravel' },
  { id: 'service-container', label: 'Service Container', group: '🏗️ Architecture', lang: 'laravel' },
  { id: 'service-providers', label: 'Service Providers', group: null, lang: 'laravel' },
  { id: 'pennant', label: 'Laravel Pennant', group: null, lang: 'laravel' },
  { id: 'queues-jobs', label: 'Queues & Jobs', group: '⚡ Background Tasks', lang: 'laravel' },
  { id: 'events-listeners', label: 'Events & Listeners', group: null, lang: 'laravel' },
  { id: 'task-scheduling', label: 'Task Scheduling', group: null, lang: 'laravel' },
  { id: 'horizon', label: 'Laravel Horizon (Dashboard)', group: null, lang: 'laravel' },
  { id: 'pulse-tutorial', label: 'Laravel Pulse', group: '📊 Ecosystem', lang: 'laravel' },
  { id: 'nova', label: 'Laravel Nova', group: null, lang: 'laravel' },
  { id: 'authentication-authorization', label: 'Authentication', group: '🔒 Security', lang: 'laravel' },
  { id: 'gates-policies', label: 'Gates & Policies', group: null, lang: 'laravel' },
  { id: 'artisan-console', label: 'Artisan Console', group: '🛠️ CLI & Tools', lang: 'laravel' },
]

// Combined
export const allSections = [...goSections, ...phpSections, ...laravelSections]

// Helper
export function getSectionsByLanguage(lang: string): SectionEntry[] {
  return allSections.filter((s) => s.lang === lang)
}
