import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Box from '@mui/material/Box'
import { ICarDocument } from '../utils/interfaces'
import carAPI from '../http/carAPI'
import { RepairCarAlbum } from '../components/RepairCarAlbum'
import { HtmlText } from '../components/HtmlText'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

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
      <Header />
      <Container sx={{ py: 2 }} maxWidth='lg'>
        <Stack direction='row' spacing={2}>
          <Box component={'img'} src='/assets/zombie.png' sx={{ mr: 2, height: 80 }} />
          <Typography variant='h2'>зомбіТАЧКИ</Typography>
        </Stack>
        <RepairCarAlbum loading={loading} cars={cars} />
      </Container>
      <HtmlText name={'requisites'} />
    </Box>
  )
}

export default Zombie
