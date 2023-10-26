import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import sponsorAPI from '../http/sponsorAPI'
import config from '../utils/config'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import { IShortCar } from '../utils/interfaces'
import { CAR_ROUTE } from '../utils/consts'

interface IPropsCardSponsor {
  sponsorId: string
  showCars: boolean
}

export const SponsorCard: React.FC<IPropsCardSponsor> = ({ sponsorId, showCars }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [cars, setCars] = useState<IShortCar[]>([])

  useEffect(() => {
    if (sponsorId) {
      sponsorAPI.getOneSponsor(sponsorId).then((data) => {
        setName(data.name)
        setDescription(data.description)
        setUrl(data.url)
        setImageUrl(data.picture)
        setCars(data.cars)
      })
    }
  }, [sponsorId])

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardHeader title={name} />
      <CardMedia
        component='img'
        image={imageUrl ? `${config.staticUrl}${imageUrl}` : '/assets/sponsor.png'}
        alt='sponsor'
        style={{ blockSize: 'fit-content', width: 150, height: 150, marginLeft: 10 }}
      />
      <CardContent>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {description}
        </Typography>
        {url && (
          <Button
            component={Link}
            to={url}
            target='_blank'
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
          >
            Детальніша інформація
          </Button>
        )}
        {showCars && (
          <Box sx={{ mt: 1 }}>
            <Typography
              variant='h6'
              color='text.secondary'
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              Дуже допомогли з:
            </Typography>
            {cars.map((car) => {
              return (
                <Button
                  key={car.id}
                  component={Link}
                  to={CAR_ROUTE.replace(':carId', car.id)}
                  target='_blank'
                  variant='outlined'
                  color='info'
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  {car.number} - {car.name} {car.carName ? `(${car.carName})` : ''}
                </Button>
              )
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default SponsorCard
