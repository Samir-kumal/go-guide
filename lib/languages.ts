export type LanguageConfig = {
  id: string
  name: string
  label: string
  color: string
  icon: string
  sectionsPath: string
  parentLanguage?: string
  description: string
}

export const languages = {
  go: {
    id: 'go',
    name: 'Go',
    label: 'Go (Golang)',
    color: '#00ADD8',
    icon: '🐹',
    sectionsPath: 'go',
    description: 'Go programming language for JavaScript developers',
  },
  php: {
    id: 'php',
    name: 'PHP',
    label: 'PHP',
    color: '#777BB4',
    icon: '🐘',
    sectionsPath: 'php',
    description: 'PHP server-side scripting',
  },
  laravel: {
    id: 'laravel',
    name: 'Laravel',
    label: 'Laravel (PHP)',
    color: '#FF2D20',
    icon: '🏗️',
    sectionsPath: 'laravel',
    parentLanguage: 'php',
    description: 'Laravel PHP framework',
  },
} as const

export const languageList = Object.values(languages)

export function isValidLanguage(lang: string): lang is keyof typeof languages {
  return lang in languages
}

export function getLanguage(lang: string): LanguageConfig | undefined {
  if (!(lang in languages)) {
    return undefined
  }
  return languages[lang as keyof typeof languages]
}