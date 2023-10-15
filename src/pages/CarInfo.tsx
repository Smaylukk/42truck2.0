import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { CarStatus } from '../utils/interfaces'
import { StatusColor } from '../utils/utils'
import { useParams } from 'react-router-dom'
import carAPI from '../http/carAPI'
import config from '../utils/config'
import SponsorCard from '../components/SponsorCard'

export const CarInfo = () => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [militaryBase, setMilitaryBase] = useState('')
  const [carName, setCarName] = useState('')
  const [status, setStatus] = useState<CarStatus>(CarStatus.find)
  const [addEquip, setAddEquip] = useState('')
  const [amountDyeing, setAmountDyeing] = useState(0)
  const [amountTires, setAmountTires] = useState(0)
  const [amountRepair, setAmountRepair] = useState(0)
  const [sponsors, setSponsors] = useState<string[]>([])
  const [pictures, setPictures] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const { carId } = useParams()

  useEffect(() => {
    if (carId) {
      carAPI.getOneCar(carId).then((data) => {
        setName(data.name)
        setMilitaryBase(data.militaryBase || '')
        setNumber(data.number)
        setCarName(data.carName)
        setStatus(data.status)
        setAddEquip(data.addEquip)
        setAmountDyeing(data.amountDyeing)
        setAmountTires(data.amountTires)
        setAmountRepair(data.amountRepair)
        setSponsors(data.sponsors)
        setPictures(data.pictures)
        setDescription(data.description)
      })
    }
  }, [carId])
  return (
    <Grid
      container
      sx={{
        mt: 8,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%',
      }}
    >
      <Grid
        item
        xs={12}
        gap={2}
        sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {pictures.map((picture, index) => (
          <img
            key={index}
            alt={'car picture'}
            src={config.staticUrl + picture || config.url + '/assets/truck.jpg'}
            style={{ height: '250px', margin: '0px 4px' }}
          />
        ))}
        {/*</Stack>*/}
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent sx={{ flexGrow: 1 }}>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h5' align={'center'}>
                  {number} {carName || ''}
                </Typography>
                <Typography className='CarInfoAmount' variant='h5'>
                  Статус авто:{' '}
                  <span
                    style={{
                      color: StatusColor.get(status),
                      fontWeight: 'bolder',
                      textAlign: 'right',
                    }}
                  >
                    {status}
                  </span>
                </Typography>
                <Typography className={'CarInfoAmount'} variant='h5'>
                  Військова частина:
                  <Typography className={'Amount'} align={'right'} variant='h5'>
                    {militaryBase}
                  </Typography>
                </Typography>
                <Typography className={'CarInfoAmount'} variant='h5'>
                  Марка:
                  <Typography className={'Amount'} align={'right'} variant='h5'>
                    {name}
                  </Typography>
                </Typography>
                <Typography className={'CarInfoAmount'} variant='h5'>
                  {"Ім'я:"}
                  <Typography className={'Amount'} align={'right'} variant='h5'>
                    {carName}
                  </Typography>
                </Typography>
                <Typography className={'CarInfoAmount'} variant='h5'>
                  Ремонт:
                  <Typography className={'Amount'} align={'right'} variant='h5'>
                    {amountRepair || '0'} грн.
                  </Typography>
                </Typography>
                <Typography className='CarInfoAmount' variant='h5'>
                  Шини:
                  <span className={'Amount'}>{amountTires || '0'} грн.</span>
                </Typography>
                <Typography className='CarInfoAmount' variant='h5'>
                  Фарбування:
                  <span className={'Amount'}>{amountDyeing || '0'} грн.</span>
                </Typography>
                <Typography variant='h5'>Додаткове обладнання:</Typography>
                <Typography
                  className={'CarInfoValue'}
                  variant='h5'
                  style={{
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {addEquip}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={5}>
                <Typography variant='h5'> Історія:</Typography>
                <Typography
                  className={'CarInfoValue'}
                  variant={'h6'}
                  style={{
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={5}>
                <Typography variant='h5'> Спонсори:</Typography>
              </Grid>
              {sponsors.map((el, index) => {
                return <SponsorCard sponsorId={el} key={index} />
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
