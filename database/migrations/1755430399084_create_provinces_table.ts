import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'provinces'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('country_id')
        .unsigned()
        .references('id')
        .inTable('countries')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')
        .notNullable()
      table.uuid('uuid').notNullable().index()
      table.string('name').notNullable().collate('utf8mb4_unicode_ci')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
