import React, { FC } from 'react'
import { Select, MenuItem, FormControl, InputAdornment, IconButton, Box } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

interface SortControlsProps {
  sortBy: 'number' | 'carName' | 'militaryBase'
  sortOrder: 'asc' | 'desc'
  onSortByChange: (sortBy: 'number' | 'carName' | 'militaryBase') => void
  onSortOrderToggle: () => void
}

export const SortControls: FC<SortControlsProps> = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderToggle,
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <FormControl size='small' sx={{ minWidth: { xs: '100%', sm: 140 } }}>
        <Select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value as typeof sortBy)}
          startAdornment={
            <InputAdornment position='start'>
              <SortIcon fontSize='small' />
            </InputAdornment>
          }
          sx={{
            borderRadius: 1.5,
            backgroundColor: 'action.hover',
            fontSize: '0.875rem',
          }}
        >
          <MenuItem value='number'>Номер</MenuItem>
          <MenuItem value='carName'>Марка</MenuItem>
          <MenuItem value='militaryBase'>В/ч</MenuItem>
        </Select>
      </FormControl>

      <IconButton
        size='small'
        onClick={onSortOrderToggle}
        sx={{
          backgroundColor: 'action.hover',
          '&:hover': {
            backgroundColor: 'action.selected',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {sortOrder === 'asc' ? (
          <ArrowUpwardIcon fontSize='small' />
        ) : (
          <ArrowDownwardIcon fontSize='small' />
        )}
      </IconButton>
    </Box>
  )
}
