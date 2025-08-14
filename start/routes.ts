/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ShippingsController = () => import('#controllers/shippings_controller')
import router from '@adonisjs/core/services/router'

router.post('/shipments', [ShippingsController, 'index'])
