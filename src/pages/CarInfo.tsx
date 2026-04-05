import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import { useParams } from 'react-router-dom'
import carAPI from '../http/carAPI'
import config from '../utils/config'
import SponsorCard from '../components/SponsorCard'
import { CarNavigation } from '../components/CarNavigation'

export const CarInfo = () => {
  const [car, setCar] = useState<ICarDocument | null>(null)
  const [allCars, setAllCars] = useState<{ id: string; number: string }[]>([])
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const { carId } = useParams()

  useEffect(() => {
    if (carId) {
      carAPI.getOneCar(carId).then((data) => {
        setCar(data)
      })

      carAPI.getAllActiveCar().then((cars) => {
        setAllCars(cars.map((c) => ({ id: c.id, number: c.number })))
      })
    }
  }, [carId])

  if (!car) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <Typography>Завантаження...</Typography>
        </Box>
      </Box>
    )
  }

  const statusConfig = {
    [CarStatus.find]: { label: 'Пошук', color: '#6B7280', bgColor: '#F3F4F6' },
    [CarStatus.buy]: { label: 'Знайшли', color: '#EF4444', bgColor: '#FEE2E2' },
    [CarStatus.transport]: { label: 'Перегон', color: '#39b5dd', bgColor: '#E0F2FE' },
    [CarStatus.repair]: { label: 'В ремонті', color: '#F59E0B', bgColor: '#FEF3C7' },
    [CarStatus.done]: { label: 'У військах', color: '#10B981', bgColor: '#ECFDF5' },
    [CarStatus.finish]: { label: 'Завершено', color: '#10B981', bgColor: '#ECFDF5' },
    [CarStatus.death]: { label: 'Відслужила', color: '#6666cc', bgColor: '#EDE9FE' },
    [CarStatus.queue]: { label: 'В черзі', color: '#EF4444', bgColor: '#FEE2E2' },
  }

  const currentStatus = statusConfig[car.status as CarStatus] || {
    label: car.status,
    color: '#6B7280',
    bgColor: '#F3F4F6',
  }
  const totalCost = (car.amountRepair || 0) + (car.amountTires || 0) + (car.amountDyeing || 0)

  return (
    <Box>
      {allCars.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <CarNavigation currentCarNumber={car.number} allCars={allCars} />
        </Box>
      )}

      <Box
        sx={{
          maxWidth: 1200,
          margin: '0 auto',
          px: { xs: 2, md: 3 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr' },
          gap: 5,
          alignItems: 'start',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box
            component='img'
            src={
              `${config.staticUrl}${car.pictures[activePhotoIndex]}` ||
              `${config.url}/assets/truck.jpg`
            }
            alt={car.name}
            sx={{
              width: '100%',
              height: 450,
              objectFit: 'cover',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
              cursor: 'pointer',
              display: { xs: 'none', sm: 'block' },
            }}
          />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
              gap: 1.5,
            }}
          >
            {car.pictures.map((picture, index) => (
              <Box
                key={index}
                component='img'
                src={`${config.thumbUrl}${picture}?dim=150x150` || `${config.url}/assets/truck.jpg`}
                alt={`${car.name} ${index + 1}`}
                onClick={() => setActivePhotoIndex(index)}
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: 'cover',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  opacity: activePhotoIndex === index ? 1 : 0.7,
                  border: activePhotoIndex === index ? '2px solid' : '2px solid transparent',
                  borderColor: 'primary.main',
                  transition: 'all 0.2s',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            position: { md: 'sticky' },
            top: { md: 20 },
          }}
        >
          <Card
            sx={{
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: currentStatus.bgColor,
                  color: currentStatus.color,
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    backgroundColor: currentStatus.color,
                    borderRadius: '50%',
                  }}
                />
                {currentStatus.label}
              </Box>

              <Typography
                variant='h3'
                sx={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  mb: 0.5,
                }}
              >
                {car.number} {car.carName || ''}
                {car.status === CarStatus.death && ' 🎗️'}
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  mb: 3,
                  pb: 3,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {car.name}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 2.5,
                  mb: 4,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      mb: 0.5,
                    }}
                  >
                    Військова частина
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    {car.militaryBase || '—'}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      mb: 0.5,
                    }}
                  >
                    Колір
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                    }}
                  >
                    {car.color || 'Таємний Мартін'}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
                  borderRadius: '12px',
                  padding: 2.5,
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.25 }}>
                  <Typography sx={{ fontSize: '0.95rem' }}>Ремонт:</Typography>
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    {car.amountRepair || 0} грн
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.25 }}>
                  <Typography sx={{ fontSize: '0.95rem' }}>Шини:</Typography>
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    {car.amountTires || 0} грн
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.25 }}>
                  <Typography sx={{ fontSize: '0.95rem' }}>Фарбування:</Typography>
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 600 }}>
                    {car.amountDyeing || 0} грн
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: 1.25,
                    mt: 1.25,
                    borderTop: (theme) =>
                      `1px solid ${
                        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#E5E7EB'
                      }`,
                  }}
                >
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>
                    Всього витрачено:
                  </Typography>
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 700 }}>
                    {totalCost} грн
                  </Typography>
                </Box>
              </Box>

              {car.addEquip && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 600,
                      mb: 1,
                      fontSize: '1.1rem',
                    }}
                  >
                    Додаткове обладнання
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      color: 'text.secondary',
                    }}
                  >
                    {car.addEquip}
                  </Typography>
                </Box>
              )}

              {car.sponsors && car.sponsors.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      color: '#B45309',
                      mb: 1.5,
                    }}
                  >
                    Подяка спонсорам
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    {car.sponsors.map((sponsorId) => (
                      <Box
                        key={sponsorId}
                        sx={{
                          background: '#FFFBEB',
                          border: '1px solid #FCD34D',
                          padding: 2.5,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                        }}
                      >
                        <SponsorCard sponsorId={sponsorId} showCars={false} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {car.description && (
                <Box sx={{ mb: 4 }}>
                  <Typography
                    sx={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 600,
                      mb: 1,
                      fontSize: '1.1rem',
                    }}
                  >
                    Історія авто
                  </Typography>
                  <Typography
                    sx={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.6,
                      color: 'text.secondary',
                    }}
                  >
                    {car.description}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
