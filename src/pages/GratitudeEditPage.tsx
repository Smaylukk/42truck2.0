import React, { useEffect, useState } from 'react'
import { TextField, Box, Grid } from '@mui/material'
import gratitudeAPI from '../http/gratitudeAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { IGratitudeCreateUpdate } from '../utils/interfaces'
import config from '../utils/config'
import uploadAPI from '../http/uploadAPI'
import ConfirmationDialog from '../components/ConfirmationDialog'
import EditPageControlButton from '../components/EditPageControlButton'
import UploadImageButton from '../components/UploadImageButton'
import { deleteGratitude, saveGratitude } from '../utils/editPageUtils'
import Typography from '@mui/material/Typography'

const GratitudeEditPage = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [saveOpen, setSaveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { gratitudeId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (gratitudeId) {
      gratitudeAPI.getOneGratitude(gratitudeId).then((data) => {
        setDescription(data.description)
        setImageUrl(data.url)
      })
    }
  }, [gratitudeId])

  const gratitudeImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const { fileId } = await uploadAPI.upload(formData)
      setImageUrl(fileId)
    }
  }
  const gratitudeFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    handleSaveOpenDialog()
  }
  const handleRemoveButton = () => {
    handleDeleteOpenDialog()
  }
  const handleSaveOpenDialog = () => {
    setSaveOpen(true)
  }
  const handleDeleteOpenDialog = () => {
    setDeleteOpen(true)
  }
  const handleCloseDialog = () => {
    setSaveOpen(false)
    setDeleteOpen(false)
  }
  const handleSaveGratitude = async () => {
    const data: IGratitudeCreateUpdate = {
      description,
      url: imageUrl || '',
    }

    await saveGratitude(gratitudeId, data, navigate, handleCloseDialog)
  }
  const handleDeleteGratitude = async () => {
    await deleteGratitude(gratitudeId, navigate, handleCloseDialog)
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant={'h6'} sx={{ my: 2 }}>
        {gratitudeId ? 'Редагування інформації про спонсора' : 'Додавання інформації про спонсора'}
      </Typography>
      <form onSubmit={gratitudeFormSubmit}>
        <Grid
          container
          direction='row'
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            mt: 2,
          }}
        >
          <Grid item xs={12}>
            <TextField
              label='Опис'
              value={description}
              multiline
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <UploadImageButton caption={'Додати фото'} handleImageChange={gratitudeImageChange} />
            <Box
              sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {imageUrl && (
                <img
                  src={`${config.staticUrl}${imageUrl}`}
                  alt='Обрана картинка'
                  style={{
                    margin: '5px 0px',
                    width: 250,
                    height: 250,
                    blockSize: 'fit-content',
                  }}
                />
              )}
            </Box>
          </Grid>
          <EditPageControlButton id={gratitudeId ?? ''} handleRemove={handleRemoveButton} />
        </Grid>
      </form>

      <ConfirmationDialog
        open={saveOpen}
        onClose={handleCloseDialog}
        onConfirm={handleSaveGratitude}
        title='Зберегти'
        contentText='Ви впевнені, що хочете зберегти зміни?'
        confirmText='Зберегти'
      />

      <ConfirmationDialog
        open={deleteOpen}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteGratitude}
        title='Видалити'
        contentText='Ви впевнені, що хочете видалити цей елемент?'
        confirmText='Видалити'
      />
    </Box>
  )
}

export default GratitudeEditPage
