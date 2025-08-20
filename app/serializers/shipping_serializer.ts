import Shipping from '#models/shipping'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface ShippingResponseInterface {
  id: string
  brand: string
  shippingNote: string | null

  sender: {
    fullName: string
    phone: string
    email: string | null
    address: string
    city: string
    province: any | null
    country: any | null
    postalCode: number
  }

  receiver: {
    fullName: string
    phone: string
    email: string | null
    address: string
    city: string
    province: any | null
    country: any | null
    postalCode: number
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
      id: shipping.uuid,
      brand: shipping.brand,
      shippingNote: shipping.shippingNote,

      sender: {
        fullName: [shipping.senderFirstName, shipping.senderLastName].filter(Boolean).join(' '),
        phone: shipping.senderPhone,
        email: shipping.senderEmail,
        address: shipping.senderAddress,
        city: shipping.senderCity,
        country: shipping.senderProvinces?.country
          ? {
              id: shipping.senderProvinces.country.uuid,
              name: shipping.senderProvinces.country.name,
            }
          : null,
        province: shipping.senderProvinces
          ? {
              id: shipping.senderProvinces.uuid,
              name: shipping.senderProvinces.name,
            }
          : null,
        postalCode: shipping.senderPostalCode,
      },

      receiver: {
        fullName: [shipping.receiverFirstName, shipping.receiverLastName].filter(Boolean).join(' '),
        phone: shipping.receiverPhone,
        email: shipping.receiverEmail,
        address: shipping.receiverAddress,
        city: shipping.receiverCity,
        country: shipping.receiverProvinces?.country
          ? {
              id: shipping.receiverProvinces.country.uuid,
              name: shipping.receiverProvinces.country.name,
            }
          : null,
        province: shipping.receiverProvinces
          ? {
              id: shipping.receiverProvinces.uuid,
              name: shipping.receiverProvinces.name,
            }
          : null,
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
