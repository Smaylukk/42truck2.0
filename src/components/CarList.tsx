import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import carAPI from '../http/carAPI'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { ADD_CAR_ROUTE, EDIT_CAR_ROUTE } from '../utils/consts'
import { useMediaQuery, useTheme } from '@mui/material'

export const MOBILE_COLUMNS = {
  name: true,
  number: true,
  status: false,
  militaryBase: true,
  carName: false,
  active: true,
}
export const ALL_COLUMNS = {
  name: true,
  number: true,
  status: true,
  militaryBase: true,
  carName: true,
  active: true,
}
const columns: GridColDef[] = [
  { field: 'number', headerName: 'Номер', flex: 1 },
  { field: 'name', headerName: 'Марка', flex: 1 },
  { field: 'status', headerName: 'Статус', flex: 1 },
  { field: 'militaryBase', headerName: 'В/ч', flex: 1 },
  { field: 'carName', headerName: 'Назва', flex: 1 },
  { field: 'active', headerName: 'Активна', flex: 0, type: 'boolean' },
]

export const CarList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const [columnVisible, setColumnVisible] = React.useState(ALL_COLUMNS)

  const navigate = useNavigate()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  React.useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS
    setColumnVisible(newColumns)
  }, [matches])

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
        autoHeight
        showCellVerticalBorder
        showColumnVerticalBorder
        disableColumnMenu
        columnVisibilityModel={columnVisible}
        onRowClick={(params) => {
          navigate(EDIT_CAR_ROUTE.replace(':carId', params.row.id))
        }}
      />
    </Box>
  )
}

export default CarList
