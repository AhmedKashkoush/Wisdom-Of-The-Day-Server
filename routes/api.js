const router = require('express').Router();
const wisdoms = require('./wisdoms/wisdoms');
// const users = require('./users/users');

// router.use('/users',users);
router.use('/wisdoms',wisdoms);

module.exports = router;