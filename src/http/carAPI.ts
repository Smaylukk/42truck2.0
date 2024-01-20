import { $authHost, $host } from '.'

import userAPI from './userAPI'
import { ICarCreateUpdate, ICarDocument, IPrevNextCar } from '../utils/interfaces'

const restApiCar = '/api/car'

class CarAPI {
  async getAllCar(isRepair = false): Promise<ICarDocument[]> {
    const cars = isRepair
      ? await $host.get<ICarDocument[]>(`${restApiCar}/repair`)
      : await $host.get<ICarDocument[]>(restApiCar)
    return cars.data
  }

  async getAllActiveCar(isRepair = false): Promise<ICarDocument[]> {
    const cars = isRepair
      ? await $host.get<ICarDocument[]>(`${restApiCar}/repair/active`)
      : await $host.get<ICarDocument[]>(`${restApiCar}/active`)
    return cars.data
  }

  async getOneCar(id: string): Promise<ICarDocument> {
    const cars = await $host.get<ICarDocument>(`${restApiCar}/${id}`)
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
    const prevCar = await $host.get<IPrevNextCar>(`${restApiCar}/prev/${id}`)
    return prevCar.data
  }

  async getNextCar(id: string): Promise<IPrevNextCar> {
    const nextCar = await $host.get<IPrevNextCar>(`${restApiCar}/next/${id}`)
    return nextCar.data
  }
}
export default new CarAPI()
