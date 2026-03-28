import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { ICarDocument } from '../utils/interfaces'
import carAPI from '../http/carAPI'
import { RepairCarAlbum } from '../components/RepairCarAlbum'
import { HtmlText } from '../components/HtmlText'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { StatsCards } from '../components/StatsCards'

const Repair = () => {
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState<ICarDocument[]>([])
  useEffect(() => {
    carAPI.getAllRepairActiveCar().then((cars) => {
      setCars(cars)
      setLoading(false)
    })
  }, [])
  return (
    <Box>
      <Container sx={{ py: 2 }} maxWidth='lg'>
        <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
          <Box component={'img'} src='/assets/repair.png' sx={{ mr: 2, height: 80 }} />
          <Typography variant='h2'>реабіліТАЧКИ</Typography>
        </Stack>
        <Typography variant='subtitle1' sx={{ py: 1 }} align='center'>
          Проєкт середніх та важких ремонтів автомобілів, що вже служать в ЗСУ
        </Typography>
        {!loading && <StatsCards cars={cars} />}
        <RepairCarAlbum loading={loading} cars={cars} />
      </Container>
      <HtmlText name={'requisites'} />
    </Box>
  )
}

export default Repair
