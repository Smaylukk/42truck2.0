import { $authHost } from '.'

import userAPI from './userAPI'
import { ICarCreateUpdate, ICarDocument } from '../utils/interfaces'

const restApiCar = '/api/car'

class CarAPI {
  async getAllCar(): Promise<ICarDocument[]> {
    const cars = await $authHost.get<ICarDocument[]>(restApiCar)
    return cars.data
  }

  async getAllActiveCar(): Promise<ICarDocument[]> {
    const cars = await $authHost.get<ICarDocument[]>(`${restApiCar}/active`)
    return cars.data
  }

  async getOneCar(id: string): Promise<ICarDocument> {
    const cars = await $authHost.get<ICarDocument>(`${restApiCar}/${id}`)
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
}
export default new CarAPI()
