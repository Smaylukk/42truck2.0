import React, { FC, Fragment, useEffect, useState } from 'react'
import { Fade, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Grid from '@mui/material/Grid'
import { CarCard } from './CarCard'
import Container from '@mui/material/Container'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import Box from '@mui/material/Box'
import { ChartCars } from './ChartCars'

export const CarAlbum: FC<{
  loading: boolean
  cars: ICarDocument[]
}> = ({ loading, cars }) => {
  const [statusFilter, setStatusFilter] = useState(0)

  const [fadeLoader, setFadeLoader] = useState(true)
  const [filterCar, setFilterCar] = useState<ICarDocument[]>([])
  const handleChange = (event: SelectChangeEvent<number>) => {
    setStatusFilter(event.target.value as number)
  }

  useEffect(() => {
    setFilterCar(cars)
  }, [cars])
  useEffect(() => {
    if (statusFilter === 0) {
      setFilterCar(cars)
    } else {
      setFilterCar(
        cars.filter((value) => {
          return (
            (statusFilter === 1 && value.status === CarStatus.find) ||
            (statusFilter === 2 && value.status === CarStatus.buy) ||
            (statusFilter === 3 && value.status === CarStatus.transport) ||
            (statusFilter === 4 && value.status === CarStatus.repair) ||
            (statusFilter === 5 && value.status === CarStatus.done) ||
            (statusFilter === 6 && value.status === CarStatus.death)
          )
        }),
      )
    }
  }, [statusFilter])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeLoader((prev) => !prev)
    }, 500)
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Fade in={fadeLoader}>
          <Box component={'img'} src='/assets/42.png' sx={{ m: 2, height: 40 }} />
        </Fade>
      </Box>
    )
  }

  return (
    <Fragment>
      <ChartCars cars={cars} />
      <Container sx={{ py: 2 }} maxWidth='lg'>
        <FormControl fullWidth sx={{ py: 2 }}>
          <InputLabel id='status-select-label'>Показати зі статусом</InputLabel>
          <Select
            labelId='status-select-label'
            id='status-select'
            value={statusFilter}
            label='Age'
            onChange={handleChange}
          >
            <MenuItem value={0}>Всі</MenuItem>
            <MenuItem value={1}>{CarStatus.find}</MenuItem>
            <MenuItem value={2}>{CarStatus.buy}</MenuItem>
            <MenuItem value={3}>{CarStatus.transport}</MenuItem>
            <MenuItem value={4}>{CarStatus.repair}</MenuItem>
            <MenuItem value={5}>{CarStatus.done}</MenuItem>
            <MenuItem value={6}>{CarStatus.death}</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          {filterCar.map((car) => (
            <CarCard key={car.number} car={car} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  )
}
