import Province from '#models/province'

export class AdministativeAreaService {
  /**
   * Get a shipment record by ID.
   * @param uuid Shipment ID
   * @returns Shipping record
   */
  async provincefindOne(uuid: string): Promise<Province> {
    return await Province.findByOrFail('uuid', uuid)
  }
}
