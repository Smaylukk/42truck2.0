import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CAR_ROUTE } from '../utils/consts'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface CarNavigationProps {
  currentCarNumber: string
  allCars: { id: string; number: string }[]
}

export const CarNavigation: React.FC<CarNavigationProps> = ({ currentCarNumber, allCars }) => {
  const navigate = useNavigate()

  const currentIndex = allCars.findIndex((car) => car.number === currentCarNumber)

  const prevCar = currentIndex > 0 ? allCars[currentIndex - 1] : null
  const nextCar = currentIndex < allCars.length - 1 ? allCars[currentIndex + 1] : null

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: '0 auto 20px',
        px: { xs: 2, md: 3 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {prevCar ? (
        <Button
          onClick={() => navigate(CAR_ROUTE.replace(':carId', prevCar.id))}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            textTransform: 'none',
            '&:hover': {
              color: 'primary.main',
              borderColor: 'primary.main',
              backgroundColor: 'background.paper',
            },
            transition: '0.2s',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem' }}>{prevCar.number} Попередня</Typography>
        </Button>
      ) : (
        <Box />
      )}

      {nextCar ? (
        <Button
          onClick={() => navigate(CAR_ROUTE.replace(':carId', nextCar.id))}
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            textTransform: 'none',
            '&:hover': {
              color: 'primary.main',
              borderColor: 'primary.main',
              backgroundColor: 'background.paper',
            },
            transition: '0.2s',
          }}
        >
          <Typography sx={{ fontSize: '0.9rem' }}>Наступна {nextCar.number}</Typography>
        </Button>
      ) : (
        <Box /> // Empty placeholder
      )}
    </Box>
  )
}
