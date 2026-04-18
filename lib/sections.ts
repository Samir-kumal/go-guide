export type SectionEntry = {
  id: string
  label: string
  group: string | null
}

export const sections: SectionEntry[] = [
  { id: 'quick-comparison', label: 'Quick Comparison', group: null },
  { id: 'code-breakdown', label: 'Code Breakdown', group: null },
  { id: 'getlogfile', label: 'getLogFile()', group: null },
  { id: 'getlogfile-detailed', label: 'getLogFile() Deep Dive', group: null },
  { id: 'if-initialization', label: 'if With Initialization', group: null },
  { id: 'why-no-error', label: 'Why No Error', group: null },
  { id: 'key-concepts', label: '1. Blank Identifier', group: '⚡ Key Concepts' },
  { id: 'pointers', label: '2. Pointers', group: null },
  { id: 'error-handling', label: '3. Error Handling', group: null },
  { id: 'defer', label: '4. Defer', group: null },
  { id: 'structs', label: '5. Structs', group: null },
  { id: 'interfaces', label: '6. Interfaces', group: null },
  { id: 'concurrency', label: 'Go vs JS', group: '🎮 Concurrency' },
  { id: 'production', label: 'Production Use', group: null },
  { id: 'learning-path', label: 'Learning Path', group: '📖 Learning' },
  { id: 'resources', label: 'Resources', group: null },
  { id: 'deep-dive-environment-variable-validation', label: 'Environment Validation', group: null },
  { id: 'deep-dive-http-handler-parameters', label: 'HTTP Handler Params', group: null },
  { id: 'major-go-concepts-deep-dive', label: 'Major Go Concepts', group: null },
  { id: 'goroutines-concurrent-execution', label: '1. Goroutines', group: null },
  { id: 'channels-communication-between-goroutines', label: '2. Channels', group: null },
  { id: 'interfaces-defining-behavior', label: '3. Interfaces', group: null },
  { id: 'error-handling-1', label: '4. Error Handling', group: null },
  { id: 'defer-panic-and-recovery', label: '5. Defer/Panic/Recover', group: null },
  { id: 'sync-package-waiting-for-goroutines', label: '6. Sync Package', group: null },
  { id: 'context-cancellation-and-timeouts', label: '7. Context', group: null },
  { id: 'structs-and-tags', label: '8. Structs and Tags', group: null },
  { id: 'slices-and-maps', label: '9. Slices and Maps', group: null },
  { id: 'summary-table', label: 'Summary Table', group: null },
]
