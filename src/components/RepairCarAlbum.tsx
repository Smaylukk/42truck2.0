import React, { FC, Fragment, useEffect, useState } from 'react'
import { Fade, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import Box from '@mui/material/Box'
import { RepairCarCard } from './RepairCarCard'

export const RepairCarAlbum: FC<{
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
            (statusFilter === 1 && value.status === CarStatus.queue) ||
            (statusFilter === 2 && value.status === CarStatus.repair) ||
            (statusFilter === 3 && value.status === CarStatus.finish)
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
      <Container sx={{ py: 2 }} maxWidth='lg'>
        <h1>реабіліТАЧКИ</h1>
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
            <MenuItem value={1}>{CarStatus.queue}</MenuItem>
            <MenuItem value={2}>{CarStatus.repair}</MenuItem>
            <MenuItem value={3}>{CarStatus.finish}</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          {filterCar.map((car) => (
            <RepairCarCard key={car.number} car={car} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  )
}
