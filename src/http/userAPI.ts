import { $host, $authHost } from '.'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { IUser } from '../store/UserStore'
import { IUserCreateUpdate, IUserDocument } from '../utils/interfaces'

const restApiUser = '/api/user'
class UserAPI {
  async login(email: string, password: string): Promise<IUser> {
    const { data, status } = await $host.post('api/user/login', {
      email,
      password,
    })
    if (status === 200) {
      localStorage.setItem('accessToken', data.accessToken)
      return jwt_decode(data.accessToken)
    } else {
      throw new Error(data.message)
    }
  }

  async check(): Promise<IUser> {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Access token not found')
    }

    const { exp } = jwt_decode<JwtPayload & IUser>(accessToken)

    if (!exp) {
      throw new Error('Bad access token')
    }

    if (Date.now() >= 1000 * exp!) {
      throw new Error('Token expired')
    }
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
  }

  async getAllUser(): Promise<IUserDocument[]> {
    const result = await $authHost.get<IUserDocument[]>(restApiUser)
    return result.data
  }

  async getOneUser(id: string): Promise<IUserDocument> {
    const result = await $authHost.get<IUserDocument>(`${restApiUser}/${id}`)
    return result.data
  }

  async createUser(data: IUserCreateUpdate): Promise<IUserDocument | null> {
    try {
      await this.check()
      const result = await $authHost.post<IUserDocument>(restApiUser, data)
      return result.data
    } catch (e) {
      return null
    }
  }

  async changeUser(id: string, data: IUserCreateUpdate): Promise<IUserDocument | null> {
    try {
      await this.check()
      const result = await $authHost.put<IUserDocument>(`${restApiUser}/${id}`, data)
      return result.data
    } catch (e) {
      return null
    }
  }

  async deleteUser(id: string): Promise<number | null> {
    try {
      await this.check()
      const result = await $authHost.delete(`${restApiUser}/${id}`)
      return result.data
    } catch (e) {
      return null
    }
  }
}
export default new UserAPI()
