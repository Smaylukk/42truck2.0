import React, { FC, Fragment, useEffect, useState } from 'react'
import { Fade } from '@mui/material'
import Grid from '@mui/material/Grid'
import { CarCard } from './CarCard'
import Container from '@mui/material/Container'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import Box from '@mui/material/Box'
import { FilterChips } from './FilterChips'

export const CarAlbum: FC<{
  loading: boolean
  cars: ICarDocument[]
}> = ({ loading, cars }) => {
  const [statusFilter, setStatusFilter] = useState(0)

  const [fadeLoader, setFadeLoader] = useState(true)
  const [filterCar, setFilterCar] = useState<ICarDocument[]>([])

  const handleFilterChange = (filter: number) => {
    setStatusFilter(filter)
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
  }, [statusFilter, cars])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeLoader((prev) => !prev)
    }, 500)
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Fade in={fadeLoader}>
          <Box component={'img'} src='/assets/42.png' sx={{ m: 2, height: 40 }} />
        </Fade>
      </Box>
    )
  }

  return (
    <Fragment>
      <FilterChips cars={cars} statusFilter={statusFilter} onFilterChange={handleFilterChange} />
      <Container sx={{ py: 2, px: { xs: 2, sm: 3 } }} maxWidth='lg'>
        <Grid container spacing={3}>
          {filterCar.map((car) => (
            <CarCard key={car.number} car={car} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  )
}
