import * as React from 'react'

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
      <div className="bg-white dark:bg-gray-800 rounded p-6 z-10 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-2">{title || 'Confirm'}</h3>
        <p className="text-sm text-gray-600 mb-4">{description || 'Are you sure?'}</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
