import { chromium } from 'playwright'

export default class PdfGenerate {
  /**
   * Generate a PDF label from shipment data and barcode.
   * @param data Shipment data object
   * @param barcode Barcode in Base64 format
   * @param view AdonisJS view instance
   * @returns PDF buffer
   */
  static async pdfLabel(data: any, barcode: string, view: any) {
    const html = await view.render('label', { data, barcode })

    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })

    const pdfBuffer = await page.pdf({
      width: '1080px',
      height: '1080px',
      printBackground: true,
    })
    await browser.close()
    return pdfBuffer
  }
}
