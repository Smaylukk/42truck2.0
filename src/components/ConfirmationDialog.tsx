import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface IPropsConfirmationDialog {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  contentText: string
  confirmText: string
}
const ConfirmationDialog: React.FC<IPropsConfirmationDialog> = ({
  open,
  onClose,
  onConfirm,
  title,
  contentText,
  confirmText,
}) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color='error'>
          Відмінити
        </Button>
        <Button onClick={handleConfirm} color='success' variant='outlined'>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
