const { PooPooAPI, version } = require('../index.js')
const api = new PooPooAPI({
    logError: true,
    logAction: true
})
const apiTest = async () => {
    // console.log(version)
    // let pass = await api.passwordGenerator()
    // let apiQotd = await api.qotd()
    // let url = await api.isValidUrl('httpsm')
    // console.log(pass)
    // console.log(url)
    // console.log(apiQotd)
    // const github = await api.githubUserData('frostzzone')
    // console.log(github)
    // const binary = await api.binaryEncoder('Hello World!')
    // console.log(binary)
    // const decodedText = await api.binaryDecoder('01101000 01101001')
    // console.log(decodedText)
    // const spoilers = await api.discordSpoilers('Hello I am a human male')
    // console.log(spoilers)
    // const emoji = await api.emojiRemover('cjidoalcnoaskl🛣')
    // console.log(emoji)
    // const ytSearch = await api.youtubeSearch('MEMORIES! 347aidian')
    // console.log(ytSearch.results[0].title)
    // const roman = await api.romanNumeralsConverter('69')
    // console.log(roman)
    const link = await api.webScreenShot('https://discord.com', true, 'discord.png')
    console.log(link)
}
apiTest()