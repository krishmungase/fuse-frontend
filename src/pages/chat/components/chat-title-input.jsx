import { useEffect, useRef, useState } from 'react'

const ChatTitleInput = ({ title, className, onSubmit, onCancel }) => {
  const [value, setValue] = useState(title)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const submit = () => {
    const nextTitle = value.trim()

    if (!nextTitle || nextTitle === title) {
      onCancel()
      return
    }

    onSubmit(nextTitle)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submit()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
    }
  }

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={submit}
      onKeyDown={handleKeyDown}
      aria-label="Chat title"
      className={className}
    />
  )
}

export default ChatTitleInput
