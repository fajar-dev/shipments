import Province from '#models/province'
import fs from 'node:fs'
import app from '@adonisjs/core/services/app'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const filePath = app.seedersPath('data/provinces.json')
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const provinces = JSON.parse(jsonData)

    await Province.createMany(
      provinces.map((row: any) => ({
        id: row.id,
        name: row.name,
        countryId: row.country_id,
      }))
    )
  }
}
