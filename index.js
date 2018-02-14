require('./database')
const express = require('express')
const helper = require('./helper')
const app = express()

app.use(function(req, res, next) {
  req.getUrl = function() {
    return req.protocol + "://" + req.get('host')
  }
  return next()
})

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', {root: __dirname })
})

app.get('/new/:url(*)', (req, res) => {
  const { url } = req.params
  const isURL = helper.checkURL(url)

  if(isURL) {
    const short_url = helper.uniqueStr()
    const urlObj = {original_url: url, short_url}
    helper.saveURL(urlObj, savedURL => {
      const { original_url, short_url } = savedURL
      res.json({ original_url, short_url: `${req.getUrl()}/short/${short_url}` })
    })
  }
  else {
    res.json({ error: 'URL not found' })
  }
})


app.get('/short/:short_url', helper.findAndRedirect)

const port = process.env.PORT || 4567
app.listen(port, () => console.log(`listening on port ${port}!`))