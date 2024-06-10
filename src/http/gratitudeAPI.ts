import { $authHost, $host } from '.'

import userAPI from './userAPI'
import { IGratitudeCreateUpdate, IGratitudeDocument } from '../utils/interfaces'

const restApiGratitude = '/api/gratitude'
class GratitudeAPI {
  async getAllGratitude(): Promise<IGratitudeDocument[]> {
    const result = await $host.get<IGratitudeDocument[]>(restApiGratitude)
    return result.data
  }

  async getOneGratitude(id: string): Promise<IGratitudeDocument> {
    const result = await $host.get<IGratitudeDocument>(`${restApiGratitude}/${id}`)
    return result.data
  }

  async createGratitude(data: IGratitudeCreateUpdate): Promise<IGratitudeDocument | null> {
    try {
      await userAPI.check()
      const result = await $authHost.post<IGratitudeDocument>(restApiGratitude, data)
      return result.data
    } catch (e) {
      return null
    }
  }

  async changeGratitude(
    id: string,
    data: IGratitudeCreateUpdate,
  ): Promise<IGratitudeDocument | null> {
    try {
      await userAPI.check()
      const result = await $authHost.put<IGratitudeDocument>(`${restApiGratitude}/${id}`, data)
      return result.data
    } catch (e) {
      return null
    }
  }

  async deleteGratitude(id: string): Promise<number | null> {
    try {
      await userAPI.check()
      const result = await $authHost.delete(`${restApiGratitude}/${id}`)
      return result.data
    } catch (e) {
      return null
    }
  }
}
export default new GratitudeAPI()
