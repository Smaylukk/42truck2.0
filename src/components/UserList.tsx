import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { ADD_USER_ROUTE, EDIT_USER_ROUTE } from '../utils/consts'
import userAPI from '../http/userAPI'

export const UserList = () => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState<GridRowsProp>([])
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Найменування', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ]
  const navigate = useNavigate()
  useEffect(() => {
    userAPI.getAllUser().then((listOfUser) => {
      setRows(
        listOfUser.map((el) => {
          return {
            id: el.id,
            name: el.name,
            email: el.email,
          }
        }),
      )
      setLoading(false)
    })
  }, [])
  const addUser = () => navigate(ADD_USER_ROUTE)

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row' spacing={1} sx={{ my: 1 }}>
        <Button size='small' variant='contained' onClick={addUser}>
          Додати користувача
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
          navigate(EDIT_USER_ROUTE.replace(':userId', params.row.id))
        }}
      />
    </Box>
  )
}

export default UserList
