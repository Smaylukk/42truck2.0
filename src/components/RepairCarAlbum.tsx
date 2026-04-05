import React, { FC, Fragment, useEffect, useState } from 'react'
import { Fade, Box, Grid, Chip } from '@mui/material'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import { RepairCarCard } from './RepairCarCard'

export const RepairCarAlbum: FC<{
  loading: boolean
  cars: ICarDocument[]
}> = ({ loading, cars }) => {
  const [statusFilter, setStatusFilter] = useState(0)
  const [fadeLoader, setFadeLoader] = useState(true)
  const [filterCar, setFilterCar] = useState<ICarDocument[]>([])

  // Підрахунок кількості авто для кожного статусу
  const getCountByStatus = (status: CarStatus | null) => {
    if (status === null) return cars.length
    return cars.filter((car) => car.status === status).length
  }

  const filters = [
    { id: 0, label: 'Всі', count: getCountByStatus(null) },
    { id: 1, label: 'В черзі', count: getCountByStatus(CarStatus.queue), status: CarStatus.queue },
    {
      id: 2,
      label: 'В ремонті',
      count: getCountByStatus(CarStatus.repair),
      status: CarStatus.repair,
    },
    {
      id: 3,
      label: 'Завершено',
      count: getCountByStatus(CarStatus.finish),
      status: CarStatus.finish,
    },
  ]

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
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          overflowX: 'auto',
          pb: 1.5,
          pt: 2,
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: 10,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 10,
            '&:hover': {
              backgroundColor: '#555',
            },
          },
        }}
      >
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            label={`${filter.label} (${filter.count})`}
            onClick={() => setStatusFilter(filter.id)}
            sx={{
              padding: '8px 16px',
              height: 'auto',
              borderRadius: '20px',
              fontWeight: 600,
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s',
              ...(statusFilter === filter.id
                ? {
                    backgroundColor: 'text.primary',
                    color: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'text.primary',
                    },
                  }
                : {
                    backgroundColor: 'background.paper',
                    color: 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    },
                  }),
            }}
          />
        ))}
      </Box>
      <Grid container spacing={2}>
        {filterCar.map((car) => (
          <RepairCarCard key={car.id} car={car} />
        ))}
      </Grid>
    </Fragment>
  )
}
