import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { ICarDocument } from '../utils/interfaces'
import carAPI from '../http/carAPI'
import { RepairCarAlbum } from '../components/RepairCarAlbum'
import { HtmlText } from '../components/HtmlText'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { StatsCards } from '../components/StatsCards'

const Zombie = () => {
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<ICarDocument[]>([])
  useEffect(() => {
    carAPI.getAllZombieActiveCar().then((cars) => {
      setCars(cars)
      setLoading(false)
    })
  }, [])
  return (
    <Box>
      <Container sx={{ py: 2 }} maxWidth='lg'>
        <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
          <Box component={'img'} src='/assets/zombie.png' sx={{ mr: 2, height: 80 }} />
          <Typography variant='h2'>зомбіТАЧКИ</Typography>
        </Stack>
        <Typography variant='subtitle1' sx={{ py: 1 }} align='center'>
          Проєкт ремонту і передачі автівок радянського періоду у підрозділи, що здатні з ними
          ладнати.
        </Typography>
        {!loading && <StatsCards cars={cars} />}
        <RepairCarAlbum loading={loading} cars={cars} />
      </Container>
      <HtmlText name={'requisites'} />
    </Box>
  )
}

export default Zombie
