const mongoose = require('mongoose')
const URLModal = require('./URLmodal')
const uniqid = require('uniqid');
const isURL = require('is-url')

exports.saveURL = ({original_url, short_url}, callback) => {
  const url = new URLModal({ original_url, short_url })
  url.save(err => {
    if (err) return ;
    if (callback) callback(url)
  })
}

exports.uniqueStr = () => {
  return uniqid()
}

exports.findAndRedirect = async (req, res) => {
  const { short_url } = req.params

  try {
    const { original_url } = await URLModal.findOne({short_url})
    res.redirect(original_url)
  }
  catch (error) {
    res.json({error: `URL can't be found in database`})
  }
}

exports.checkURL = (url) => isURL(url)
