import { useRef, useState } from 'react'
import { MicIcon, PlusIcon } from 'lucide-animated'
import { Camera, HardDriveUpload, Paperclip } from 'lucide-react'

import { IconButton } from '@/components'
import { useChatModel } from '@/hooks'

import ModelSelector from './model-selector'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const ATTACHMENT_ACTIONS = [
  { id: 'upload', label: 'Upload files', icon: Paperclip },
  { id: 'drive', label: 'Add from Drive', icon: HardDriveUpload },
  { id: 'camera', label: 'Take a photo', icon: Camera },
]

/** The "Ask FuseAI" pill: plus menu, text field, model picker and mic. */
const PromptInput = ({ onSubmit }) => {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')

  const { models, selectedModel, selectModel, isLoading } = useChatModel()

  const handleSubmit = (event) => {
    event.preventDefault()

    const prompt = value.trim()
    if (!prompt) return

    onSubmit?.({ prompt, model: selectedModel })
    setValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      onClick={() => inputRef.current?.focus()}
      className="flex h-[55px] w-full max-w-[740px] min-w-0 items-center gap-1 rounded-full border border-chat-border bg-chat-surface px-3"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            icon={PlusIcon}
            animated
            iconSize={22}
            label="Add attachment"
            onClick={(event) => event.stopPropagation()}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={10}
          className="min-w-[196px] rounded-2xl border-chat-border bg-chat-elevated p-1.5 text-chat-foreground shadow-lg"
        >
          {ATTACHMENT_ACTIONS.map((action) => (
            <DropdownMenuItem
              key={action.id}
              className="cursor-pointer gap-3 rounded-xl px-3 py-2 text-[14px] text-chat-secondary focus:bg-chat-hover focus:text-chat-foreground"
            >
              <action.icon className="size-[18px] text-chat-secondary" />
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask FuseAI"
        aria-label="Ask FuseAI"
        className="h-full min-w-0 flex-1 bg-transparent px-2 text-[16px] text-chat-foreground placeholder:text-chat-secondary focus:outline-none"
      />

      <div
        className="flex shrink-0 items-center gap-1"
        onClick={(event) => event.stopPropagation()}
      >
        <ModelSelector
          models={models}
          value={selectedModel}
          onChange={selectModel}
          isLoading={isLoading}
        />

        <IconButton
          icon={MicIcon}
          animated
          iconSize={20}
          label="Use microphone"
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </form>
  )
}

export default PromptInput
