import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, styled } from '@mui/material'
import React from 'react'

interface IPropsUploadImageButton {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  caption: string
}
const VisuallyHiddenInput = styled('input')({
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
export const UploadImageButton: React.FC<IPropsUploadImageButton> = ({
  caption,
  handleImageChange,
}) => {
  return (
    <Button
      component='label'
      variant='contained'
      startIcon={<CloudUploadIcon />}
      sx={{ width: 300 }}
    >
      {caption}
      <VisuallyHiddenInput type='file' onChange={handleImageChange} accept='image/*' />
    </Button>
  )
}

export default UploadImageButton
