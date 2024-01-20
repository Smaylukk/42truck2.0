import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { CarColor, CarStatus, IPrevNextCar } from '../utils/interfaces'
import { StatusColor } from '../utils/utils'
import { useNavigate, useParams } from 'react-router-dom'
import carAPI from '../http/carAPI'
import config from '../utils/config'
import SponsorCard from '../components/SponsorCard'
import LightGallery from 'lightgallery/react'
// import styles
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
// plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import Button from '@mui/material/Button'
import { CAR_ROUTE } from '../utils/consts'
import Stack from '@mui/material/Stack'

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
  const [color, setColor] = useState<CarColor>(CarColor.not)
  const [sponsors, setSponsors] = useState<string[]>([])
  const [pictures, setPictures] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [prevCar, setPrevCar] = useState<IPrevNextCar>({} as IPrevNextCar)
  const [nextCar, setNextCar] = useState<IPrevNextCar>({} as IPrevNextCar)
  const { carId } = useParams()
  const navigate = useNavigate()

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
        setColor(data.color)
      })

      carAPI.getPrevCar(carId).then((prevCar) => {
        if (prevCar) {
          setPrevCar(prevCar)
        }
      })

      carAPI.getNextCar(carId).then((nextCar) => {
        if (nextCar) {
          setNextCar(nextCar)
        }
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
        md={10}
        lg={8}
        sx={{
          m: 2,
        }}
      >
        <LightGallery
          allowMediaOverlap
          toggleThumb
          closable
          showZoomInOutIcons
          plugins={[lgThumbnail, lgZoom]}
        >
          {pictures.map((picture, index) => (
            <a
              key={index}
              href={`${config.staticUrl}${picture}` || `${config.url}/assets/truck.jpg`}
            >
              <img
                alt={name}
                src={`${config.thumbUrl}${picture}?dim=150x150` || `${config.url}/assets/truck.jpg`}
                style={{ height: '150px', margin: '0px 4px' }}
              />
            </a>
          ))}
        </LightGallery>
      </Grid>
      <Grid item xs={12} md={10} lg={8}>
        <Stack direction='row' spacing={1} justifyContent='space-between' sx={{ mt: 1, mb: 1 }}>
          <Button
            size='medium'
            variant='outlined'
            disabled={!prevCar.id}
            onClick={() => {
              navigate(CAR_ROUTE.replace(':carId', prevCar.id))
            }}
          >
            Попередня тачка {prevCar.id ? `(${prevCar.number})` : ''}
          </Button>
          <Button
            size='medium'
            variant='outlined'
            disabled={!nextCar.id}
            onClick={() => {
              navigate(CAR_ROUTE.replace(':carId', nextCar.id))
            }}
          >
            Наступна тачка {nextCar.id ? `(${nextCar.number})` : ''}
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} md={10} lg={8}>
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
                  <Typography className={'Amount'} variant='h5'>
                    {amountTires || '0'} грн.
                  </Typography>
                </Typography>
                <Typography className='CarInfoAmount' variant='h5'>
                  Фарбування:
                  <Typography className={'Amount'} variant='h5'>
                    {amountDyeing || '0'} грн.
                  </Typography>
                </Typography>
                <Typography className='CarInfoAmount' variant='h5'>
                  Колір:
                  <Typography className={'Amount'} variant='h5'>
                    {color || 'Таємний Мартін'}
                  </Typography>
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
              {description && (
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
              )}
              {sponsors.length > 0 && (
                <Grid container xs={12} mt={5} spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant='h5'> Спонсори:</Typography>
                  </Grid>
                  {sponsors.map((el) => (
                    <Grid key={el} item xs={12} sm={6} md={4}>
                      <SponsorCard sponsorId={el} showCars={false} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
