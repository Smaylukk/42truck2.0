import React, { FC } from 'react'
import { TextField, InputAdornment, IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

interface SearchBarProps {
  searchQuery: string
  searchOpen: boolean
  onSearchChange: (query: string) => void
  onSearchOpen: () => void
  onSearchClose: () => void
}

export const SearchBar: FC<SearchBarProps> = ({
  searchQuery,
  searchOpen,
  onSearchChange,
  onSearchOpen,
  onSearchClose,
}) => {
  return (
    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 auto' }, display: 'flex', alignItems: 'center' }}>
      {searchOpen ? (
        <TextField
          size='small'
          fullWidth
          autoFocus
          variant='outlined'
          placeholder='Пошук...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={onSearchClose} edge='end' size='small'>
                  <CloseIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1.5,
              backgroundColor: 'action.hover',
            },
          }}
        />
      ) : (
        <IconButton
          onClick={onSearchOpen}
          size='small'
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <SearchIcon fontSize='small' />
        </IconButton>
      )}
    </Box>
  )
}
