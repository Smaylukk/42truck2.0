import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { ICarDocument } from '../utils/interfaces'
import { StatusColor } from '../utils/utils'
import { LazyLoadCarImages } from './LazyLoadCarImages'

export const RepairCarCard: FC<{ car: ICarDocument }> = ({ car }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        className={'iconContainer'}
      >
        <LazyLoadCarImages images={car.pictures} />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant='h5' component='h2' align={'center'}>
            {car.name || ''}
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
            <Typography className={'Amount'} align={'right'}>
              {car.militaryBase}
            </Typography>
          </Typography>
          <Typography className={'CarInfoAmount'}>
            Ремонт:
            <Typography className={'Amount'} align={'right'}>
              {car.amountRepair || '0'} грн.
            </Typography>
          </Typography>
          <Typography className='CarInfoAmount'>
            Шини:
            <Typography className={'Amount'} align={'right'}>
              {car.amountTires || '0'} грн.
            </Typography>
          </Typography>
          <Typography className='CarInfoAmount'>
            <Typography className={'Amount'} align={'right'}>
              {car.addEquip}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
