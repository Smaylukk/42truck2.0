import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import carAPI from '../http/carAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { ADMIN_ROUTE } from '../utils/consts'
import { CarColor, CarStatus, ICarCreateUpdate, ISponsorDocument } from '../utils/interfaces'
import ConfirmationDialog from '../components/ConfirmationDialog'
import Typography from '@mui/material/Typography'
import sponsorAPI from '../http/sponsorAPI'
import EditPageControlButton from '../components/EditPageControlButton'
import SponsorSelector from '../components/SponsorSelector'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadImageButton from '../components/UploadImageButton'
import pictureAPI from '../http/uploadAPI'
import config from '../utils/config'

const CarEditPage: React.FC<{ isRepair?: boolean }> = ({ isRepair = false }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [numberSort, setNumberSort] = useState(0)
  const [militaryBase, setMilitaryBase] = useState('')
  const [carName, setCarName] = useState('')
  const [status, setStatus] = useState<CarStatus>(CarStatus.find)
  const [addEquip, setAddEquip] = useState('')
  const [amountDyeing, setAmountDyeing] = useState(0)
  const [amountTires, setAmountTires] = useState(0)
  const [amountRepair, setAmountRepair] = useState(0)
  const [color, setColor] = useState<CarColor>(CarColor.not)
  const [sponsors, setSponsors] = useState<string[]>([])
  const [pictures, setPictures] = useState<string[]>([])
  const [active, setActive] = useState(true)
  const [description, setDescription] = useState('')
  const [idCar, setIdCar] = useState<string | null>(null)
  const [saveOpen, setSaveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [availableSponsors, setAvailableSponsors] = useState<ISponsorDocument[]>([])
  const [changePictures, setChangePictures] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')

  const { carId } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.only('xs'))
  const small = useMediaQuery(theme.breakpoints.only('sm'))
  const medium = useMediaQuery(theme.breakpoints.only('md'))

  useEffect(() => {
    if (carId) {
      setIdCar(carId)
    }
  }, [carId])
  useEffect(() => {
    if (idCar) {
      carAPI.getOneCarAdmin(idCar).then((data) => {
        setName(data.name)
        setMilitaryBase(data.militaryBase || '')
        setNumber(data.number)
        setNumberSort(data.numberSort)
        setCarName(data.carName)
        setStatus(data.status)
        setAddEquip(data.addEquip)
        setAmountDyeing(data.amountDyeing)
        setAmountTires(data.amountTires)
        setAmountRepair(data.amountRepair)
        setSponsors(data.sponsors)
        setPictures(data.pictures)
        setActive(data.active)
        setDescription(data.description)
        setColor(data.color || CarColor.not)
        setContactName(data.contactName || '')
        setContactPhone(data.contactPhone || '')
        setContactEmail(data.contactEmail || '')
      })
    }
  }, [idCar])
  useEffect(() => {
    sponsorAPI.getAllSponsor().then((sponsorList) => {
      setAvailableSponsors(sponsorList)
    })
  }, [])
  useEffect(() => {
    if (changePictures) {
      saveCar().then((car) => {
        setIdCar(car.id)
      })
      setChangePictures(false)
    }
  }, [changePictures])

  const carFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    handleSaveOpenDialog()
  }
  const handleRemoveButton = async () => {
    handleDeleteOpen()
  }
  const handleSaveOpenDialog = () => {
    setSaveOpen(true)
  }
  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }
  const handleClose = () => {
    setSaveOpen(false)
    setDeleteOpen(false)
  }
  const handleSave = async () => {
    const response = await saveCar()
    if (response) {
      navigate(ADMIN_ROUTE)
    }
    handleClose()
  }
  const saveCar = async () => {
    const data: ICarCreateUpdate = {
      name,
      militaryBase,
      number: isRepair ? (number ? number : `Repair_${numberSort}`) : number,
      numberSort,
      carName,
      status,
      addEquip,
      amountDyeing,
      amountTires,
      amountRepair,
      active,
      description,
      sponsors,
      pictures,
      color,
      isRepair,
      contactName,
      contactPhone,
      contactEmail,
    }

    return idCar ? await carAPI.changeCar(idCar, data) : await carAPI.createCar(data)
  }
  const handleDelete = async () => {
    if (idCar) {
      const response = await deleteCar()
      if (response) {
        navigate(ADMIN_ROUTE)
      }
    }
    handleClose()
  }
  const deleteCar = async () => {
    return await carAPI.deleteCar(idCar!)
  }
  const handleAddSponsor = (selectedSponsor: string) => {
    setSponsors((prev) => {
      if (prev.find((val) => val === selectedSponsor)) {
        return prev
      } else {
        return [...prev, selectedSponsor]
      }
    })
  }

  const handleRemoveSponsor = (id: string) => {
    setSponsors((prev) => prev.filter((val) => val !== id))
  }
  const carImageAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      const { fileId } = await pictureAPI.upload(formData)
      setPictures((prev) => [...prev, fileId])
      setChangePictures(true)
    }
  }
  const handleDeletePicture = async (pictureId: string) => {
    await pictureAPI.delete(pictureId)
    setPictures((prev) => prev.filter((element) => element !== pictureId))
    setChangePictures(true)
  }

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant={'h6'} sx={{ my: 2 }}>
        {idCar ? 'Редагування інформації про тачку' : 'Додавання інформації про тачку'}
      </Typography>
      <form onSubmit={carFormSubmit}>
        <Grid
          container
          direction='row'
          spacing={1}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <EditPageControlButton id={idCar ?? ''} handleRemove={handleRemoveButton} />
          <Grid item xs={12} sm={1}>
            <FormControlLabel
              label='Активна'
              control={<Checkbox checked={active} onChange={(e) => setActive(e.target.checked)} />}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label='Номер по порядку'
              value={numberSort}
              type={'number'}
              onChange={(e) => setNumberSort(+e.target.value)}
              fullWidth
              required
            />
          </Grid>
          {!isRepair && (
            <Grid item xs={12} sm={3}>
              <TextField
                label='Номер авто'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          )}
          <Grid item xs={12} sm={isRepair ? 5 : 3}>
            <TextField
              label='Марка'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={isRepair ? 4 : 3}>
            <TextField
              label='Статус'
              value={status}
              fullWidth
              select
              onChange={(e) => setStatus(e.target.value as CarStatus)}
            >
              {!isRepair && <MenuItem value={CarStatus.find}>{CarStatus.find}</MenuItem>}
              {!isRepair && <MenuItem value={CarStatus.transport}>{CarStatus.transport}</MenuItem>}
              {!isRepair && <MenuItem value={CarStatus.buy}>{CarStatus.buy}</MenuItem>}
              <MenuItem value={CarStatus.repair}>{CarStatus.repair}</MenuItem>
              {!isRepair && <MenuItem value={CarStatus.done}>{CarStatus.done}</MenuItem>}
              {!isRepair && <MenuItem value={CarStatus.death}>{CarStatus.death}</MenuItem>}
              {isRepair && <MenuItem value={CarStatus.queue}>{CarStatus.queue}</MenuItem>}
              {isRepair && <MenuItem value={CarStatus.finish}>{CarStatus.finish}</MenuItem>}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label='Військова частина'
              value={militaryBase}
              fullWidth
              onChange={(e) => setMilitaryBase(e.target.value)}
            />
          </Grid>
          {!isRepair && (
            <Grid item xs={12} sm={4}>
              <TextField
                label='Назва машини'
                value={carName}
                fullWidth
                onChange={(e) => setCarName(e.target.value)}
              />
            </Grid>
          )}
          {!isRepair && (
            <Grid item xs={12} sm={4}>
              <TextField
                label='Колір'
                value={color}
                fullWidth
                select
                onChange={(e) => setColor(e.target.value as CarColor)}
              >
                <MenuItem value={CarColor.gray}>{CarColor.gray}</MenuItem>
                <MenuItem value={CarColor.green}>{CarColor.green}</MenuItem>
                <MenuItem value={CarColor.black}>{CarColor.black}</MenuItem>
                <MenuItem value={CarColor.not}>{CarColor.not}</MenuItem>
              </TextField>
            </Grid>
          )}
          <Grid item xs={4} sm={4}>
            <TextField
              label='Ремонт'
              value={amountRepair}
              fullWidth
              type={'number'}
              onChange={(e) => setAmountRepair(+e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              label='Шини'
              value={amountTires}
              fullWidth
              type={'number'}
              onChange={(e) => setAmountTires(+e.target.value)}
            />
          </Grid>
          {!isRepair && (
            <Grid item xs={4} sm={4}>
              <TextField
                label='Фарбування'
                value={amountDyeing}
                fullWidth
                type={'number'}
                onChange={(e) => setAmountDyeing(+e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label='Додаткове обладнання'
              value={addEquip}
              fullWidth
              multiline
              onChange={(e) => setAddEquip(e.target.value)}
            />
          </Grid>
          {!isRepair && (
            <Grid item xs={12}>
              <TextField
                label='Історія/опис тачки'
                value={description}
                fullWidth
                multiline
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          )}
          <Grid item xs={4}>
            <TextField
              label='Контактна особа'
              value={contactName}
              fullWidth
              multiline
              onChange={(e) => setContactName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label='Контактний телефон'
              value={contactPhone}
              fullWidth
              multiline
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label='Контактний email'
              value={contactEmail}
              fullWidth
              multiline
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </Grid>
          {/*фото*/}
          <Grid item xs={12} md={isRepair ? 12 : 6}>
            <Typography>Фото-історія тачки</Typography>
            <UploadImageButton caption={'Виберіть фото тачки'} handleImageChange={carImageAdd} />

            <ImageList
              sx={{ width: '99%', height: 350 }}
              variant='standard'
              cols={xs ? 1 : small || medium ? 2 : 3}
            >
              {pictures.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    alt={'Фото тачки'}
                    src={`${config.staticUrl}${item}`}
                    loading='lazy'
                    style={{
                      width: xs ? '100%' : small ? '100%' : 248,
                      blockSize: 'fit-content',
                    }}
                  />
                  <ImageListItemBar
                    title={'Видалити фото ->'}
                    sx={{ width: 248 }}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255,17,17,0.78)' }}
                        onClick={async () => {
                          await handleDeletePicture(item)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          {/*спонсори*/}
          {!isRepair && (
            <Grid item xs={12} md={6}>
              <Typography>
                Спонсори та меценати, які надали суттєву частку суми для купівлі цієї тачки
              </Typography>
              <SponsorSelector onAdd={handleAddSponsor} availableSponsors={availableSponsors} />
              {sponsors.map((el, index) => (
                <Grid container sx={{ mt: 1 }} key={index}>
                  <Grid item xs={10}>
                    <Button variant={'contained'} color={'success'} fullWidth>
                      {availableSponsors.find((element) => element.id === el)?.name}
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      color={'error'}
                      variant={'contained'}
                      sx={{ ml: 2 }}
                      onClick={() => {
                        handleRemoveSponsor(el)
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
          <EditPageControlButton id={idCar ?? ''} handleRemove={handleRemoveButton} />
        </Grid>
      </form>
      <ConfirmationDialog
        open={saveOpen}
        onClose={handleClose}
        onConfirm={handleSave}
        title='Зберегти'
        contentText='Ви впевнені, що хочете зберегти зміни?'
        confirmText='Зберегти'
      />

      <ConfirmationDialog
        open={deleteOpen}
        onClose={handleClose}
        onConfirm={handleDelete}
        title='Видалити'
        contentText='Ви впевнені, що хочете видалити цей елемент?'
        confirmText='Видалити'
      />
    </Box>
  )
}

export default CarEditPage
