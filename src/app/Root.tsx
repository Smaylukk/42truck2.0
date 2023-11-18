import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { UserType } from '../store/UserStore'
import UserAPI from '../http/userAPI'
import { CircularProgress, Container } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthLayout } from '../auth/AuthLayout'
import AppRouter from './AppRouter'
import { IThemeProps } from '../utils/interfaces'
import { GuestLayout } from '../guest/GuestLayout'

export const Root: React.FC<IThemeProps> = observer(({ themeChanger, useDark }) => {
  const { userStore } = useContext(Context) as UserType
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    UserAPI.check()
      .then((data) => {
        userStore.user = data
        userStore.isAuth = true
      })
      .catch(() => {
        userStore.isAuth = false
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ height: window.innerHeight }}
      >
        <CircularProgress color='primary' variant='determinate' size='lg' />
      </Container>
    )
  }

  if (userStore.isAuth) {
    return (
      <BrowserRouter>
        <AuthLayout themeChanger={themeChanger} useDark={useDark}>
          <AppRouter />
        </AuthLayout>
      </BrowserRouter>
    )
  }
  console.log('guest')
  return (
    <BrowserRouter>
      <GuestLayout themeChanger={themeChanger} useDark={useDark}>
        <AppRouter />
      </GuestLayout>
    </BrowserRouter>
  )
})
