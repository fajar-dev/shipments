import type { HttpContext } from '@adonisjs/core/http'
import Response from '#helpers/response'
import { inject } from '@adonisjs/core'
import { ShippingService } from '#services/shipping_service'
import ShippingSerialize from '#serializers/shipping_serializer'

@inject()
export default class ShippingsController {
  constructor(
    private shippingService: ShippingService,
    private shippingSerialize: ShippingSerialize
  ) {}

  async index({ request, response }: HttpContext) {
    const query = request.input('q', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const result = await this.shippingService.findAll(query, page, limit)
    return Response.ok(
      response,
      await this.shippingSerialize.collection(result),
      'Shipments retrieved successfully'
    )
  }
}
