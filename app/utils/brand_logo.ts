import { Brand } from '#enums/brand'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

// Fungsi convert file PNG ke Base64
function loadLogoBase64(filename: string): string {
  try {
    const logoPath = app.publicPath('logos/' + filename)
    if (!fs.existsSync(logoPath)) return ''
    const base64Data = fs.readFileSync(logoPath, { encoding: 'base64' })
    return `data:image/png;base64,${base64Data}`
  } catch {
    return ''
  }
}

// Mapping brand ke Base64 logo
export const BrandLogos: Record<Brand, string> = {
  [Brand.NONE]: '',
  [Brand.NUSANET]: loadLogoBase64('nusanet.png'),
  [Brand.NUSAID_CLOUD]: loadLogoBase64('nusaid.png'),
  [Brand.NUSAFIBER]: loadLogoBase64('nusafiber.png'),
  [Brand.NUSAWORK]: loadLogoBase64('nusawork.png'),
  [Brand.NUSAPROSPECT]: loadLogoBase64('nusaprospect.png'),
}
