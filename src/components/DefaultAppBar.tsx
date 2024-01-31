import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import ThemeModeSwitch from '../components/ThemeModeSwitch'
import { NavLink, useNavigate } from 'react-router-dom'
import { IAppBarProps, IThemeProps } from '../utils/interfaces'
import Button from '@mui/material/Button'
import TelegramIcon from '@mui/icons-material/Telegram'
import FacebookIcon from '@mui/icons-material/Facebook'

export const DefaultAppBar: React.FC<IThemeProps & IAppBarProps> = ({
  themeChanger,
  useDark,
  isAuth,
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const navigate = useNavigate()
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Box sx={{ flexGrow: 0, display: 'flex' }}>
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
              display: 'block',
            }}
          >
            <MenuItem>
              <Button
                variant='contained'
                onClick={() => {
                  navigate('/repair')
                  handleCloseNavMenu()
                }}
                fullWidth
              >
                реабіліТАЧКИ
              </Button>
            </MenuItem>

            <MenuItem>
              <Button
                variant='contained'
                onClick={() => {
                  navigate('/sponsorList')
                  handleCloseNavMenu()
                }}
                fullWidth
              >
                Спонсори
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                variant='contained'
                onClick={() => {
                  navigate('/requisites')
                  handleCloseNavMenu()
                }}
                fullWidth
              >
                Реквізити
              </Button>
            </MenuItem>
            {isAuth && (
              <MenuItem>
                <Button
                  variant='contained'
                  onClick={() => {
                    navigate('/admin')
                    handleCloseNavMenu()
                  }}
                  fullWidth
                >
                  Адмінка
                </Button>
              </MenuItem>
            )}
            <MenuItem>
              <Button
                variant='contained'
                href='https://t.me/mouselab'
                target='_blank'
                startIcon={<TelegramIcon />}
                fullWidth
              >
                Антон Сененко
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                variant='contained'
                href='https://www.facebook.com/senenkoanton'
                target='_blank'
                startIcon={<FacebookIcon />}
                fullWidth
              >
                Антон Сененко
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                variant='contained'
                href='https://t.me/martin_brest_pehota'
                target='_blank'
                startIcon={<TelegramIcon />}
                fullWidth
              >
                Мартін Брест
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                variant='contained'
                href='https://www.facebook.com/profile.php?id=100006448650648'
                target='_blank'
                startIcon={<FacebookIcon />}
                fullWidth
              >
                Мартін Брест
              </Button>
            </MenuItem>
          </Menu>
        </Box>
        <Box
          component={'img'}
          src='/assets/42.png'
          sx={{ mr: 2, height: 40, display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
        />
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          sx={{
            flexGrow: { xs: 1, lg: 0 },
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
        <Box
          sx={{
            flexGrow: 5,
            display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', gridGap: 20 },
            ml: 5,
          }}
        >
          <NavLink to={'/repair'}>
            <Button variant='contained'>реабіліТАЧКИ</Button>
          </NavLink>

          <NavLink to={'/sponsorList'}>
            <Button variant='contained'>Спонсори</Button>
          </NavLink>
          <NavLink to={'/requisites'}>
            <Button variant='contained'>Реквізити</Button>
          </NavLink>
          {isAuth && (
            <NavLink to={'/admin'}>
              <Button variant='contained'>Адмінка</Button>
            </NavLink>
          )}
        </Box>
        <ThemeModeSwitch useDark={useDark} onChange={themeChanger} />
      </Toolbar>
    </AppBar>
  )
}
