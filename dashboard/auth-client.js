require('dotenv').config();
const OAuthClient = require('disco-oauth');
const config = require('../config.json');

const client = new OAuthClient(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
client.setRedirect(`${config.dashboardURL}/auth`);
client.setScopes('identify', 'guilds');

module.exports = client;