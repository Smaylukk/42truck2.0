import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CarAlbum } from '../components/CarAlbum'
import Box from '@mui/material/Box'
import { ICar } from '../utils/interfaces'
import carAPI from '../http/carAPI'
import config from '../utils/config'

const Home = () => {
  const [cars, setCars] = useState<ICar[]>([])
  useEffect(() => {
    carAPI.getAllActiveCar().then((cars) => {
      const carList = cars.map((car) => {
        const newCar = {} as ICar
        Object.assign(newCar, car)
        if (car.pictures.length) {
          newCar.picture = config.staticUrl + car.pictures[0]
        }

        return newCar
      })
      setCars(carList)
    })
  }, [])
  return (
    <Box>
      <Header />
      <CarAlbum loading={false} cars={cars} />
      <Footer />
    </Box>
  )
}

export default Home
