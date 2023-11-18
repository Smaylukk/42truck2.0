import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import ThemeModeSwitch from '../components/ThemeModeSwitch'
import { NavLink } from 'react-router-dom'
import { IThemeProps } from '../utils/interfaces'
import Button from '@mui/material/Button'

export const AuthAppBar: React.FC<IThemeProps> = ({ themeChanger, useDark }) => {
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
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
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
            <MenuItem>
              <NavLink to={'/admin'} onClick={handleCloseNavMenu}>
                <Button variant='contained' onClick={handleCloseNavMenu}>
                  Адмінка
                </Button>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <Button variant='contained' href='https://t.me/martin_brest_pehota' target='_blank'>
                Мартин Брест
              </Button>
            </MenuItem>
            <MenuItem>
              <Button variant='contained' href='https://t.me/mouselab' target='_blank'>
                Антон Сененко
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Box
          component={'img'}
          src='/assets/42.png'
          sx={{ mr: 2, height: 40, display: { xs: 'none', md: 'block' } }}
        />
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          sx={{
            flexGrow: { xs: 1, md: 0 },
            display: { xs: 'block' },
          }}
        >
          <NavLink
            to={'/'}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            42 тачки
          </NavLink>
        </Typography>
        <Box sx={{ flexGrow: 5, display: { xs: 'none', md: 'flex', gridGap: 20 }, ml: 5 }}>
          <NavLink to={'/sponsorList'}>
            <Button variant='contained'>Спонсори</Button>
          </NavLink>
          <NavLink to={'/requisites'}>
            <Button variant='contained'>Реквізити</Button>
          </NavLink>
          <NavLink to={'/admin'}>
            <Button variant='contained'>Адмінка</Button>
          </NavLink>
          <Button variant='contained' href='https://t.me/martin_brest_pehota' target='_blank'>
            Мартин Брест
          </Button>
          <Button variant='contained' href='https://t.me/mouselab' target='_blank'>
            Антон Сененко
          </Button>
        </Box>
        <ThemeModeSwitch useDark={useDark} onChange={themeChanger} />
      </Toolbar>
    </AppBar>
  )
}
