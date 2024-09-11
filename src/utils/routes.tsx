import React from 'react'
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  ADMIN_ROUTE,
  CAR_ROUTE,
  EDIT_SPONSOR_ROUTE,
  ADD_SPONSOR_ROUTE,
  EDIT_CAR_ROUTE,
  ADD_CAR_ROUTE,
  REQUISITES_ROUTE,
  SPONSOR_LIST_ROUTE,
  ADD_USER_ROUTE,
  EDIT_USER_ROUTE,
  EDIT_REPAIR_CAR_ROUTE,
  ADD_REPAIR_CAR_ROUTE,
  REPAIR_ROUTE,
  EDIT_GRATITUDE_ROUTE,
  ADD_GRATITUDE_ROUTE,
  GRATITUDE_ROUTE,
  EDIT_ZOMBIE_CAR_ROUTE,
  ADD_ZOMBIE_CAR_ROUTE,
  ZOMBIE_ROUTE,
  THANK_COMMUNITY_ROUTE,
} from './consts'
import Home from '../pages/Home'
import Auth from '../pages/Auth'
import { RouteObject } from 'react-router-dom'
import AdminPage from '../pages/AdminPage'
import SponsorEditPage from '../pages/SponsorEditPage'
import CarEditPage from '../pages/CarEditPage'
import Requisites from '../pages/Requisites'
import UserEditPage from '../pages/UserEditPage'
import { CarInfo } from '../pages/CarInfo'
import { Sponsors } from '../pages/Sponsors'
import Repair from '../pages/Repair'
import GratitudeEditPage from '../pages/GratitudeEditPage'
import { Gratitude } from '../pages/Gratitude'
import Zombie from '../pages/Zombie'
import ThankingCommunity from '../pages/ThankingCommunity'

export const publicRoutes: RouteObject[] = [
  { path: LOGIN_ROUTE, element: <Auth /> },
  { path: HOME_ROUTE, element: <Home /> },
  { path: REPAIR_ROUTE, element: <Repair /> },
  { path: ZOMBIE_ROUTE, element: <Zombie /> },
  { path: CAR_ROUTE, element: <CarInfo /> },
  { path: SPONSOR_LIST_ROUTE, element: <Sponsors /> },
  { path: REQUISITES_ROUTE, element: <Requisites /> },
  { path: GRATITUDE_ROUTE, element: <Gratitude /> },
  { path: THANK_COMMUNITY_ROUTE, element: <ThankingCommunity /> },
]
export const authRoutes: RouteObject[] = [
  ...publicRoutes,
  { path: ADMIN_ROUTE, element: <AdminPage /> },
  { path: EDIT_SPONSOR_ROUTE, element: <SponsorEditPage /> },
  { path: ADD_SPONSOR_ROUTE, element: <SponsorEditPage /> },
  { path: EDIT_CAR_ROUTE, element: <CarEditPage /> },
  { path: ADD_CAR_ROUTE, element: <CarEditPage /> },
  { path: EDIT_REPAIR_CAR_ROUTE, element: <CarEditPage /> },
  { path: ADD_REPAIR_CAR_ROUTE, element: <CarEditPage /> },
  { path: EDIT_ZOMBIE_CAR_ROUTE, element: <CarEditPage /> },
  { path: ADD_ZOMBIE_CAR_ROUTE, element: <CarEditPage /> },
  { path: EDIT_USER_ROUTE, element: <UserEditPage /> },
  { path: ADD_USER_ROUTE, element: <UserEditPage /> },
  { path: EDIT_GRATITUDE_ROUTE, element: <GratitudeEditPage /> },
  { path: ADD_GRATITUDE_ROUTE, element: <GratitudeEditPage /> },
]
