import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ADD_GRATITUDE_ROUTE, EDIT_GRATITUDE_ROUTE } from '../utils/consts'
import gratitudeAPI from '../http/gratitudeAPI'
import config from '../utils/config'

export const GratitudeList = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const columns: GridColDef[] = [
    { field: 'description', headerName: 'Опис', flex: 1 },
    {
      field: 'picture',
      headerName: 'Картинка',
      flex: 1,
      renderCell: (params) => (
        <img
          alt='Обрана картинка'
          src={`${config.staticUrl}${params.value}`}
          style={{
            margin: '0px',
            width: 50,
            height: 50,
            blockSize: 'fit-content',
          }}
        />
      ),
    },
  ]
  const navigate = useNavigate()
  useEffect(() => {
    gratitudeAPI.getAllGratitude().then((listOfGratitude) => {
      setRows(
        listOfGratitude.map((el) => {
          return {
            id: el.id,
            description: el.description,
            picture: el.url,
          }
        }),
      )
      setLoading(false)
    })
  }, [])
  const addUser = () => navigate(ADD_GRATITUDE_ROUTE)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row' spacing={1} sx={{ my: 1 }}>
        <Button size='small' variant='contained' onClick={addUser}>
          Додати подяку
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
          navigate(EDIT_GRATITUDE_ROUTE.replace(':gratitudeId', params.row.id))
        }}
      />
    </Box>
  )
}

export default GratitudeList
