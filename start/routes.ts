/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ShippingsController = () => import('#controllers/shippings_controller')
const AdministrativeAreasController = () => import('#controllers/administrative_areas_controller')
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [ShippingsController, 'index'])
    router.post('/', [ShippingsController, 'store'])
    router.post('/label-preview', [ShippingsController, 'labelPreview'])
    router.get('/:id/label', [ShippingsController, 'labelGenerate'])
  })
  .prefix('/shipments')

router
  .group(() => {
    router.get('/', [AdministrativeAreasController, 'country'])
    router.get('/:id', [AdministrativeAreasController, 'province'])
  })
  .prefix('/administrative-area')
