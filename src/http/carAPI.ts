import { $authHost, $host } from '.'

import userAPI from './userAPI'
import { ICarCreateUpdate, ICarDocument, IPrevNextCar } from '../utils/interfaces'

const restApiCar = '/api/car'

class CarAPI {
  async getAllCar(): Promise<ICarDocument[]> {
    const cars = await $authHost.get<ICarDocument[]>(restApiCar)
    return cars.data
  }

  async getAllActiveCar(): Promise<ICarDocument[]> {
    const cars = await $host.get<ICarDocument[]>(`${restApiCar}/car/active`)
    return cars.data
  }

  async getAllRepairActiveCar(): Promise<ICarDocument[]> {
    const cars = await $host.get<ICarDocument[]>(`${restApiCar}/repair/active`)
    return cars.data
  }

  async getAllZombieActiveCar(): Promise<ICarDocument[]> {
    const cars = await $host.get<ICarDocument[]>(`${restApiCar}/zombie/active`)
    return cars.data
  }

  async getOneCar(id: string): Promise<ICarDocument> {
    const cars = await $host.get<ICarDocument>(`${restApiCar}/${id}`)
    return cars.data
  }

  async getOneCarAdmin(id: string): Promise<ICarDocument> {
    const cars = await $authHost.get<ICarDocument>(`${restApiCar}/admin/${id}`)
    return cars.data
  }

  async createCar(data: ICarCreateUpdate): Promise<ICarDocument> {
    await userAPI.check()
    const cars = await $authHost.post<ICarDocument>(restApiCar, data)
    return cars.data
  }

  async changeCar(id: string, data: ICarCreateUpdate): Promise<ICarDocument> {
    await userAPI.check()
    const cars = await $authHost.put<ICarDocument>(`${restApiCar}/${id}`, data)
    return cars.data
  }

  async deleteCar(id: string): Promise<number> {
    await userAPI.check()
    const cars = await $authHost.delete(`${restApiCar}/${id}`)
    return cars.data
  }

  async getPrevCar(id: string): Promise<IPrevNextCar> {
    const prevCar = await $authHost.get<IPrevNextCar>(`${restApiCar}/prev/${id}`)
    return prevCar.data
  }

  async getNextCar(id: string): Promise<IPrevNextCar> {
    const nextCar = await $authHost.get<IPrevNextCar>(`${restApiCar}/next/${id}`)
    return nextCar.data
  }
}
export default new CarAPI()
