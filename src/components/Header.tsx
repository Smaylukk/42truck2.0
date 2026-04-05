import Box from '@mui/material/Box'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, AppBar, Toolbar, Container } from '@mui/material'
import { HOME_ROUTE, REQUISITES_ROUTE, REPAIR_ROUTE, GRATITUDE_ROUTE } from '../utils/consts'

export const Header = () => {
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
          <Link
            to={HOME_ROUTE}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Box
              component='img'
              src='/assets/42.png'
              alt='42 Trucks'
              sx={{ height: 40, width: 40 }}
            />
            <Typography
              variant='h6'
              sx={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                color: 'text.primary',
                fontSize: '1.5rem',
              }}
            >
              42<span style={{ color: '#005BBB' }}>TRUCKS</span>
            </Typography>
          </Link>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
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
                Ремонт
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

          <Button
            component={Link}
            to={REQUISITES_ROUTE}
            variant='contained'
            sx={{
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
            Підтримати ЗСУ
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
