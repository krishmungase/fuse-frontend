import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

import {
  cn,
  extractFollowUpQuestions,
  perfectFormatMarkdown,
  removeFollowUpTags,
} from '@/lib/utils'
import { useChatSession } from '@/pages/chat/context/chat-session'
import FollowUpQuestions from './follow-up-questions'

import 'katex/dist/katex.min.css'

export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`
export const LINK_STYLES = `decoration-none text-primary transition-all hover:text-primary`
export const LINK_SUBTLE_STYLES = `hover:text-primary decoration-none`
export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-transparent hover:before:text-primary pl-[1em] -ml-[1em]`

export function CodeBlock({ inline, className, children, ...props }) {
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children).replace(/\n$/, '')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy!', error)
    }
  }

  return !inline && match ? (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-100 transition-opacity hover:bg-gray-600"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        className="rounded !bg-neutral-900 font-mono !text-base"
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code
      className="rounded border bg-gray-200 px-1 font-mono text-sm text-primary dark:bg-accent"
      {...props}
    >
      {children}
    </code>
  )
}

const components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        'relative mt-3 scroll-m-20 border-t-2 pt-9 pb-3 text-2xl font-bold',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        'font-heading mt-4 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return (
        <a
          className={cn('text-blue-600 no-underline hover:text-blue-800')}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }

    return (
      <Link
        to={href}
        className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE, HEADING_LINK_ANCHOR)}
        {...props}
      />
    )
  },
  p: ({ className, ...props }) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-1 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-1 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    <img className={cn('rounded-md', className)} alt={alt} {...props} />
  ),
  hr: (props) => <hr className="my-4 md:my-8" {...props} />,
  code: (props) => <CodeBlock {...props} />,
  pre: (props) => (
    <pre
      className="mb-4 overflow-x-auto rounded-md font-mono text-sm"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto rounded-md border border-border">
      <table {...props} className="w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead
      {...props}
      className="border-b border-border bg-muted text-muted-foreground"
    >
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      {...props}
      className="border-r border-border px-4 py-2 text-left font-semibold text-foreground last:border-r-0"
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      {...props}
      className="border-t border-r border-border px-4 py-2 text-muted-foreground last:border-r-0"
    >
      {children}
    </td>
  ),
}

const processContent = (text) => {
  if (!text) return text

  // Fix spaces in URLs for markdown links and images
  return text.replace(
    /(!?\[[^\]]*\])\(([^)]+)\)/g,
    (match, textPart, urlPart) => {
      const parts = urlPart.match(/^(.*?)(?:\s+["'](.*?)["'])?$/)
      if (parts) {
        const url = parts[1].replace(/ /g, '%20')
        const title = parts[2] ? ` "${parts[2]}"` : ''
        return `${textPart}(${url}${title})`
      }
      return match
    }
  )
}

const closeOpenFence = (text) => {
  const fences = text.match(/^```/gm)
  return fences && fences.length % 2 === 1 ? `${text}\n\`\`\`` : text
}

const MDX = ({ content = '', showFollowUp = true }) => {
  const { send } = useChatSession()

  const followUpQuestions = useMemo(
    () => extractFollowUpQuestions(content),
    [content]
  )

  const cleanContent = useMemo(
    () => closeOpenFence(processContent(removeFollowUpTags(content))),
    [content]
  )

  return (
    <div className="relative">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={components}
      >
        {perfectFormatMarkdown(cleanContent)}
      </ReactMarkdown>

      {showFollowUp && followUpQuestions.length > 0 && (
        <FollowUpQuestions
          questions={followUpQuestions}
          onQuestionClick={(question) => send(question)}
        />
      )}
    </div>
  )
}

export default MDX
