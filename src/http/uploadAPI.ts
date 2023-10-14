import { $authHost } from '.'

class PictureAPI {
  async upload(formData: FormData): Promise<{ fileId: string }> {
    const { data } = await $authHost.post<{ fileId: string }>('api/uploadPicture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data
  }

  async delete(pictureId: string): Promise<boolean> {
    const { status } = await $authHost.post('api/deletePicture', { pictureId })

    return status === 200
  }
}
export default new PictureAPI()
