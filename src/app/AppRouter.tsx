import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { Context } from '..'
import { UserType } from '../store/UserStore'
import { authRoutes, publicRoutes } from '../utils/routes'
import { HOME_ROUTE } from '../utils/consts'

const AppRouter = observer(() => {
  const { userStore } = useContext(Context) as UserType

  let mapRoute: RouteObject[]
  if (userStore.isAuth) {
    mapRoute = [...authRoutes, ...publicRoutes]
  } else {
    mapRoute = [...publicRoutes]
  }
  mapRoute.push({
    path: '*',
    element: <Navigate to={HOME_ROUTE} />,
  })
  return useRoutes(mapRoute)
})

export default AppRouter
