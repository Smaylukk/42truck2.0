import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import carAPI from '../http/carAPI'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { ADD_CAR_ROUTE, EDIT_CAR_ROUTE } from '../utils/consts'
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { getCarTypeLabel } from '../utils/utils'
import { CarType } from '../utils/interfaces'

export const MOBILE_COLUMNS = {
  name: true,
  number: true,
  carType: true,
  status: false,
  militaryBase: true,
  carName: false,
  active: true,
}
export const ALL_COLUMNS = {
  name: true,
  number: true,
  carType: true,
  status: true,
  militaryBase: true,
  carName: true,
  active: true,
}

const columns: GridColDef[] = [
  { field: 'number', headerName: 'Номер', flex: 0 },
  { field: 'name', headerName: 'Марка', flex: 1 },
  {
    field: 'carType',
    headerName: 'Тип',
    flex: 1,
    valueGetter: (params) => getCarTypeLabel(params.row.carType),
    filterable: true,
  },
  { field: 'status', headerName: 'Статус', flex: 1, filterable: true },
  { field: 'militaryBase', headerName: 'В/ч', flex: 1 },
  { field: 'carName', headerName: 'Назва', flex: 1 },
  { field: 'active', headerName: 'Активна', flex: 0, type: 'boolean' },
]

export const CarList: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const [columnVisible, setColumnVisible] = React.useState({})
  const [carTypeFilter, setCarTypeFilter] = useState(-1)

  const handleChange = (event: SelectChangeEvent<number>) => {
    setCarTypeFilter(event.target.value as number)
  }

  const navigate = useNavigate()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  React.useEffect(() => {
    const newColumns = matches ? ALL_COLUMNS : MOBILE_COLUMNS
    setColumnVisible(newColumns)
  }, [matches])

  useEffect(() => {
    setLoading(true)
    carAPI.getAllCar().then((listOfCar) => {
      const carList = listOfCar.map((el) => {
        return {
          id: el.id,
          name: el.name,
          carType: el.carType,
          number: el.numberSort,
          militaryBase: el.militaryBase,
          carName: el.carName,
          active: el.active,
          status: el.status,
        }
      })
      if (carTypeFilter < 0) {
        setRows(carList)
      } else {
        setRows(
          carList.filter((value) => {
            return (
              (carTypeFilter === 0 && value.carType === CarType.car) ||
              (carTypeFilter === 1 && value.carType === CarType.repair) ||
              (carTypeFilter === 2 && value.carType === CarType.zombie)
            )
          }),
        )
      }

      setLoading(false)
    })
  }, [carTypeFilter])
  const addCar = () => navigate(ADD_CAR_ROUTE)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row' spacing={2} sx={{ my: 1, flexWrap: 'wrap' }} useFlexGap>
        <Button size='small' variant='contained' onClick={addCar}>
          Додати тачку
        </Button>
        <FormControl sx={{ width: '50%' }}>
          <Select
            labelId='status-select-label'
            id='status-select'
            value={carTypeFilter}
            label='Age'
            onChange={handleChange}
          >
            <MenuItem value={-1}>Всі</MenuItem>
            <MenuItem value={0}>{getCarTypeLabel(CarType.car)}</MenuItem>
            <MenuItem value={1}>{getCarTypeLabel(CarType.repair)}</MenuItem>
            <MenuItem value={2}>{getCarTypeLabel(CarType.zombie)}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <DataGrid
        className='DataGrid'
        loading={loading}
        rows={rows}
        columns={columns}
        autoHeight
        showCellVerticalBorder
        showColumnVerticalBorder
        columnVisibilityModel={columnVisible}
        onRowClick={(params) => {
          navigate(EDIT_CAR_ROUTE.replace(':carId', params.row.id))
        }}
      />
    </Box>
  )
}

export default CarList
