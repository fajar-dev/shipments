import Country from '#models/country'
import Province from '#models/province'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class AdministativeAreaService {
  /**
   * Get paginated Country records matching a query.
   * @param query Search string for track number
   * @param page Page number
   * @param limit Items per page
   * @returns Paginated Contry records
   */
  async findAllCountry(
    query: string,
    page: number,
    limit: number
  ): Promise<ModelPaginatorContract<Country>> {
    return await Country.query().whereILike('name', `%${query}%`).paginate(page, limit)
  }

  /**
   * Get paginated Province records matching a query by Country UUID.
   * @param countryUuid Country UUID
   * @param query Search string for track number
   * @param page Page number
   * @param limit Items per page
   * @returns Paginated Shipping records
   */
  async findAllProvinceByCountry(
    countryUuid: string,
    query: string,
    page: number,
    limit: number
  ): Promise<ModelPaginatorContract<Province>> {
    return await Province.query()
      .whereILike('name', `%${query}%`)
      .whereHas('country', (q) => {
        q.where('uuid', countryUuid)
      })
      .paginate(page, limit)
  }

  /**
   * Get a Country data by UUID.
   * @param uuid Country UUID
   * @returns Country data
   */
  async findOneCountry(uuid: string): Promise<Country> {
    return await Country.findByOrFail('uuid', uuid)
  }
  /**
   * Get a province data by UUID.
   * @param uuid Province UUID
   * @returns Province data
   */
  async findOneProvince(uuid: string): Promise<Province> {
    return await Province.findByOrFail('uuid', uuid)
  }
}
