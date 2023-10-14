import React, { useEffect, useMemo, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Root } from './Root'
import { observer } from 'mobx-react-lite'

const App: React.FC = observer(() => {
  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkMode((window.localStorage.getItem('themeMode') || 'light') === 'dark')
    }
  }, [])
  const themeToggle = () => {
    window.localStorage.setItem('themeMode', themeString(!darkMode))
    setDarkMode((prev) => !prev)
  }
  const themeString = (b: boolean) => (b ? 'dark' : 'light')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeString(darkMode),
        },
      }),
    [darkMode],
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root themeChanger={themeToggle} useDark={darkMode} />
    </ThemeProvider>
  )
})

export default App
