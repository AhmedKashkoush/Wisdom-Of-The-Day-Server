const router = require('express').Router();
const {getAll,getWisdom,createWisdom,updateWisdom,deleteWisdom} = require('../../controller/wisdoms_controller');

router.get('/',getAll);
router.get('/wisdom',getWisdom);
router.post('/create',createWisdom);
router.put('/update/:id',updateWisdom);
router.delete('/delete/:id',deleteWisdom);

module.exports = router;