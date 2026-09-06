import { useEffect, useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router'
import { SearchIcon } from 'lucide-react'
import { format, isThisYear } from 'date-fns'

import { useChats } from '@/apis'
import { useDebounce, usePageTitle } from '@/hooks'
import { pageTitle } from '@/constants'
import ChatTopbar from '../conversation/components/chat-topbar'

const formatDate = (value) => {
  const date = new Date(value)
  return format(date, isThisYear(date) ? 'MMM d' : 'MMM d, yyyy')
}

const SearchChatsPage = () => {
  usePageTitle({ title: pageTitle.SEARCH_PAGE })

  const { sidebarCollapsed, openSidebar, expandSidebar } = useOutletContext()

  const [searchParams, setSearchParams] = useSearchParams()
  const [term, setTerm] = useState(() => searchParams.get('q') ?? '')

  const debouncedTerm = useDebounce(term, 300)

  useEffect(() => {
    setSearchParams(debouncedTerm ? { q: debouncedTerm } : {}, {
      replace: true,
    })
  }, [debouncedTerm, setSearchParams])

  const { chats, isLoading, isFetching } = useChats({ q: debouncedTerm })

  const isSearching = Boolean(debouncedTerm)
  const isBusy = isLoading || isFetching

  return (
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-chat-background">
      <ChatTopbar
        sidebarCollapsed={sidebarCollapsed}
        onOpenSidebar={openSidebar}
        onExpandSidebar={expandSidebar}
      />

      <div className="scrollbar-extra-thin min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[840px] px-4 pt-6 pb-16 sm:px-6">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-chat-secondary" />
            <input
              autoFocus
              type="text"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search chats"
              aria-label="Search chats"
              className="h-[56px] w-full rounded-full border border-chat-border bg-chat-surface pr-5 pl-14 text-[16px] text-chat-foreground outline-none placeholder:text-chat-secondary focus-visible:border-chat-secondary"
            />
          </div>

          <p className="px-2 pt-8 pb-2 text-[14px] text-chat-muted">
            {isSearching ? 'Results' : 'Recent'}
          </p>

          {isBusy && !chats.length ? (
            <p className="px-2 py-3 text-[14px] text-chat-muted">Searching…</p>
          ) : null}

          {!isBusy && !chats.length ? (
            <p className="px-2 py-3 text-[14px] text-chat-muted">
              {isSearching
                ? `No chats match “${debouncedTerm}”`
                : 'No chats yet'}
            </p>
          ) : null}

          <ul className="flex flex-col">
            {chats.map((chat) => (
              <li key={chat.id}>
                <Link
                  to={`/chat/${chat.id}`}
                  className="flex items-center justify-between gap-6 rounded-xl px-4 py-3.5 text-chat-secondary transition-colors duration-150 outline-none hover:bg-chat-hover hover:text-chat-foreground focus-visible:bg-chat-hover focus-visible:text-chat-foreground"
                >
                  <span className="min-w-0 truncate text-[16px]">
                    {chat.title}
                  </span>
                  <span className="shrink-0 text-[14px] text-chat-muted">
                    {formatDate(chat.updatedAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default SearchChatsPage
