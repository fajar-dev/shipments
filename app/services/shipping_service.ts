import Shipping from '#models/shipping'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class ShippingService {
  /**
   * @param query string
   * @param page number
   * @param limit number
   */
  async findAll(
    query: string,
    page: number,
    limit: number
  ): Promise<ModelPaginatorContract<Shipping>> {
    return await Shipping.query().whereILike('track_number', `%${query}%`).paginate(page, limit)
  }

  /**
   * @param payload any
   */
  async store(payload: any): Promise<Shipping> {
    const label = new Shipping()
    label.brand = payload.brand
    label.weight = payload.weight
    label.shippingDate = payload.shippingDate
    label.trackNumber = payload.trackNumber
    label.shippingDate = payload.shippingDate
    label.shippingNote = payload.shippingNote
    label.senderFirstName = payload.senderFirstName
    label.senderLastName = payload.senderLastName
    label.senderPhone = payload.senderPhone
    label.senderEmail = payload.senderEmail
    label.senderAddress = payload.senderAddress
    label.senderCity = payload.senderCity
    label.senderProvince = payload.senderProvince
    label.senderCountry = payload.senderCountry
    label.senderPostalCode = payload.senderPostalCode
    label.receiverFirstName = payload.receiverFirstName
    label.receiverLastName = payload.receiverLastName
    label.receiverPhone = payload.receiverPhone
    label.receiverEmail = payload.receiverEmail
    label.receiverAddress = payload.receiverAddress
    label.receiverCity = payload.receiverCity
    label.receiverProvince = payload.receiverProvince
    label.receiverCountry = payload.receiverCountry
    label.receiverPostalCode = payload.receiverPostalCode
    await label.save()
    return label
  }
}
