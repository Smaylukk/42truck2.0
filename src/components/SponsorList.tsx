import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import sponsorAPI from '../http/sponsorAPI'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ADD_SPONSOR_ROUTE, EDIT_SPONSOR_ROUTE } from '../utils/consts'
import config from '../utils/config'

export const SponsorList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Найменування', flex: 2 },
    { field: 'description', headerName: 'Опис', flex: 3 },
    {
      field: 'picture',
      headerName: 'Logo',
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <img
            src={config.staticUrl + params.value}
            alt={'sponsor picture'}
            style={{
              width: 50,
              height: 50,
              blockSize: 'fit-content',
            }}
          />
        ) : (
          ''
        ),
    },
    {
      field: 'active',
      headerName: 'Активність',
      flex: 1,
      type: 'boolean',
    },
  ]
  const navigate = useNavigate()
  useEffect(() => {
    sponsorAPI.getAllSponsor().then((listOfSponsor) => {
      setRows(
        listOfSponsor.map((el) => {
          return {
            id: el.id,
            name: el.name,
            description: el.description,
            active: el.active,
            picture: el.picture,
          }
        }),
      )
      setLoading(false)
    })
  }, [])
  const addSponsor = () => navigate(ADD_SPONSOR_ROUTE)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row' spacing={1} sx={{ my: 1 }}>
        <Button size='small' variant='contained' onClick={addSponsor}>
          Додати спонсора
        </Button>
      </Stack>
      <DataGrid
        className='DataGrid'
        loading={loading}
        rows={rows}
        columns={columns}
        autoHeight={true}
        showCellVerticalBorder={true}
        showColumnVerticalBorder={true}
        onRowClick={(params) => {
          navigate(EDIT_SPONSOR_ROUTE.replace(':sponsorId', params.row.id))
        }}
      />
    </Box>
  )
}

export default SponsorList
