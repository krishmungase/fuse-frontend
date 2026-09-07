import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const DeleteChatDialog = ({ chat, isDeleting, onCancel, onConfirm }) => (
  <AlertDialog
    open={Boolean(chat)}
    onOpenChange={(open) => !open && onCancel()}
  >
    <AlertDialogContent className="rounded-3xl border-chat-border bg-chat-elevated text-chat-foreground">
      <AlertDialogHeader>
        <AlertDialogTitle>Delete chat?</AlertDialogTitle>
        <AlertDialogDescription className="text-chat-secondary">
          “{chat?.title}” and every message in it will be deleted. This cannot
          be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel className="rounded-full border-chat-border bg-transparent text-chat-secondary hover:bg-chat-hover hover:text-chat-foreground">
          Cancel
        </AlertDialogCancel>

        <AlertDialogAction
          disabled={isDeleting}
          onClick={(event) => {
            event.preventDefault()
            onConfirm()
          }}
          className="rounded-full bg-red-500 text-white hover:bg-red-500/90"
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export default DeleteChatDialog
