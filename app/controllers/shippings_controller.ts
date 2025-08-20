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

  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(labelStore)

    const senderProvince = payload.senderProvinceUuid
      ? await this.administrativeAreaService.findOneProvince(payload.senderProvinceUuid)
      : null

    const receiverProvince = payload.receiverProvinceUuid
      ? await this.administrativeAreaService.findOneProvince(payload.receiverProvinceUuid)
      : null

    const result = await this.shippingService.store(
      payload,
      senderProvince?.id ?? null,
      receiverProvince?.id ?? null
    )

    const data = await this.shippingService.findOne(result.uuid)

    return Response.created(
      response,
      await this.shippingSerialize.single(data),
      'Shipments created successfully'
    )
  }

  public async labelGenerate({ view, response, params }: HttpContext) {
    const data = await this.shippingService.findOne(params.id)

    const barcodeBase64 = data.trackNumber
      ? await BarcodeGenerate.generateBase64(data.trackNumber)
      : null

    const brand = data.brand as Brand
    const logo = BrandLogos[brand] ?? ''

    const pdf = await PdfGenerate.pdfLabel(data, logo, barcodeBase64 ?? null, view)

    response.header('Content-Type', 'application/pdf')
    response.header(
      'Content-Disposition',
      `attachment; filename="${data.trackNumber ?? 'label'}.pdf"`
    )

    return response.send(pdf)
  }

  public async labelPreview({ view, response, request }: HttpContext) {
    const payload = await request.validateUsing(labelStore)
    const barcodeBase64 = payload.trackNumber
      ? await BarcodeGenerate.generateBase64(payload.trackNumber)
      : null

    const brand = payload.brand as Brand
    const logo = BrandLogos[brand] ?? ''

    const senderProvince = payload.senderProvinceUuid
      ? await this.administrativeAreaService.findOneProvince(payload.senderProvinceUuid)
      : null

    const receiverProvince = payload.receiverProvinceUuid
      ? await this.administrativeAreaService.findOneProvince(payload.receiverProvinceUuid)
      : null

    const mergedPayload = {
      ...payload,
      senderProvinces: senderProvince ? senderProvince.toJSON() : null,
      receiverProvinces: receiverProvince ? receiverProvince.toJSON() : null,
    }

    const pdf = await PdfGenerate.pdfLabel(mergedPayload, logo, barcodeBase64 ?? null, view)

    response.header('Content-Type', 'application/pdf')
    response.header(
      'Content-Disposition',
      `inline; filename="${payload.trackNumber ?? 'label'}.pdf"`
    )

    return response.send(pdf)
  }
}
