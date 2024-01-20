import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import SponsorList from '../components/SponsorList'
import CarList from '../components/CarList'
import UserList from '../components/UserList'

const enum TabValue {
  'cars' = 'cars',
  'repairs' = 'repairs',
  'sponsors' = 'sponsors',
  'users' = 'users',
}

const AdminPage = () => {
  const [tabValue, setTabValue] = useState<TabValue>(TabValue.cars)
  const handleChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setTabValue(newValue)
    localStorage.setItem('adminPageTab', newValue)
  }

  useEffect(() => {
    setTabValue((localStorage.getItem('adminPageTab') as TabValue) ?? TabValue.cars)
  }, [])
  return (
    <Box sx={{ width: '100%', pt: 8 }}>
      <Container maxWidth='md'>
        <Typography></Typography>
      </Container>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        textColor='primary'
        indicatorColor='primary'
        aria-label='secondary tabs example'
      >
        <Tab value={TabValue.cars} label='Тачки' />
        <Tab value={TabValue.repairs} label='Ремонт' />
        <Tab value={TabValue.sponsors} label='Спонсори' />
        <Tab value={TabValue.users} label='Користувачі' />
      </Tabs>
      <Box sx={{ width: '100%' }}>
        {tabValue === TabValue.cars && <CarList isRepair={false} />}
        {tabValue === TabValue.repairs && <CarList isRepair={true} />}
        {tabValue === TabValue.sponsors && <SponsorList />}
        {tabValue === TabValue.users && <UserList />}
      </Box>
    </Box>
  )
}

export default AdminPage
