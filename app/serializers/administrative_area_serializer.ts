import Country from '#models/country'
import Province from '#models/province'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AreaInterface {
  id: string
  name: string
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
  data: AreaInterface[]
}

export default class AdministativeAreaSerialize {
  async single(area: Province | Country): Promise<AreaInterface> {
    return {
      id: area.uuid,
      name: area.name,
    }
  }

  async collection(datas: ModelPaginatorContract<Province | Country>): Promise<PaginatedResponse> {
    return {
      meta: datas.getMeta(),
      data: await Promise.all(datas.all().map((item) => this.single(item))),
    }
  }
}
