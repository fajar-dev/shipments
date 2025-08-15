import { formatDateId } from '#utils/date_formatter'
import edge from 'edge.js'

// Register global helper
edge.global('formatDateId', formatDateId)
