import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import ThemeModeSwitch from '../components/ThemeModeSwitch'
import { IThemeProps } from '../utils/interfaces'

export const GuestAppBar: React.FC<IThemeProps> = ({ themeChanger, useDark }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Box sx={{ flexGrow: 0, display: { xs: 'flex' } }}>
          <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='inherit'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block' },
            }}
          >
            <MenuItem>
              <NavLink to={'/sponsorList'} onClick={handleCloseNavMenu}>
                <Button variant='contained' onClick={handleCloseNavMenu}>
                  Спонсори
                </Button>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to={'/requisites'} onClick={handleCloseNavMenu}>
                <Button variant='contained' onClick={handleCloseNavMenu}>
                  Реквізити
                </Button>
              </NavLink>
            </MenuItem>
          </Menu>
        </Box>
        <Box component={'img'} src='/assets/42.png' sx={{ mr: 2, height: 40 }} />
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          component={'a'}
          href={'/'}
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'block', textDecoration: 'none' },
          }}
        >
          Проект - 42 тачки на ЗСУ
        </Typography>
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          component={'a'}
          href={'/'}
          sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}
        >
          42 тачки
        </Typography>
        <ThemeModeSwitch useDark={useDark} onChange={themeChanger} />
      </Toolbar>
    </AppBar>
  )
}
