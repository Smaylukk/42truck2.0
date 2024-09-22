import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { CarType, ICarDocument } from '../utils/interfaces'
import { StatusColor } from '../utils/utils'
import { LazyLoadCarImages } from './LazyLoadCarImages'
import sponsorAPI from '../http/sponsorAPI'

export const RepairCarCard: FC<{ car: ICarDocument }> = ({ car }) => {
  const [sponsor, setSponsor] = useState('')
  useEffect(() => {
    if (car.carType === CarType.zombie && car.sponsors.length) {
      sponsorAPI.getOneSponsor(car.sponsors[0]).then((result) => {
        setSponsor(result.name)
      })
    }
  }, [car])
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
          <Typography className='CarInfoAmount' component='span'>
            Статус авто:{' '}
            <Typography
              component='span'
              style={{
                color: StatusColor.get(car.status!),
                fontWeight: 'bolder',
                textAlign: 'right',
              }}
            >
              {car.status}
            </Typography>
          </Typography>
          <Typography className={'CarInfoAmount'} component='span'>
            В/ч:
            <Typography className={'Amount'} align={'right'} component='span'>
              {car.militaryBase}
            </Typography>
          </Typography>
          {car.carType === CarType.zombie && (
            <Typography className={'CarInfoAmount'} component='span'>
              Донатер:
              <Typography className={'Amount'} align={'right'} component='span'>
                {sponsor}
              </Typography>
            </Typography>
          )}
          <Typography className={'CarInfoAmount'} component='span'>
            Ремонт:
            <Typography className={'Amount'} align={'right'} component='span'>
              {car.amountRepair || '0'} грн.
            </Typography>
          </Typography>
          <Typography className='CarInfoAmount' component='span'>
            Шини:
            <Typography className={'Amount'} align={'right'} component='span'>
              {car.amountTires || '0'} грн.
            </Typography>
          </Typography>
          <Typography className='CarInfoAmount' component='span'>
            <Typography className={'Amount'} align={'right'} component='span'>
              {car.addEquip}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
