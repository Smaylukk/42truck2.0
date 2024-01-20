import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import Box from '@mui/material/Box'
import { ICarDocument } from '../utils/interfaces'
import carAPI from '../http/carAPI'
import { RepairCarAlbum } from '../components/RepairCarAlbum'

const Repair = () => {
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<ICarDocument[]>([])
  useEffect(() => {
    carAPI.getAllActiveCar(true).then((cars) => {
      setCars(cars)
      setLoading(false)
    })
  }, [])
  return (
    <Box>
      <Header />
      <RepairCarAlbum loading={loading} cars={cars} />
      <Footer />
    </Box>
  )
}

export default Repair
