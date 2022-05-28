const ShortUrl = require('../models/shorturlModel');
const dns = require('dns');

// @desc post shorturl
// @route POST /api/shorturl
const postURL = (req, res) => {
  // new redirect link
  const newRedirect = {
    shortUrl: ShortUrl.length + 1,
    originalUrl: req.body.url
  };

  console.log('req.body.url - ' + req.body.url);

  // format link for dns lookup
  const regex = /^https?:\/\//i;

  // check for valid http://www format
  if (!regex.test(newRedirect.originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  let urlObject = new URL(newRedirect.originalUrl);

  // dns lookup for valid url
  dns.lookup(urlObject.hostname, (err, address, family) => {
    // invalid url
    if (!urlObject || err) {
      return res.json({ error: 'invalid url' });
    }
    // push redirect link
    ShortUrl.push(newRedirect);
    res.json({
      original_url: newRedirect.originalUrl,
      short_url: newRedirect.shortUrl
    });
  });
};

// get shortUrl for redirect
const getUrl = (req, res) => {
  let id = req.params.id;

  // find shortUrl
  const found = ShortUrl.find((element) => element.shortUrl == id);

  // not found
  if (!found) {
    return res.json({ error: 'No short URL found for the given input' });
  }

  // redirect
  return res.redirect(found.originalUrl);
};

module.exports = { getUrl, postURL };
