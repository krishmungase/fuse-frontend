import { Search } from 'lucide-react'

const PluginsHeader = ({ term, onTermChange }) => (
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div>
      <h1 className="text-[32px] leading-tight font-semibold text-chat-foreground">
        Plugins
      </h1>
      <p className="mt-1 text-[15px] text-chat-secondary">
        Work with Fuse across your favorite tools.
      </p>
    </div>

    <div className="relative w-full sm:w-[300px]">
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-chat-secondary" />
      <input
        type="text"
        value={term}
        onChange={(event) => onTermChange(event.target.value)}
        placeholder="Search plugins"
        aria-label="Search plugins"
        className="h-11 w-full rounded-full border border-chat-border bg-chat-surface pr-4 pl-11 text-[14px] text-chat-foreground outline-none placeholder:text-chat-secondary focus-visible:border-chat-secondary"
      />
    </div>
  </div>
)

export default PluginsHeader
