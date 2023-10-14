import React, { useEffect, useState } from 'react'
import { TextField, Box, Grid } from '@mui/material'
import userAPI from '../http/userAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { IUserCreateUpdate } from '../utils/interfaces'
import ConfirmationDialog from './ConfirmationDialog'
import EditPageControlButton from './EditPageControlButton'
import { deleteUser, saveUser } from '../utils/editPageUtils'
import Typography from '@mui/material/Typography'

const UserEditPage = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [saveOpen, setSaveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      userAPI.getOneUser(userId).then((data) => {
        setName(data.name)
        setEmail(data.email)
      })
    }
  }, [userId])

  const userFormSubmit = async (e: React.FormEvent) => {
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
  const handleSaveUser = async () => {
    const data: IUserCreateUpdate = {
      name,
      email,
      password,
    }

    await saveUser(userId, data, navigate, handleCloseDialog)
  }
  const handleDeleteUser = async () => {
    await deleteUser(userId, navigate, handleCloseDialog)
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant={'h6'} sx={{ my: 2 }}>
        {userId ? 'Редагування інформації про користувача' : 'Додавання інформації про користувача'}
      </Typography>
      <form onSubmit={userFormSubmit}>
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
              label='Найменування'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              multiline={false}
              fullWidth
              disabled={!!userId}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              type={'email'}
              value={email}
              fullWidth
              disabled={!!userId}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Пароль'
              value={password}
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <EditPageControlButton id={userId ?? ''} handleRemove={handleRemoveButton} />
        </Grid>
      </form>

      <ConfirmationDialog
        open={saveOpen}
        onClose={handleCloseDialog}
        onConfirm={handleSaveUser}
        title='Зберегти'
        contentText='Ви впевнені, що хочете зберегти зміни?'
        confirmText='Зберегти'
      />

      <ConfirmationDialog
        open={deleteOpen}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteUser}
        title='Видалити'
        contentText='Ви впевнені, що хочете видалити цей елемент?'
        confirmText='Видалити'
      />
    </Box>
  )
}

export default UserEditPage
