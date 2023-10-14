import { $authHost, $host } from '.'

import userAPI from './userAPI'
import { ISponsorCreateUpdate, ISponsorDocument } from '../utils/interfaces'

const restApiSponsor = '/api/sponsor'
class SponsorAPI {
  async getAllSponsor(): Promise<ISponsorDocument[]> {
    const result = await $host.get<ISponsorDocument[]>(restApiSponsor)
    return result.data
  }

  async getOneSponsor(id: string): Promise<ISponsorDocument> {
    const result = await $host.get<ISponsorDocument>(`${restApiSponsor}/${id}`)
    return result.data
  }

  async createSponsor(data: ISponsorCreateUpdate): Promise<ISponsorDocument | null> {
    try {
      await userAPI.check()
      const result = await $authHost.post<ISponsorDocument>(restApiSponsor, data)
      return result.data
    } catch (e) {
      return null
    }
  }

  async changeSponsor(id: string, data: ISponsorCreateUpdate): Promise<ISponsorDocument | null> {
    try {
      await userAPI.check()
      const result = await $authHost.put<ISponsorDocument>(`${restApiSponsor}/${id}`, data)
      return result.data
    } catch (e) {
      return null
    }
  }

  async deleteSponsor(id: string): Promise<number | null> {
    try {
      await userAPI.check()
      const result = await $authHost.delete(`${restApiSponsor}/${id}`)
      return result.data
    } catch (e) {
      return null
    }
  }
}
export default new SponsorAPI()
