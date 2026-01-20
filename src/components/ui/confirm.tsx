export default function ConfirmDialog({ open, title, description, onConfirm, onCancel }: {
  open: boolean
  title?: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="z-10 w-full max-w-md rounded-xl border bg-card p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-2">{title || 'Confirm'}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description || 'Are you sure?'}</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded-md hover:bg-accent" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-destructive text-white rounded-md" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
