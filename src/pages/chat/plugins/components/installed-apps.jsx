import { cn } from '@/lib/utils'

const InstalledApps = ({ plugins, onToggle }) => {
  if (!plugins.length) return null

  return (
    <section className="mt-10">
      <p className="text-[14px] font-medium text-chat-foreground">Installed</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {plugins.map((plugin) => {
          const Icon = plugin.icon

          return (
            <button
              key={plugin.id}
              type="button"
              title={`Disconnect ${plugin.name}`}
              onClick={() => onToggle(plugin)}
              className={cn(
                'flex size-12 cursor-pointer items-center justify-center rounded-xl transition-transform hover:scale-105',
                plugin.tint
              )}
            >
              <Icon className="size-6" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default InstalledApps
