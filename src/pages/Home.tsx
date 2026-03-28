import React, { useEffect, useState } from 'react'
import { CarAlbum } from '../components/CarAlbum'
import { StatsCards } from '../components/StatsCards'
import Box from '@mui/material/Box'
import { ICarDocument } from '../utils/interfaces'
import carAPI from '../http/carAPI'
import { HtmlText } from '../components/HtmlText'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<ICarDocument[]>([])
  useEffect(() => {
    carAPI.getAllActiveCar().then((cars) => {
      setCars(cars)
      setLoading(false)
    })
  }, [])
  return (
    <Box>
      {!loading && <StatsCards cars={cars} />}
      <CarAlbum loading={loading} cars={cars} />
      <HtmlText name={'requisites'} />
    </Box>
  )
}

export default Home
