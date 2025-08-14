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
    return await Shipping.query().where('track_number', 'ILIKE', `%${query}%`).paginate(page, limit)
  }
}
