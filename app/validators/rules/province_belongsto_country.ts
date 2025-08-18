import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  provinceUuid: string
  countryUuidField: string
}

async function provinceBelongsToCountry(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') return

  const countryUuid = field.parent[options.countryUuidField]
  if (!countryUuid) {
    field.report(
      'The country field is required to validate the province',
      'provinceBelongsToCountry',
      field
    )
    return
  }

  const country = await db.from('countries').where('uuid', countryUuid).first()
  if (!country) {
    field.report('Selected country does not exist', 'provinceBelongsToCountry', field)
    return
  }

  const province = await db
    .from('provinces')
    .where('uuid', value)
    .andWhere('country_id', country.id)
    .first()

  if (!province) {
    field.report(
      'The {{ field }} does not belong to the selected country',
      'provinceBelongsToCountry',
      field
    )
  }
}

export const provinceBelongsToCountryRule = vine.createRule(provinceBelongsToCountry)
