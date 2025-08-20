import Shipping from '#models/shipping'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class ShippingService {
  /**
   * Get paginated shipment records matching a query.
   * @param query Search string for track number
   * @param page Page number
   * @param limit Items per page
   * @returns Paginated Shipping records
   */
  async findAll(
    query: string,
    page: number,
    limit: number
  ): Promise<ModelPaginatorContract<Shipping>> {
    return await Shipping.query()
      .whereILike('receiver_first_name', `%${query}%`)
      .preload('senderProvinces', (q) => {
        q.preload('country')
      })
      .preload('receiverProvinces', (q) => {
        q.preload('country')
      })
      .paginate(page, limit)
  }

  /**
   * Get a shipment record by ID.
   * @param uuid Shipment UUID
   * @returns Shipping record
   */
  async findOne(uuid: string): Promise<Shipping> {
    return await Shipping.query()
      .where('uuid', uuid)
      .preload('senderProvinces', (q) => q.preload('country'))
      .preload('receiverProvinces', (q) => q.preload('country'))
      .firstOrFail()
  }

  /**
   * Create a new shipment record.
   * @param payload Shipment data
   * @param senderProvinceId Sender's province ID
   * @param receiverProvinceId Receiver's province ID
   * @returns Newly created Shipping instance
   */
  async store(
    payload: any,
    senderProvinceId: number | null,
    receiverProvinceId: number | null
  ): Promise<Shipping> {
    const label = new Shipping()
    label.brand = payload.brand
    label.shippingNote = payload.shippingNote
    label.senderFirstName = payload.senderFirstName
    label.senderLastName = payload.senderLastName
    label.senderPhone = payload.senderPhone
    label.senderEmail = payload.senderEmail
    label.senderAddress = payload.senderAddress
    label.senderCity = payload.senderCity
    label.senderProvinceId = senderProvinceId
    label.senderPostalCode = payload.senderPostalCode
    label.receiverFirstName = payload.receiverFirstName
    label.receiverLastName = payload.receiverLastName
    label.receiverPhone = payload.receiverPhone
    label.receiverEmail = payload.receiverEmail
    label.receiverAddress = payload.receiverAddress
    label.receiverCity = payload.receiverCity
    label.receiverProvinceId = receiverProvinceId
    label.receiverPostalCode = payload.receiverPostalCode
    await label.save()
    return label
  }
}
