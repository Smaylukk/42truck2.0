import { CarStatus } from './interfaces'

export const StatusColor = new Map<CarStatus, string>([
  [CarStatus.find, 'gray'],
  [CarStatus.buy, 'red'],
  [CarStatus.transport, '#39b5dd'],
  [CarStatus.repair, 'orange'],
  [CarStatus.done, 'green'],
  [CarStatus.finish, 'green'],
  [CarStatus.queue, 'red'],
  [CarStatus.death, '#6666cc'],
])

export const configApp = {
  googleServiceAccount: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
  googleSheetId: process.env.GOOGLE_SHEET_ID || '',
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY || '',
  googleApiKey: process.env.GOOGLE_API_KEY || '',
}
