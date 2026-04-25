import { languages, isValidLanguage } from './languages'

export function getSectionsPath(lang: string): string {
  if (!isValidLanguage(lang)) {
    throw new Error(`Unknown language: ${lang}`)
  }
  return languages[lang].sectionsPath
}

export async function loadSection(lang: string, sectionId: string) {
  const sectionsPath = getSectionsPath(lang)
  try {
    return await import(`@/components/sections/${sectionsPath}/${sectionId}`)
  } catch {
    return null
  }
}