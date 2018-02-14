require('./database')
const express = require('express')
const helper = require('./helper')
const app = express()

app.get('/', (req, res) => {
  res.send('Helloween')
})

app.get('/new/:url(*)', (req, res) => {
  const { url } = req.params
  const isURL = helper.checkURL(url)

  if(isURL) {
    const short_url = helper.uniqueStr()
    const urlObj = {original_url: url, short_url}
    helper.saveURL(urlObj, () => res.json(urlObj))
  }
  else {
    res.json({ error: 'URL not found' })
  }
})

const port = process.env.PORT || 4567
app.listen(port, () => console.log(`listening on port ${port}!`))