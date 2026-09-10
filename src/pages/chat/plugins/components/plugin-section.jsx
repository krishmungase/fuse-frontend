import PluginRow from './plugin-row'

const PluginSection = ({ title, plugins, getState, onToggle }) => {
  if (!plugins.length) return null

  return (
    <section className="mt-10">
      <p className="text-[14px] font-medium text-chat-foreground">{title}</p>

      <div className="mt-2 grid gap-x-8 sm:grid-cols-2">
        {plugins.map((plugin) => (
          <PluginRow
            key={plugin.id}
            plugin={plugin}
            state={getState(plugin)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  )
}

export default PluginSection
