const { Router } = require("express");
const {Profile} = require('@/controllers')

const router = Router()

router.get('/show', Profile.ProfileCtrl.show)

router.route('/update')
    .put(Profile.ProfileCtrl.update)
    .patch(Profile.ProfileCtrl.update)

router.route('/password')
    .put(Profile.ProfileCtrl.password)
    .patch(Profile.ProfileCtrl.password)

router.get('/reviews', Profile.ProfileCtrl.reviews)

router.get('/orders', Profile.ProfileCtrl.orders)

module.exports = router;