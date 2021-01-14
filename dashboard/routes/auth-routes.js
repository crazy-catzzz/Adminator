const express = require('express');
const config = require('../../config.json');
const authClient = require('../auth-client');

const router = express.Router();

router.get('/login', (req, res) => res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${config.botID}&redirect_uri=${config.dashboardURL}%2Fauth&response_type=code&scope=identify guilds`));

router.get('/auth', async (req, res) => {
  try {
    const code = req.query.code;
    const key = await authClient.getAccess(code);
    
    res.cookies.set('key', key);
    res.redirect('/dashboard');
  } catch {
    res.redirect('/');
  }
});

router.get('/logout', (req, res) => {
  res.cookies.set('key', '');

  res.redirect('/')
})

module.exports = router;