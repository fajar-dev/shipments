import { DateTime } from 'luxon'
import { v7 as uuidv7 } from 'uuid'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import Country from '#models/country'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Province extends BaseModel {
  @beforeCreate()
  public static async createUUID(model: Province) {
    model.uuid = uuidv7()
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare countryId: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Country, {
    foreignKey: 'countryId',
  })
  declare country: BelongsTo<typeof Country>
}
