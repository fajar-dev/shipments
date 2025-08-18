import type { HttpContext } from '@adonisjs/core/http'
import Response from '#helpers/response'
import { AdministativeAreaService } from '#services/administative_area_service'
import { inject } from '@adonisjs/core'
import AdministativeAreaSerialize from '#serializers/administrative_area_serializer'

@inject()
export default class AdministrativeAreasController {
  constructor(
    private administrativeAreaService: AdministativeAreaService,
    private administrativeAreaSerialize: AdministativeAreaSerialize
  ) {}

  async country({ request, response }: HttpContext) {
    const query = request.input('q', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await this.administrativeAreaService.findAllCountry(query, page, limit)
    return Response.ok(
      response,
      await this.administrativeAreaSerialize.collection(data),
      'Countries retrieved successfully'
    )
  }

  async province({ request, response, params }: HttpContext) {
    const query = request.input('q', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await this.administrativeAreaService.findAllProvinceByCountry(
      params.id,
      query,
      page,
      limit
    )
    return Response.ok(
      response,
      await this.administrativeAreaSerialize.collection(data),
      'Provinces retrieved successfully'
    )
  }
}
