import React, { useCallback } from 'react'
import { Box, Chip } from '@mui/material'
import { CarStatus, ICarDocument } from '../utils/interfaces'

interface FilterChipsProps {
  cars: ICarDocument[]
  statusFilter: number
  onFilterChange: (filter: number) => void
}

export const FilterChips: React.FC<FilterChipsProps> = ({ cars, statusFilter, onFilterChange }) => {
  const getCountByStatus = useCallback(
    (status: CarStatus | null) => {
      if (status === null) return cars.length
      return cars.filter((car) => car.status === status).length
    },
    [cars],
  )

  const filters = [
    { id: 0, label: 'Всі авто', count: getCountByStatus(null) },
    { id: 5, label: 'У військах', count: getCountByStatus(CarStatus.done), status: CarStatus.done },
    {
      id: 4,
      label: 'В ремонті',
      count: getCountByStatus(CarStatus.repair),
      status: CarStatus.repair,
    },
    { id: 1, label: 'Пошук', count: getCountByStatus(CarStatus.find), status: CarStatus.find },
    { id: 2, label: 'Знайшли', count: getCountByStatus(CarStatus.buy), status: CarStatus.buy },
    {
      id: 3,
      label: 'Перегон',
      count: getCountByStatus(CarStatus.transport),
      status: CarStatus.transport,
    },
    {
      id: 6,
      label: 'Відслужила',
      count: getCountByStatus(CarStatus.death),
      status: CarStatus.death,
    },
  ]

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: '0 auto 10px',
        px: { xs: 2, md: 3 },
        display: 'flex',
        gap: 1.5,
        overflowX: 'auto',
        pb: 1,
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
      {filters
        .filter((value) => value.count > 0)
        .map((filter) => (
          <Chip
            key={filter.id}
            label={`${filter.label} (${filter.count})`}
            onClick={() => onFilterChange(filter.id)}
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
  )
}
