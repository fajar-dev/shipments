import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import { Brand } from '#enums/brand'

export default class Shipping extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Shipping) {
    model.id = uuidv4()
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare brand: Brand

  @column()
  declare weight: number

  @column()
  declare shippingDate: Date

  @column()
  declare trackNumber: string

  @column()
  declare shippingNote: string | null

  // Sender details
  @column()
  declare senderFirstName: string

  @column()
  declare senderLastName: string | null

  @column()
  declare senderPhone: string

  @column()
  declare senderEmail: string | null

  @column()
  declare senderAddress: string

  @column()
  declare senderCity: string

  @column()
  declare senderProvince: string

  @column()
  declare senderCountry: string

  @column()
  declare senderPostalCode: string

  // Receiver details
  @column()
  declare receiverFirstName: string

  @column()
  declare receiverLastName: string | null

  @column()
  declare receiverPhone: string

  @column()
  declare receiverEmail: string | null

  @column()
  declare receiverAddress: string

  @column()
  declare receiverCity: string

  @column()
  declare receiverProvince: string

  @column()
  declare receiverCountry: string

  @column()
  declare receiverPostalCode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
