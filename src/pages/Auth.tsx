import { observer } from 'mobx-react-lite'
import React, { FormEvent, useContext, useState } from 'react'
import { Alert, Box, Button, Container, Grid, TextField } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '..'
import UserAPI from '../http/userAPI'
import { HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import { IUser, UserType } from '../store/UserStore'

const Auth = observer(() => {
  const { userStore } = useContext(Context) as UserType
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email: string
    name: string
    password: string
  }>({ email: '', name: '', password: '' })
  const [alertMsg, setAlertMsg] = useState('')

  const validateForm = (): boolean => {
    let result = true
    setErrors((prev) => ({ ...prev, email: '', name: '', password: '' }))
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email обовязкове' }))
      result = false
    }
    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email має бути в email-форматі',
      }))
      result = false
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: 'Пароль обовязковий' }))
      result = false
    }
    if (password.length < 4) {
      setErrors((prev) => ({
        ...prev,
        password: 'Довжина паролю має бути більша за 4 символи',
      }))
      result = false
    }

    return result
  }
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    try {
      userStore.user = (await UserAPI.login(email, password)) as IUser
      userStore.isAuth = true

      navigate(HOME_ROUTE)
    } catch (error: any) {
      console.log(error)
      setAlertMsg(error.response.data.message)
    }
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        height: window.innerHeight - 56,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={{ width: 600 }} className='p-3'>
        <h2 className='m-auto'>{'Авторизація'}</h2>
        <Box component='form' className='row g-3' noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Введіть ваш email...'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                helperText={errors.email}
                error={errors.email.length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Введіть ваш пароль...'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                helperText={errors.password}
                error={errors.password.length > 0}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='success'
                variant='outlined'
                className='ms-auto'
                fullWidth
              >
                {'Увійти'}
              </Button>
            </Grid>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                Немає аккаунту? <NavLink to={LOGIN_ROUTE}>{'Авторизуйтесь'}</NavLink>
              </Grid>
            </Grid>
            {alertMsg && (
              <Grid item xs={12}>
                <Alert severity='error' onClose={() => setAlertMsg('')}>
                  {alertMsg}
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  )
})

export default Auth
