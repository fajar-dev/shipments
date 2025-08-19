import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v7 as uuidv7 } from 'uuid'
import { Brand } from '#enums/brand'
import Province from '#models/province'

export default class Shipping extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Shipping) {
    model.uuid = uuidv7()
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare brand: Brand

  @column()
  declare weight: number | null

  @column()
  declare shippingDate: Date

  @column()
  declare trackNumber: string | null

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
  declare senderProvinceId: number | null

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
  declare receiverProvinceId: number | null

  @column()
  declare receiverPostalCode: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Province, {
    foreignKey: 'senderProvinceId',
  })
  declare senderProvinces: BelongsTo<typeof Province>

  @belongsTo(() => Province, {
    foreignKey: 'receiverProvinceId',
  })
  declare receiverProvinces: BelongsTo<typeof Province>
}
