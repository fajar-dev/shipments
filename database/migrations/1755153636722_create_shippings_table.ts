import { Brand } from '#enums/brand'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shippings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.enum('brand', Object.values(Brand)).defaultTo(Brand.NONE)
      table.integer('weight')
      table.date('shipping_date')
      table.string('track_number')
      table.text('shipping_note').nullable()

      // Sender details
      table.string('sender_first_name')
      table.string('sender_last_name').nullable()
      table.string('sender_phone')
      table.string('sender_email').nullable()
      table.text('sender_address')
      table.string('sender_city')
      table.string('sender_province')
      table.string('sender_country')
      table.string('sender_postal_code')

      // Receiver details
      table.string('receiver_first_name')
      table.string('receiver_last_name').nullable()
      table.string('receiver_phone')
      table.string('receiver_email').nullable()
      table.text('receiver_address')
      table.string('receiver_city')
      table.string('receiver_province')
      table.string('receiver_country')
      table.string('receiver_postal_code')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
