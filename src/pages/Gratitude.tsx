import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { Header } from '../components/Header'
import gratitudeAPI from '../http/gratitudeAPI'
import { LazyLoadGratitude } from '../components/LazyLoadGratitude'

export const Gratitude = () => {
  const [gratitudeList, setGratitudeList] = useState<string[]>([])
  useEffect(() => {
    gratitudeAPI.getAllGratitude().then((list) => {
      setGratitudeList(
        list.map((el) => {
          return el.url
        }),
      )
    })
  }, [])

  return (
    <Container>
      <Header />
      <Typography variant={'h4'}>Подяки спільноті від ЗСУ</Typography>
      <LazyLoadGratitude images={gratitudeList} />
    </Container>
  )
}
