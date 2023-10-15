import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import sponsorAPI from '../http/sponsorAPI'
import config from '../utils/config'

interface IPropsCardSponsor {
  sponsorId: string
}

export const SponsorCard: React.FC<IPropsCardSponsor> = ({ sponsorId }) => {
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (sponsorId) {
      sponsorAPI.getOneSponsor(sponsorId).then((data) => {
        setName(data.name)
        setDescription(data.description)
        setUrl(data.url)
        setImageUrl(data.picture)
      })
    }
  }, [sponsorId])

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title={name} />
      <CardMedia
        component='img'
        image={`${config.staticUrl}${imageUrl}`}
        alt='Paella dish'
        style={{ blockSize: 'fit-content', width: 150, height: 150 }}
      />
      <CardContent>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          {description}
        </Typography>
        <Typography component={'a'} href={url} mt={5}>
          {url}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SponsorCard
