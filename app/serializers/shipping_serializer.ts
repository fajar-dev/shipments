import Shipping from '#models/shipping'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface ShippingResponseInterface {
  id: string
  brand: string
  weight: number
  shippingDate: string
  trackNumber: string
  shippingNote: string | null

  sender: {
    firstName: string
    lastName: string | null
    phone: string
    email: string | null
    address: string
    city: string
    province: string
    country: string
    postalCode: string
  }

  receiver: {
    firstName: string
    lastName: string | null
    phone: string
    email: string | null
    address: string
    city: string
    province: string
    country: string
    postalCode: string
  }
}

interface PaginationMetaInterface {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  firstPageUrl: string
  lastPageUrl: string
  nextPageUrl: string | null
  previousPageUrl: string | null
}

interface PaginatedResponse {
  meta: PaginationMetaInterface
  data: ShippingResponseInterface[]
}

export default class ShippingSerialize {
  async single(shipping: Shipping): Promise<ShippingResponseInterface> {
    return {
      id: shipping.id,
      brand: shipping.brand,
      weight: shipping.weight,
      shippingDate: shipping.shippingDate?.toISODate() ?? '',
      trackNumber: shipping.trackNumber,
      shippingNote: shipping.shippingNote,

      sender: {
        firstName: shipping.senderFirstName,
        lastName: shipping.senderLastName,
        phone: shipping.senderPhone,
        email: shipping.senderEmail,
        address: shipping.senderAddress,
        city: shipping.senderCity,
        province: shipping.senderProvince,
        country: shipping.senderCountry,
        postalCode: shipping.senderPostalCode,
      },

      receiver: {
        firstName: shipping.receiverFirstName,
        lastName: shipping.receiverLastName,
        phone: shipping.receiverPhone,
        email: shipping.receiverEmail,
        address: shipping.receiverAddress,
        city: shipping.receiverCity,
        province: shipping.receiverProvince,
        country: shipping.receiverCountry,
        postalCode: shipping.receiverPostalCode,
      },
    }
  }

  async collection(datas: ModelPaginatorContract<Shipping>): Promise<PaginatedResponse> {
    return {
      meta: datas.getMeta(),
      data: await Promise.all(datas.all().map((item) => this.single(item))),
    }
  }
}
