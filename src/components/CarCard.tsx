import * as React from 'react'
import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import { StatusColor } from '../utils/utils'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { CAR_ROUTE } from '../utils/consts'
import { useNavigate } from 'react-router-dom'
import config from '../utils/config'

export const CarCard: FC<{ car: ICarDocument }> = ({ car }) => {
  const navigate = useNavigate()

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component='img'
          className='CarPicture'
          src={car.pictures[0] ? `${config.staticUrl}${car.pictures[0]}` : '/assets/truck.jpg'}
          sx={{ height: '250px' }}
          onClick={() => {
            navigate(CAR_ROUTE.replace(':carId', car.id))
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack direction='row' spacing={1} sx={{ mt: -6 }}>
            <Button
              size='small'
              variant='contained'
              color='primary'
              onClick={() => {
                navigate(CAR_ROUTE.replace(':carId', car.id))
              }}
            >
              Детальніше
            </Button>
          </Stack>
          <Typography gutterBottom variant='h5' component='h2' align={'center'}>
            {car.number} {car.carName || ''} {car.status === CarStatus.death && ' RIP 🎗'}
          </Typography>
          <Typography className='CarInfoAmount'>
            Статус авто:{' '}
            <span
              style={{
                color: StatusColor.get(car.status!),
                fontWeight: 'bolder',
                textAlign: 'right',
              }}
            >
              {car.status}
            </span>
          </Typography>
          <Typography className={'CarInfoAmount'}>
            В/ч:
            <span className={'Amount TextRight'}>{car.militaryBase}</span>
          </Typography>
          <Typography className={'CarInfoAmount'}>
            Марка:
            <span className={'Amount TextRight'}>{car.name}</span>
          </Typography>
          <Typography className={'CarInfoAmount'}>
            {"Ім'я:"}
            <span className={'Amount TextRight'}>{car.carName}</span>
          </Typography>
          <Typography className={'CarInfoAmount'}>
            Ремонт:
            <span className={'Amount TextRight'}>{car.amountRepair || '0'} грн.</span>
          </Typography>
          <Typography className='CarInfoAmount'>
            Шини:
            <span className={'Amount'}>{car.amountTires || '0'} грн.</span>
          </Typography>
          <Typography className='CarInfoAmount'>
            Фарбування:
            <span className={'Amount'}>{car.amountDyeing || '0'} грн.</span>
          </Typography>
          <Typography className='CarInfoAmount'>Колір:</Typography>
          <Typography className={'Amount TextRight'}>{car.color || 'Таємний Мартін'}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
