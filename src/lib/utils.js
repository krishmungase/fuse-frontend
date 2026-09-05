import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** "Krishna Mungase" -> "KM". Used for avatar fallbacks. */
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

/**
 * Normalises LaTeX delimiters so remark-math sees a single syntax: `$$..$$`,
 * `\[..\]` and `\(..\)` all become `$..$`, and any remaining bare `$` is
 * escaped so prices do not open a math span. Code spans and fences are copied
 * through untouched.
 */
export function perfectFormatMarkdown(text) {
  const codeRegex = /(```[\s\S]*?```|`[^`]*`)/g
  let lastIndex = 0
  let result = ''

  const replaceOutsideCode = (chunk) =>
    chunk
      .replace(/\$\$/g, '__DOLLAR__')
      .replace(/\$/g, '\\$')
      .replace(
        /__DOLLAR__\s*([\s\S]*?)\s*__DOLLAR__/g,
        (_, inner) => `$${inner.trim()}$`
      )
      .replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_, inner) => `$${inner.trim()}$`)
      .replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_, inner) => `$${inner.trim()}$`)

  text.replace(codeRegex, (match, code, offset) => {
    result += replaceOutsideCode(text.slice(lastIndex, offset))
    result += code
    lastIndex = offset + code.length
    return code
  })

  result += replaceOutsideCode(text.slice(lastIndex))
  return result
}

/** Pulls `<followup>Question?</followup>` tags out of a reply. */
export const extractFollowUpQuestions = (content = '') => {
  const followupRegex = /<followup>(.*?)<\/followup>/gs
  const questions = []

  for (const match of content.matchAll(followupRegex)) {
    const question = match[1]?.trim()
    if (question) {
      questions.push({ id: `followup-${crypto.randomUUID()}`, question })
    }
  }

  return questions
}

/** Strips those same tags so they never render as text. */
export const removeFollowUpTags = (content = '') =>
  content.replace(/<followup>.*?<\/followup>/gs, '').trim()
