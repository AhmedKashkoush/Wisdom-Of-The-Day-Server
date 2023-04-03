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
      return success(res,{data: user})
    } catch (error) {
      return failure(res, error)
    }
  })
}

module.exports = { create }

// const uploadImage = (req,filename) => {
// }
