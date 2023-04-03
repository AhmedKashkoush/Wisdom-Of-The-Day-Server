const router = require('express').Router();
const {create} = require('../../controller/users_controller');

// router.get('/',getAll);
// router.get('/wisdom',getWisdom);
router.post('/signup',create);
// router.put('/update/:id',updateWisdom);
// router.delete('/delete/:id',deleteWisdom);

module.exports = router;