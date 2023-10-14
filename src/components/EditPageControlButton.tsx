import { Button, Grid } from '@mui/material'
import { ADMIN_ROUTE } from '../utils/consts'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface IPropsEditPageControlButton {
  id: string
  handleRemove: () => void
}
export const EditPageControlButton: React.FC<IPropsEditPageControlButton> = ({
  id,
  handleRemove,
}) => {
  const navigate = useNavigate()

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <Button type='submit' variant='contained' sx={{ mr: 1 }}>
        Зберегти
      </Button>
      <Button
        type='button'
        variant='contained'
        color='warning'
        onClick={() => navigate(ADMIN_ROUTE)}
        sx={{ mr: 1 }}
      >
        Відміна
      </Button>
      {id && (
        <Button
          type='button'
          variant='contained'
          color='error'
          onClick={handleRemove}
          sx={{ mr: 1 }}
        >
          Видалити
        </Button>
      )}
    </Grid>
  )
}

export default EditPageControlButton
