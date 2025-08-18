import { Brand } from '#enums/brand'
import vine from '@vinejs/vine'
import { provinceBelongsToCountryRule } from '#validatorsRules/province_belongsto_country'

export const labelStore = vine.compile(
  vine.object({
    brand: vine.enum(Object.values(Brand)),
    weight: vine.number(),
    shippingDate: vine.date(),
    trackNumber: vine.string(),
    shippingNote: vine.string().nullable().optional(),

    senderFirstName: vine.string(),
    senderLastName: vine.string().nullable().optional(),
    senderPhone: vine.string(),
    senderEmail: vine.string().nullable().optional(),
    senderAddress: vine.string(),
    senderCity: vine.string(),
    senderCountryUuid: vine.string().exists({
      table: 'countries',
      column: 'uuid',
    }),
    senderProvinceUuid: vine
      .string()
      .exists({ table: 'provinces', column: 'uuid' })
      .use(
        provinceBelongsToCountryRule({
          provinceUuid: 'senderProvinceUuid',
          countryUuidField: 'senderCountryUuid',
        })
      ),
    senderPostalCode: vine.string(),

    receiverFirstName: vine.string(),
    receiverLastName: vine.string().nullable().optional(),
    receiverPhone: vine.string(),
    receiverEmail: vine.string().nullable().optional(),
    receiverAddress: vine.string(),
    receiverCity: vine.string(),
    receiverCountryUuid: vine.string().exists({
      table: 'countries',
      column: 'uuid',
    }),
    receiverProvinceUuid: vine
      .string()
      .exists({ table: 'provinces', column: 'uuid' })
      .use(
        provinceBelongsToCountryRule({
          provinceUuid: 'receiverProvinceUuid',
          countryUuidField: 'receiverCountryUuid',
        })
      ),
    receiverPostalCode: vine.string(),
  })
)
