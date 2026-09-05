import { MicIcon, PlusIcon } from 'lucide-animated'
import { HardDriveUpload } from 'lucide-react'

import { useState } from 'react'

import { IconButton } from '@/components'
import { useSendMessage } from '@/apis'
import { useChatModel } from '@/hooks'
import {
  PromptInput as AIPromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionAddScreenshot,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'

import ModelSelector from './model-selector'

import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const MENU_ITEM =
  'cursor-pointer gap-3 rounded-xl px-3 py-2 text-[14px] text-chat-secondary focus:bg-chat-hover focus:text-chat-foreground [&_svg]:size-[18px] [&_svg]:text-chat-secondary'

const PILL = [
  '[&_[data-slot=input-group]]:h-[55px]!',
  '[&_[data-slot=input-group]]:gap-1!',
  '[&_[data-slot=input-group]]:rounded-full!',
  '[&_[data-slot=input-group]]:border-chat-border!',
  '[&_[data-slot=input-group]]:bg-chat-surface!',
  '[&_[data-slot=input-group]]:px-3!',
  '[&_[data-slot=input-group]]:shadow-none!',
  '[&_[data-slot=input-group]]:ring-0!',
].join(' ')

const PromptInput = () => {
  const { models, selectedModel, selectModel, isLoading } = useChatModel()

  const { sendMessage, isLoading: isSending } = useSendMessage({
    onSuccess: (data) => console.log('[chat]', data?.model, data?.messages),
  })

  const [hasText, setHasText] = useState(false)

  const handleSubmit = ({ text }) => {
    const prompt = text?.trim()
    if (!prompt) return

    setHasText(false)
    sendMessage({
      data: { message: prompt, ...(selectedModel && { model: selectedModel }) },
    })
  }

  const status = isSending ? 'submitted' : undefined

  return (
    <AIPromptInput
      onSubmit={handleSubmit}
      onClick={(event) =>
        event.currentTarget.querySelector('textarea')?.focus()
      }
      className={`w-full max-w-[740px] min-w-0 ${PILL}`}
    >
      <PromptInputActionMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            icon={PlusIcon}
            animated
            iconSize={22}
            label="Add attachment"
            onClick={(event) => event.stopPropagation()}
          />
        </DropdownMenuTrigger>

        <PromptInputActionMenuContent
          sideOffset={10}
          className="min-w-[196px] rounded-2xl border-chat-border bg-chat-elevated p-1.5 text-chat-foreground shadow-lg"
        >
          <PromptInputActionAddAttachments
            label="Upload files"
            className={MENU_ITEM}
          />

          <PromptInputActionAddScreenshot
            label="Take a screenshot"
            className={MENU_ITEM}
          />
        </PromptInputActionMenuContent>
      </PromptInputActionMenu>

      <PromptInputTextarea
        rows={1}
        wrap="off"
        onChange={(event) => setHasText(event.target.value.trim().length > 0)}
        placeholder="Ask FuseAI"
        aria-label="Ask FuseAI"
        className="field-sizing-fixed h-full max-h-none min-h-0 flex-1 px-2 py-0 text-[16px] leading-[55px] text-chat-foreground placeholder:text-chat-secondary focus-visible:ring-0 overflow-y-hidden"
      />

      <PromptInputTools
        className="shrink-0"
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

        <PromptInputSubmit
          status={status}
          disabled={!hasText && !status}
          className="size-9 rounded-full bg-chat-foreground text-chat-background hover:bg-chat-foreground/90 disabled:bg-chat-hover disabled:text-chat-muted"
        />
      </PromptInputTools>
    </AIPromptInput>
  )
}

export default PromptInput
