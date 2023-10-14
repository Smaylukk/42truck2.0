import React, { useState } from 'react'
import { Select, MenuItem, IconButton, Box, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { ISponsorDocument } from '../utils/interfaces'

interface IPropsSponsorSelector {
  onAdd: (selectedSponsor: string) => void
  availableSponsors: ISponsorDocument[]
}
const SponsorSelector: React.FC<IPropsSponsorSelector> = ({ onAdd, availableSponsors }) => {
  const [selected, setSelected] = useState('')

  return (
    <Box>
      <Grid item>
        <Select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value)
          }}
          label='Виберіть спонсорів'
          sx={{ width: '90%' }}
        >
          {availableSponsors.map((sponsor) => (
            <MenuItem key={sponsor.id} value={sponsor.id}>
              {sponsor.name}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={() => onAdd(selected)}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Box>
  )
}

export default SponsorSelector
