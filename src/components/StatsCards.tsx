import React from 'react'
import { Box, Card, CardContent, Typography, Grid } from '@mui/material'
import { ICarDocument } from '../utils/interfaces'

interface StatsCardsProps {
  cars: ICarDocument[]
}

export const StatsCards: React.FC<StatsCardsProps> = ({ cars }) => {
  // Підрахунок статистики
  const totalCars = cars.length

  // Підрахунок зібраних коштів (сума всіх витрат: ремонт + шини + фарбування)
  const totalAmount = cars.reduce((sum, car) => {
    const repair = car.amountRepair || 0
    const tires = car.amountTires || 0
    const dyeing = car.amountDyeing || 0
    return sum + repair + tires + dyeing
  }, 0)

  // Підрахунок кількості унікальних військових частин
  const uniqueBases = new Set(cars.filter((car) => car.militaryBase).map((car) => car.militaryBase))
    .size

  // Форматування суми в гривнях
  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `₴ ${(amount / 1000000).toFixed(1)}M`
    }
    return `₴ ${(amount / 1000).toFixed(0)}K`
  }

  const stats = [
    {
      value: totalCars,
      label: 'Автомобілів передано',
    },
    {
      value: formatAmount(totalAmount),
      label: 'Витрачено на ремонт',
    },
    {
      value: uniqueBases,
      label: 'Бригад забезпечено',
    },
  ]

  return (
    <Box sx={{ maxWidth: 1200, margin: '10px auto', px: { xs: 2, md: 3 } }}>
      <Grid container spacing={2.5}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                textAlign: 'center',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ py: 3 }}>
                <Typography
                  sx={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '2.5rem',
                    color: 'primary.main',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
