const router = require('express').Router();
const {create,login,deleteUser} = require('../../controller/users_controller');
const {tracer} = require('../../middleware/request_tracer');
const {isSignedIn} = require('../../middleware/auth');

router.use(tracer);
// router.get('/',getAll);
// router.get('/wisdom',getWisdom);
router.post('/login',login);
router.post('/signup',create);
router.delete('/delete',isSignedIn,deleteUser);
// router.put('/update/:id',updateWisdom);
// router.delete('/delete/:id',deleteWisdom);

module.exports = router;