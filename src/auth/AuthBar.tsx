import React from 'react'
import { IThemeProps } from '../utils/interfaces'
import { DefaultAppBar } from '../components/DefaultAppBar'

export const AuthAppBar: React.FC<IThemeProps> = ({ themeChanger, useDark }) => {
  return <DefaultAppBar useDark={useDark} themeChanger={themeChanger} isAuth={true} />
}
