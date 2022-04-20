const { Client, Intents } = require('discord.js')
const { PooPooAPI } = require('@retro_ig/poo-poo-api')
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILDS_MESSAGES]
})
const settings = {
    token: '',
    prefix: ''
}
const api = new PooPooAPI({
    logError: true, // or false, if you are going to production
    logAction: true // or false, if you are going to production
})
client.on('ready', () => {
    console.log('ready')
})
client.on('messageCreate', async (message) => {
    if(message.content === `${settings.prefix}question`) {
        await message.reply("I'm working on it!").then(async msg => {
            let apiQotd = await api.qotd()
            await msg.edit(String(apiQotd))
        })
    }
})
client.login(settings.token)