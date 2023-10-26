import React, { useEffect, useState } from 'react'
import { Fade } from '@mui/material'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { ISponsorDocument } from '../utils/interfaces'
import Box from '@mui/material/Box'
import sponsorAPI from '../http/sponsorAPI'
import SponsorCard from '../components/SponsorCard'
import Typography from '@mui/material/Typography'

export const Sponsors = () => {
  const [loading, setLoading] = useState(true)
  const [fadeLoader, setFadeLoader] = useState(true)
  const [sponsors, setSponsors] = useState<ISponsorDocument[]>([])
  useEffect(() => {
    sponsorAPI.getAllActiveSponsor().then((sponsorList) => {
      setSponsors(sponsorList)
      setLoading(false)
    })
  }, [])

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
    <Container sx={{ py: 2, mt: 8 }} maxWidth='lg'>
      <Typography variant={'h4'}>
        Cпонсори та меценати, які надали посильну допомогу проекту
      </Typography>
      <Grid container spacing={2}>
        {sponsors.map((sponsor) => (
          <Grid key={sponsor.id} item xs={12} sm={6} md={4}>
            <SponsorCard sponsorId={sponsor.id!} showCars={true} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
