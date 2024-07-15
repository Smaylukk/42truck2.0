import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Header } from '../components/Header'
import gratitudeAPI from '../http/gratitudeAPI'
import { LazyLoadGratitude } from '../components/LazyLoadGratitude'
import { GratitudePictureList } from '../utils/interfaces'

export const Gratitude = () => {
  const [gratitudeList, setGratitudeList] = useState<GratitudePictureList[]>([])
  useEffect(() => {
    gratitudeAPI.getAllGratitude().then((list) => {
      setGratitudeList(
        list.map((el) => {
          return {
            name: el.description,
            url: el.url,
          }
        }),
      )
    })
  }, [])

  return (
    <Container style={{ height: '95vh' }}>
      <Header />
      <Typography variant={'h4'}>Подяки спільноті від ЗСУ</Typography>
      <LazyLoadGratitude pictures={gratitudeList} />
    </Container>
  )
}
