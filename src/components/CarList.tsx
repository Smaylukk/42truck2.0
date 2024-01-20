import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import carAPI from '../http/carAPI'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import {
  ADD_CAR_ROUTE,
  ADD_REPAIR_CAR_ROUTE,
  EDIT_CAR_ROUTE,
  EDIT_REPAIR_CAR_ROUTE,
} from '../utils/consts'
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
export const MOBILE_COLUMNS_REPAIR = {
  name: true,
  number: true,
  status: false,
  militaryBase: true,
  active: true,
  amountRepair: false,
  amountTires: false,
}
export const ALL_COLUMNS_REPAIR = {
  name: true,
  number: true,
  status: true,
  militaryBase: true,
  active: true,
  amountRepair: true,
  amountTires: true,
}

const columns: GridColDef[] = [
  { field: 'number', headerName: 'Номер', flex: 0 },
  { field: 'name', headerName: 'Марка', flex: 1 },
  { field: 'status', headerName: 'Статус', flex: 1 },
  { field: 'militaryBase', headerName: 'В/ч', flex: 1 },
  { field: 'carName', headerName: 'Назва', flex: 1 },
  { field: 'active', headerName: 'Активна', flex: 0, type: 'boolean' },
]

const columnsRepair: GridColDef[] = [
  { field: 'number', headerName: 'Номер', flex: 0 },
  { field: 'name', headerName: 'Марка', flex: 1 },
  { field: 'status', headerName: 'Статус', flex: 1 },
  { field: 'militaryBase', headerName: 'В/ч', flex: 1 },
  { field: 'amountRepair', headerName: 'Ремонт', flex: 0, type: 'number' },
  { field: 'amountTires', headerName: 'Шини', flex: 0, type: 'number' },
  { field: 'active', headerName: 'Активна', flex: 0, type: 'boolean' },
]

export const CarList: React.FC<{ isRepair: boolean }> = ({ isRepair = false }) => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const [columnVisible, setColumnVisible] = React.useState({})

  const navigate = useNavigate()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  React.useEffect(() => {
    const newColumns = matches
      ? isRepair
        ? ALL_COLUMNS_REPAIR
        : ALL_COLUMNS
      : isRepair
      ? MOBILE_COLUMNS_REPAIR
      : MOBILE_COLUMNS
    setColumnVisible(newColumns)
  }, [matches])

  useEffect(() => {
    carAPI.getAllCar(isRepair).then((listOfCar) => {
      setRows(
        listOfCar.map((el) => {
          if (isRepair) {
            return {
              id: el.id,
              name: el.name,
              number: el.numberSort,
              militaryBase: el.militaryBase,
              active: el.active,
              status: el.status,
              amountRepair: el.amountRepair,
              amountTires: el.amountTires,
            }
          }
          return {
            id: el.id,
            name: el.name,
            number: el.numberSort,
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
  const addCar = () => navigate(isRepair ? ADD_REPAIR_CAR_ROUTE : ADD_CAR_ROUTE)

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
        columns={isRepair ? columnsRepair : columns}
        autoHeight
        showCellVerticalBorder
        showColumnVerticalBorder
        disableColumnMenu
        columnVisibilityModel={columnVisible}
        onRowClick={(params) => {
          navigate(
            (isRepair ? EDIT_REPAIR_CAR_ROUTE : EDIT_CAR_ROUTE).replace(':carId', params.row.id),
          )
        }}
      />
    </Box>
  )
}

export default CarList
