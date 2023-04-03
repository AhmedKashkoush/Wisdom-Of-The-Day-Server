const bcrypt = require('bcrypt');

const hash = (password) => {
    return bcrypt.hashSync(password,10);
}

const compare = (password,hash) => {
    return bcrypt.compareSync(password,hash);
}

module.exports = {
    hash,compare
}