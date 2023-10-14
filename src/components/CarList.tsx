import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import carAPI from '../http/carAPI'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { ADD_CAR_ROUTE, EDIT_CAR_ROUTE } from '../utils/consts'

export const CarList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Марка', flex: 1 },
    { field: 'number', headerName: 'Номер', flex: 1 },
    { field: 'status', headerName: 'Статус', flex: 1 },
    { field: 'militaryBase', headerName: 'В/ч', flex: 1 },
    { field: 'carName', headerName: 'Назва', flex: 1 },
    { field: 'active', headerName: 'Активна', flex: 0, type: 'boolean' },
  ]
  const navigate = useNavigate()
  useEffect(() => {
    carAPI.getAllCar().then((listOfCar) => {
      setRows(
        listOfCar.map((el) => {
          return {
            id: el.id,
            name: el.name,
            number: el.number,
            militaryBase: el.militaryBase,
            carName: el.carName,
            active: el.active,
            status: el.status,
          }
        }),
      )
      setLoading(false)
    })
  }, [])
  const addCar = () => navigate(ADD_CAR_ROUTE)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row' spacing={1} sx={{ my: 1 }}>
        <Button size='small' variant='contained' onClick={addCar}>
          Додати тачку
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
          navigate(EDIT_CAR_ROUTE.replace(':carId', params.row.id))
        }}
      />
    </Box>
  )
}

export default CarList
