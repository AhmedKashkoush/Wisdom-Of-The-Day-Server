const { success, failure } = require('../public/response')
const Wisdom = require('../model/wisdom')
let currentWisdom
const getAll = async (req, res) => {
  console.log(`[${req.method}]`,req.url);
  let { lang } = req.query
  try {
    if (lang) lang = lang.toLowerCase().replace(lang[0], lang[0].toUpperCase())
    console.log(lang)
    const wisdoms =
      // lang
      //   ? await Wisdom.find().select({"image":1, "_id":1,`quote${lang}`:1, `author${lang}`:1, })
      //   :
      await Wisdom.find()
    if (!wisdoms.length)
      return success(res, {
        message: 'No results'
      })
    success(res, {
      data: wisdoms
    })
  } catch (error) {
    failure(res, {
      message: error
    })
  }
}

const getWisdom = async (req, res) => {
  console.log(`[${req.method}]`,req.url);
  const date = new Date().getDay()
  try {
    const wisdoms = await Wisdom.find()
    if (!wisdoms.length)
      return success(res, {
        message: 'No results'
      })
    const randomIndex = Math.floor(Math.random() * wisdoms.length)
    if (!currentWisdom || currentWisdom.date !== date) {
      currentWisdom = wisdoms[randomIndex]
      currentWisdom.date = date
    }
    success(res, {
      data: currentWisdom
    })
  } catch (error) {
    failure(res, {
      message: error
    })
  }
}

const createWisdom = async (req, res) => {
  console.log(`[${req.method}]`,req.url);
  const body = req.body
  try {
    const wisdom = new Wisdom(body)
    await wisdom.save()
    success(res, {
      data: wisdom
    })
  } catch (error) {
    failure(res, {
      message: error
    })
  }
}

const updateWisdom = async (req, res) => {
  console.log(`[${req.method}]`,req.url);
  const { id } = req.params
  const body = req.body
  try {
    const wisdom = await Wisdom.findOneAndUpdate(id, body, { new: true })
    if (!wisdom)
      return failure(res, {
        message: 'Wisdom does not exist'
      })
    success(res, {
      data: wisdom
    })
  } catch (error) {
    failure(res, {
      message: error
    })
  }
}

const deleteWisdom = async (req, res) => {
  console.log(`[${req.method}]`,req.url);
  const { id } = req.params
  try {
    const wisdom = await Wisdom.findOneAndDelete(id)
    if (!wisdom)
      return failure(res, {
        message: 'Wisdom does not exist'
      })
    success(res, {
      data: wisdom
    })
  } catch (error) {
    failure(res, {
      message: error
    })
  }
}

module.exports = {
  getAll,
  getWisdom,
  createWisdom,
  updateWisdom,
  deleteWisdom
}
