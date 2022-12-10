const { Client } = require('discord.js-commando');
const { join } = require('path');
require("dotenv").config();

const expressServer = require('./backend/server/exprserver.js');
const config = require('./config.json');



const bot = new Client({
  commandPrefix: process.env.botPrefix,
  owner: process.env.ownerId
});

bot.registry
  .registerDefaults()
  .registerGroup('mod', 'Moderation', true)
  .registerCommandsIn({
    dirname: join(__dirname, 'commands'),
    // Ignore any filename with a prefixing underscore
    excludeDirs: /_\w+\.?/,
  });

bot.once('ready', () => {
  console.log('Bot up!');
});

// Start our server
expressServer.start();

// Start our discord bot
// (this goes last since)
// bot.login is blocking
bot.login(process.env.botToken)

