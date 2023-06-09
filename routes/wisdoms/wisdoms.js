const router = require('express').Router();
const {isSignedIn} = require('../../middleware/auth');
const {tracer} = require('../../middleware/request_tracer');
const {getAll,getWisdom,createWisdom,updateWisdom,deleteWisdom} = require('../../controller/wisdoms_controller');

router.use(tracer);
router.use(isSignedIn);
router.get('/',getAll);
router.get('/wisdom',getWisdom);
router.post('/create',createWisdom);
router.put('/update/:id',updateWisdom);
router.delete('/delete/:id',deleteWisdom);

module.exports = router;