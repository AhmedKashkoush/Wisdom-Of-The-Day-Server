const fs = require('file-system')
const path = require('path')
const jwt = require('jsonwebtoken')
const { IncomingForm } = require('formidable')
const User = require('../model/user')
const { hash, compare } = require('../public/bcrypt')
const { success, failure } = require('../public/response')

const create = async (req, res) => {
  const form = new IncomingForm()
  form.parse(req, async (err, fields, files) => {
    try {
      if (!fields) return failure(res, err)
      if (err) return failure(res, err)
      const user = new User(fields)
      const { email, password } = fields
      const hashPassword = hash(password)
      user.password = hashPassword
      const { image } = files
      if (image) {
        const mime = image.mimetype.split('/')[1]
        const filename = `${Date.now()}.${mime}`
        const uploadDir = path.join(__dirname, '../images', email, filename)
        fs.copyFile(image.filepath, uploadDir)
        user.image = filename
      }
      await user.save()
      return success(res, { data: user })
    } catch (error) {
      return failure(res, error)
    }
  })
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return failure(res, { message: 'This user does not exist', code: 400 })
    const isMatched = compare(password, user.password)
    if (!isMatched)
      return failure(res, {
        message: 'The email or password is not correct',
        code: 400
      })
    const token = jwt.sign({ user }, 'user')
    return success(res, { data: user, token })
  } catch (error) {
    return failure(res, error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const accessToken = req.headers['access-token']
    const token = accessToken.split(' ')[1]
    const { email, image } = jwt.verify(token, 'user').user

    const user = await User.findOneAndDelete({ email })
    if (!user)
      return failure(res, { message: 'This user does not exist', code: 400 })
    if (image) {
      const uploadDir = path.join(__dirname, '../images', email)
      fs.rmdirSync(uploadDir)
    }
    return success(res, { message: 'User deleted' })
  } catch (error) {
    return failure(res, error)
  }
}

module.exports = { create, login, deleteUser }

// const uploadImage = (req,filename) => {
// }
