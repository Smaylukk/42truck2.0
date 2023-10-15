import React, { useEffect, useState } from 'react'
import { TextField, Checkbox, FormControlLabel, Box, Grid } from '@mui/material'
import sponsorAPI from '../http/sponsorAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { ISponsorCreateUpdate } from '../utils/interfaces'
import config from '../utils/config'
import uploadAPI from '../http/uploadAPI'
import ConfirmationDialog from './ConfirmationDialog'
import EditPageControlButton from './EditPageControlButton'
import UploadImageButton from './UploadImageButton'
import { deleteSponsor, saveSponsor } from '../utils/editPageUtils'
import Typography from '@mui/material/Typography'

const SponsorEditPage = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [active, setActive] = useState(true)
  const [saveOpen, setSaveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { sponsorId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (sponsorId) {
      sponsorAPI.getOneSponsor(sponsorId).then((data) => {
        setName(data.name)
        setDescription(data.description)
        setUrl(data.url)
        setImageUrl(data.picture)
        setActive(data.active)
      })
    }
  }, [sponsorId])

  const sponsorImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const { fileId } = await uploadAPI.upload(formData)
      setImageUrl(fileId)
    }
  }
  const sponsorFormSubmit = async (e: React.FormEvent) => {
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
  const handleSaveSponsor = async () => {
    const data: ISponsorCreateUpdate = {
      name,
      description,
      active,
      picture: imageUrl || '',
      url,
    }

    await saveSponsor(sponsorId, data, navigate, handleCloseDialog)
  }
  const handleDeleteSponsor = async () => {
    await deleteSponsor(sponsorId, navigate, handleCloseDialog)
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant={'h6'} sx={{ my: 2 }}>
        {sponsorId ? 'Редагування інформації про спонсора' : 'Додавання інформації про спонсора'}
      </Typography>
      <form onSubmit={sponsorFormSubmit}>
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
          <Grid item xs={12} sm={10}>
            <TextField
              label='Найменування'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              multiline={false}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControlLabel
              label='Активний'
              control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />}
            />
          </Grid>
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
            <TextField
              label='Сайт'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              multiline={false}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <UploadImageButton caption={'Додати фото'} handleImageChange={sponsorImageChange} />
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
          <EditPageControlButton id={sponsorId ?? ''} handleRemove={handleRemoveButton} />
        </Grid>
      </form>

      <ConfirmationDialog
        open={saveOpen}
        onClose={handleCloseDialog}
        onConfirm={handleSaveSponsor}
        title='Зберегти'
        contentText='Ви впевнені, що хочете зберегти зміни?'
        confirmText='Зберегти'
      />

      <ConfirmationDialog
        open={deleteOpen}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteSponsor}
        title='Видалити'
        contentText='Ви впевнені, що хочете видалити цей елемент?'
        confirmText='Видалити'
      />
    </Box>
  )
}

export default SponsorEditPage
