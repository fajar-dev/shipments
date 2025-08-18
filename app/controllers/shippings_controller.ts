import type { HttpContext } from '@adonisjs/core/http'
import Response from '#helpers/response'
import { inject } from '@adonisjs/core'
import { ShippingService } from '#services/shipping_service'
import ShippingSerialize from '#serializers/shipping_serializer'
import { labelStore } from '#validators/shippping'
import PdfGenerate from '#helpers/pdf_generate'
import BarcodeGenerate from '#helpers/barcode_generate'
import { Brand } from '#enums/brand'
import { BrandLogos } from '#utils/brand_logo'
import { AdministativeAreaService } from '#services/administative_area_service'

@inject()
export default class ShippingsController {
  constructor(
    private shippingService: ShippingService,
    private administrativeAreaService: AdministativeAreaService,
    private shippingSerialize: ShippingSerialize
  ) {}

  async index({ request, response }: HttpContext) {
    const query = request.input('q', '')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const data = await this.shippingService.findAll(query, page, limit)
    return Response.ok(
      response,
      await this.shippingSerialize.collection(data),
      'Shipments retrieved successfully'
    )
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(labelStore)
    const senderProvinceId = await this.administrativeAreaService.provincefindOne(
      payload.senderProvinceUuid
    )
    const receiverProvinceId = await this.administrativeAreaService.provincefindOne(
      payload.receiverProvinceUuid
    )
    const result = await this.shippingService.store(
      payload,
      senderProvinceId.id,
      receiverProvinceId.id
    )
    const data = await this.shippingService.findOne(result.uuid)
    return Response.created(
      response,
      await this.shippingSerialize.single(data),
      'Shipments created successfully'
    )
  }

  public async label({ view, response, params }: HttpContext) {
    const data = await this.shippingService.findOne(params.id)
    const barcodeBase64 = await BarcodeGenerate.generateBase64(data.trackNumber)
    const brand = data.brand as Brand
    const logo = BrandLogos[brand] || ''
    const pdf = await PdfGenerate.pdfLabel(data, logo, barcodeBase64, view)
    response.header('Content-Type', 'application/pdf')
    response.header('Content-Disposition', `attachment; filename="${data.trackNumber}.pdf"`)
    return response.send(pdf)
  }
}
