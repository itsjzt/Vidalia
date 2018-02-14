const mongoose = require('mongoose')
const URLModal = require('./URLmodal')
const uniqid = require('uniqid');
const isURL = require('is-url')

exports.saveURL = ({original_url, short_url}, callback) => {
  const url = new URLModal({ original_url, short_url })
  url.save(err => {
    if (err) console.error(err)
    if (callback) callback(url)
  })
}

exports.uniqueStr = () => {
  return uniqid()
}

exports.findAndRedirect = async (req, res) => {
  const { short_url } = req.params
  const { original_url } = await URLModal.findOne({short_url})
  console.log(original_url)
  res.redirect(original_url)
}

exports.checkURL = (url) => isURL(url)
