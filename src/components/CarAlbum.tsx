import React, { FC, Fragment, useEffect, useState } from 'react'
import { Fade } from '@mui/material'
import Grid from '@mui/material/Grid'
import { CarCard } from './CarCard'
import Container from '@mui/material/Container'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import Box from '@mui/material/Box'
import { FilterChips } from './FilterChips'
import { SearchBar } from './SearchBar'
import { SortControls } from './SortControls'

export const CarAlbum: FC<{
  loading: boolean
  cars: ICarDocument[]
}> = ({ loading, cars }) => {
  const [statusFilter, setStatusFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'number' | 'carName' | 'militaryBase'>('number')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const [fadeLoader, setFadeLoader] = useState(true)
  const [filterCar, setFilterCar] = useState<ICarDocument[]>([])

  const handleFilterChange = (filter: number) => {
    setStatusFilter(filter)
  }

  const handleSearchOpen = () => {
    setSearchOpen(true)
  }

  const handleSearchClose = () => {
    setSearchOpen(false)
    setSearchQuery('')
  }

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  useEffect(() => {
    let filtered = cars

    // Фільтрація за статусом
    if (statusFilter !== 0) {
      filtered = filtered.filter((value) => {
        return (
          (statusFilter === 1 && value.status === CarStatus.find) ||
          (statusFilter === 2 && value.status === CarStatus.buy) ||
          (statusFilter === 3 && value.status === CarStatus.transport) ||
          (statusFilter === 4 && value.status === CarStatus.repair) ||
          (statusFilter === 5 && value.status === CarStatus.done) ||
          (statusFilter === 6 && value.status === CarStatus.death)
        )
      })
    }

    // Фільтрація за пошуковим запитом
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((car) => {
        return (
          car.number?.toLowerCase().includes(query) ||
          car.name?.toLowerCase().includes(query) ||
          car.carName?.toLowerCase().includes(query) ||
          car.militaryBase?.toLowerCase().includes(query) ||
          car.description?.toLowerCase().includes(query)
        )
      })
    }

    // Сортування
    filtered.sort((a, b) => {
      let compareResult = 0

      switch (sortBy) {
        case 'number':
          compareResult = a.numberSort - b.numberSort
          break
        case 'carName':
          compareResult = (a.name?.trim() || '').localeCompare(b.name?.trim() || '', 'uk')
          break
        case 'militaryBase':
          compareResult = (a.militaryBase || '').localeCompare(b.militaryBase || '', 'uk')
          break
      }

      return sortOrder === 'asc' ? compareResult : -compareResult
    })

    setFilterCar(filtered)
  }, [statusFilter, searchQuery, sortBy, sortOrder, cars])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeLoader((prev) => !prev)
    }, 500)
    return () => clearInterval(intervalId)
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Fade in={fadeLoader}>
          <Box component={'img'} src='/assets/42.png' sx={{ m: 2, height: 40 }} />
        </Fade>
      </Box>
    )
  }

  return (
    <Fragment>
      <Container sx={{ pt: 2, pb: 1, px: { xs: 2, sm: 3 } }} maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 2,
            p: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <SearchBar
            searchQuery={searchQuery}
            searchOpen={searchOpen}
            onSearchChange={setSearchQuery}
            onSearchOpen={handleSearchOpen}
            onSearchClose={handleSearchClose}
          />

          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={setSortBy}
            onSortOrderToggle={toggleSortOrder}
          />
        </Box>

        <FilterChips cars={cars} statusFilter={statusFilter} onFilterChange={handleFilterChange} />
      </Container>

      <Container sx={{ py: 2, px: { xs: 2, sm: 3 } }} maxWidth='lg'>
        <Grid container spacing={3}>
          {filterCar.map((car) => (
            <CarCard key={car.number} car={car} />
          ))}
        </Grid>
      </Container>
    </Fragment>
  )
}
