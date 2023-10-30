export interface IThemeProps {
  useDark: boolean
  themeChanger: (useDark?: boolean) => void
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
  pictures: string[]
  sponsors: string[]
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
  pictures: string[]
  sponsors: string[]
}

export enum CarStatus {
  find = 'Пошук',
  buy = 'Знайшли',
  transport = 'Перегон',
  repair = 'Ремонт',
  done = 'У військах',
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
