import bwipjs from 'bwip-js'

export default class BarcodeGenerate {
  /**
   * Generate barcode PNG in Base64 format
   * @param text Data to be converted into a barcode
   * @param options Additional bwip-js options
   * @returns string Base64 image
   */
  public static async generateBase64(
    text: string,
    options?: {
      bcid?: string
      scale?: number
      height?: number
      includetext?: boolean
      textxalign?: 'center' | 'left' | 'right'
    }
  ): Promise<string> {
    try {
      const png = await bwipjs.toBuffer({
        bcid: options?.bcid || 'code128',
        text: text,
        scale: options?.scale || 10,
        height: options?.height || 10,
        includetext: options?.includetext ?? false,
        textxalign: options?.textxalign || 'center',
      })

      return png.toString('base64')
    } catch (err) {
      console.error('Barcode generation error:', err)
      throw err
    }
  }
}
