import { $authHost } from '.'

class EditorAPI {
  async getEditorData(name: string): Promise<string> {
    const { data } = await $authHost.get<{ html: string }>(`api/getHtmlElement/${name}`)

    return data.html
  }

  async saveEditorData(name: string, savedData: string): Promise<boolean> {
    const result = await $authHost.post<string>(
      'api/saveHtmlElement',
      {
        name,
        html: savedData,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    return result.status === 200
  }
}
export default new EditorAPI()
