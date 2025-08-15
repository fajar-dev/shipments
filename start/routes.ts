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

router
  .group(() => {
    router.get('/', [ShippingsController, 'index'])
    router.post('/', [ShippingsController, 'store'])
  })
  .prefix('/shipments')
