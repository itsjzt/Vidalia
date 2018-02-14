const mongoose = require('mongoose')
const URLModal = require('./URLmodal')
const uniqid = require('uniqid');
const isURL = require('is-url')

exports.saveURL = ({original_url, short_url}, callback) => {
  const url = new URLModal({ original_url, short_url })
  url.save(err => {
    if (err) console.error(err)
    if (callback) callback()
  })
}

exports.uniqueStr = () => {
  return uniqid()
}

exports.checkURL = (url) => isURL(url)
