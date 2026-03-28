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
          primary: {
            main: '#005BBB', // Синій - український прапор
            dark: '#004a99',
          },
          secondary: {
            main: '#FFD500', // Жовтий - український прапор
          },
          success: {
            main: '#10B981',
          },
          background: {
            default: darkMode ? '#1A1A1A' : '#F4F7FA',
            paper: darkMode ? '#2D2D2D' : '#FFFFFF',
          },
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
          h1: {
            fontFamily: "'Oswald', 'Roboto', sans-serif",
            fontWeight: 700,
          },
          h2: {
            fontFamily: "'Oswald', 'Roboto', sans-serif",
            fontWeight: 700,
          },
          h3: {
            fontFamily: "'Oswald', 'Roboto', sans-serif",
            fontWeight: 700,
          },
          h4: {
            fontFamily: "'Oswald', 'Roboto', sans-serif",
            fontWeight: 600,
          },
          h5: {
            fontFamily: "'Oswald', 'Roboto', sans-serif",
            fontWeight: 600,
          },
          h6: {
            fontFamily: "'Oswald', 'Roboto', sans-serif",
            fontWeight: 600,
          },
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
