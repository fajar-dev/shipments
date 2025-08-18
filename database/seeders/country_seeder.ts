import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Country from '#models/country'
import fs from 'node:fs'
import app from '@adonisjs/core/services/app'

export default class CountrySeeder extends BaseSeeder {
  public async run() {
    const filePath = app.seedersPath('data/countries.json')
    const jsonData = fs.readFileSync(filePath, 'utf-8')
    const country = JSON.parse(jsonData)

    await Country.createMany(
      country.map((row: any) => ({
        id: row.id,
        name: row.name,
      }))
    )
  }
}
