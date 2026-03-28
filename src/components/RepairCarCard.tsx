import * as React from 'react'
import { FC, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { CarStatus, CarType, ICarDocument } from '../utils/interfaces'
import { LazyLoadCarImages } from './LazyLoadCarImages'
import sponsorAPI from '../http/sponsorAPI'

export const RepairCarCard: FC<{ car: ICarDocument }> = ({ car }) => {
  const [sponsor, setSponsor] = useState('')

  useEffect(() => {
    if (car.carType === CarType.zombie && car.sponsors.length) {
      sponsorAPI.getOneSponsor(car.sponsors[0]).then((result) => {
        setSponsor(result.name)
      })
    }
  }, [car])

  // Мапінг статусів на українські назви та кольори
  const statusConfig = {
    [CarStatus.find]: { label: 'Пошук', color: '#6B7280' },
    [CarStatus.buy]: { label: 'Знайшли', color: '#EF4444' },
    [CarStatus.transport]: { label: 'Перегон', color: '#39b5dd' },
    [CarStatus.repair]: { label: 'В ремонті', color: '#FFD500' },
    [CarStatus.done]: { label: 'У військах', color: '#10B981' },
    [CarStatus.finish]: { label: 'Завершено', color: '#10B981' },
    [CarStatus.death]: { label: 'Відслужила', color: '#6666cc' },
    [CarStatus.queue]: { label: 'В черзі', color: '#EF4444' },
  }

  const currentStatus = statusConfig[car.status as CarStatus] || {
    label: car.status,
    color: '#6B7280',
  }
  const isRepair = car.status === CarStatus.repair || car.status === CarStatus.queue
  const isDeath = car.status === CarStatus.death

  // Для repair статусу показуємо progress bar
  const totalNeeded = (car.amountRepair || 0) + (car.amountTires || 0) + (car.amountDyeing || 0)
  const progressPercent = isRepair && totalNeeded > 0 ? 50 : 100

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          },
          ...(isDeath && { opacity: 0.8, filter: 'grayscale(100%)' }),
        }}
      >
        {/* Gallery Section with badges */}
        <Box sx={{ position: 'relative' }}>
          <LazyLoadCarImages images={car.pictures} />

          {/* Status Badge - верхній лівий */}
          <Box
            sx={{
              position: 'absolute',
              top: 15,
              left: 15,
              padding: '6px 12px',
              background: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 2px 10px rgba(0,0,0,0.5)'
                  : '0 2px 10px rgba(0,0,0,0.1)',
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: currentStatus.color,
              }}
            />
            {currentStatus.label}
          </Box>

          {/* Unit Badge - правий нижній */}
          {car.militaryBase && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 15,
                right: 15,
                background: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)',
                color: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'white'),
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                zIndex: 10,
              }}
            >
              {car.militaryBase}
            </Box>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
          {/* Title */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              mb: 0.5,
              fontSize: '1.25rem',
            }}
          >
            {car.carName || ''} {isDeath && ' 🎗️'}
          </Typography>

          {/* Model */}
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.9rem',
              mb: 2,
            }}
          >
            {car.name}
          </Typography>

          {/* Specs Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1.5,
              mb: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
              padding: 1.5,
              borderRadius: '8px',
            }}
          >
            <Box>
              <Typography
                sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase' }}
              >
                Ремонт
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'success.main' }}>
                {car.amountRepair || 0} ₴
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase' }}
              >
                Шини
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {car.amountTires || 0} ₴
              </Typography>
            </Box>

            {/* Додаткове обладнання */}
            {car.addEquip && (
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography
                  sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase' }}
                >
                  Обладнання
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{car.addEquip}</Typography>
              </Box>
            )}

            {/* Спонсор для zombie */}
            {car.carType === CarType.zombie && sponsor && (
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Typography
                  sx={{ fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase' }}
                >
                  Донатер
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'primary.main' }}>
                  {sponsor}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Progress Bar для repair/queue */}
          {isRepair && (
            <Box sx={{ mb: 0, mt: 'auto' }}>
              <Box
                sx={{
                  height: 6,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#E5E7EB',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    backgroundColor: '#FFD500',
                    width: `${progressPercent}%`,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}
