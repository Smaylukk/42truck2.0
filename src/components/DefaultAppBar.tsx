import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import AppBar from '@mui/material/AppBar'
import { Container, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import ThemeModeSwitch from '../components/ThemeModeSwitch'
import { Link, useNavigate } from 'react-router-dom'
import { IAppBarProps, IThemeProps } from '../utils/interfaces'
import Button from '@mui/material/Button'
import TelegramIcon from '@mui/icons-material/Telegram'
import FacebookIcon from '@mui/icons-material/Facebook'
import {
  ADMIN_ROUTE,
  GRATITUDE_ROUTE,
  HOME_ROUTE,
  REPAIR_ROUTE,
  REQUISITES_ROUTE,
  SPONSOR_LIST_ROUTE,
  THANK_COMMUNITY_ROUTE,
  ZOMBIE_ROUTE,
} from '../utils/consts'

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
    <AppBar
      position='sticky'
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        color: 'text.primary',
      }}
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            to={HOME_ROUTE}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Box
              component='img'
              src='/assets/42.png'
              alt='42 Trucks'
              sx={{ height: 40, width: 60 }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            <Link to={HOME_ROUTE} style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '&:hover': { color: 'primary.main' },
                  transition: '0.3s',
                }}
              >
                Автопарк
              </Typography>
            </Link>
            <Link to={REPAIR_ROUTE} style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '&:hover': { color: 'primary.main' },
                  transition: '0.3s',
                }}
              >
                реабіліТАЧКИ
              </Typography>
            </Link>
            <Link to={ZOMBIE_ROUTE} style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '&:hover': { color: 'primary.main' },
                  transition: '0.3s',
                }}
              >
                зомбіТАЧКИ
              </Typography>
            </Link>
            <Link to={GRATITUDE_ROUTE} style={{ textDecoration: 'none' }}>
              <Typography
                sx={{
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '&:hover': { color: 'primary.main' },
                  transition: '0.3s',
                }}
              >
                Подяки
              </Typography>
            </Link>
          </Box>

          {/* Right side: CTA + Theme Switcher + Mobile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* CTA Button - only desktop */}
            <Button
              component={Link}
              to={REQUISITES_ROUTE}
              variant='contained'
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                backgroundColor: 'primary.main',
                color: 'white',
                borderRadius: '50px',
                padding: '10px 24px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-1px)',
                },
                transition: '0.3s',
              }}
            >
              Підтримати проєкт
            </Button>

            {/* Theme Switcher */}
            <ThemeModeSwitch useDark={useDark} onChange={themeChanger} />

            {/* Mobile Menu Button */}
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              sx={{ display: 'flex' }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem
                onClick={() => {
                  navigate(HOME_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>Автопарк</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(REPAIR_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>реабіліТАЧКИ</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(ZOMBIE_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>зомбіТАЧКИ</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(SPONSOR_LIST_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>Спонсори</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(REQUISITES_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>Реквізити</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(GRATITUDE_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>Подяки від ЗСУ</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(THANK_COMMUNITY_ROUTE)
                  handleCloseNavMenu()
                }}
              >
                <Typography>Подяки спільноті</Typography>
              </MenuItem>
              {isAuth && (
                <MenuItem
                  onClick={() => {
                    navigate(ADMIN_ROUTE)
                    handleCloseNavMenu()
                  }}
                >
                  <Typography>Адмінка</Typography>
                </MenuItem>
              )}
              <MenuItem>
                <Button
                  href='https://t.me/mouselab'
                  target='_blank'
                  startIcon={<TelegramIcon />}
                  fullWidth
                  size='small'
                >
                  Антон Сененко
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  href='https://www.facebook.com/senenkoanton'
                  target='_blank'
                  startIcon={<FacebookIcon />}
                  fullWidth
                  size='small'
                >
                  Антон Сененко (FB)
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  href='https://t.me/martin_brest_pehota'
                  target='_blank'
                  startIcon={<TelegramIcon />}
                  fullWidth
                  size='small'
                >
                  Мартін Брест
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  href='https://www.facebook.com/profile.php?id=100006448650648'
                  target='_blank'
                  startIcon={<FacebookIcon />}
                  fullWidth
                  size='small'
                >
                  Мартін Брест (FB)
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
