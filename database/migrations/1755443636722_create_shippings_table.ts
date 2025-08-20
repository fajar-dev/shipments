import { Brand } from '#enums/brand'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shippings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').notNullable().index()
      table.enum('brand', Object.values(Brand)).defaultTo(Brand.NONE).notNullable()
      table.text('shipping_note').nullable()

      // Sender details
      table.string('sender_first_name').notNullable()
      table.string('sender_last_name').nullable()
      table.string('sender_phone').notNullable()
      table.string('sender_email').nullable()
      table.text('sender_address').notNullable()
      table.string('sender_city').notNullable()
      table
        .integer('sender_province_id')
        .unsigned()
        .references('id')
        .inTable('provinces')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
        .nullable()
      table.integer('sender_postal_code').notNullable()

      // Receiver details
      table.string('receiver_first_name').notNullable()
      table.string('receiver_last_name').nullable()
      table.string('receiver_phone').notNullable()
      table.string('receiver_email').nullable()
      table.text('receiver_address').notNullable()
      table.string('receiver_city').notNullable()
      table
        .integer('receiver_province_id')
        .unsigned()
        .references('id')
        .inTable('provinces')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')
      table.integer('receiver_postal_code').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
