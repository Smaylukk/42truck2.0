export interface IThemeProps {
  useDark: boolean
  themeChanger: (useDark?: boolean) => void
}

export interface IAppBarProps {
  isAuth: boolean
}

export interface ISponsorDocument {
  id: string
  name: string
  description: string
  picture: string
  url: string
  active: boolean
}

export interface ISponsorDocumentWithCar {
  id: string
  name: string
  description: string
  picture: string
  url: string
  active: boolean
  cars: IShortCar[]
}

export interface ISponsorCreateUpdate {
  name: string
  description: string
  picture: string
  url: string
  active: boolean
}

export interface IShortCar {
  id: string
  number: string
  name: string
  carName: string
}

export interface IPrevNextCar {
  id: string
  number: string
}

export interface ICarDocument {
  id: string
  name: string
  number: string
  numberSort: number
  militaryBase: string
  carName: string
  amountTires: number
  amountDyeing: number
  amountRepair: number
  addEquip: string
  active: boolean
  status: CarStatus
  description: string
  color: CarColor
  pictures: string[]
  sponsors: string[]
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  carType: CarType
}

export interface ICarCreateUpdate {
  number: string
  numberSort: number
  militaryBase: string
  name: string
  amountRepair: number
  amountTires: number
  amountDyeing: number
  addEquip: string
  status: CarStatus
  carName: string
  description: string
  active: boolean
  color: CarColor
  pictures: string[]
  sponsors: string[]
  contactName?: string
  contactPhone?: string
  contactEmail?: string
  carType: CarType
}

export enum CarStatus {
  find = 'Пошук',
  buy = 'Знайшли',
  transport = 'Перегон',
  repair = 'Ремонт',
  done = 'У військах',
  queue = 'В черзі',
  finish = 'Завершено',
  death = 'Відслужила',
}

export interface IUserDocument {
  id?: string
  name: string
  email: string
  password: string
}

export interface IUserCreateUpdate {
  name: string
  email: string
  password: string
}

export enum CarColor {
  gray = 'Мартінбрестовський сірий фельдграу',
  green = 'Брест в болоті',
  black = 'Душа Бреста',
  not = 'Таємний Мартін',
}

export interface IGratitudeDocument {
  id?: string
  url: string
  description: string
}

export interface IGratitudeCreateUpdate {
  url: string
  description: string
}

export interface GratitudePictureList {
  name: string
  url: string
}

export enum CarType {
  car,
  repair,
  zombie,
}
