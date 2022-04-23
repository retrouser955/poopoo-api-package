# PooPooAPI package by Retrouser955 :D

This is unofficial btw

# Installing the package

npm
```
npm i @retro_ig/poopoo-api-package
```
yarn
```
yarn add @retro_ig/poopoo-api-package
```

## Example
```js
const { PooPooAPI } = require('@retro_ig/poopoo-api-package')
const api = new PooPooAPI({
    logError: true, //this will log node-fetch errors
    logAction: true //this will log every action
})
const apiTest = async () => {
    //password generation
    let pass = await api.passwordGenerator()
    console.log(pass)
    //is valid url
    let url = await api.isValidUrl('https://google.com')
    console.log(url)
    //Random Questions
    let apiQotd = await api.qotd()
    console.log(apiQotd)
    //github data
    const github = await api.githubUserData('retrouser955')
    console.log(github)
    //binary encoder
    const binary = await api.binaryEncoder('Hello World!')
    console.log(binary)
    //binary decoder
    const decodedText = await api.binaryDecoder('01101000 01101001')
    console.log(decodedText)
    //annoying discord spoilers
    const spoilers = await api.discordSpoilers('Hello World!')
    console.log(spoilers)
    //remove emoji from text
    const emoji = await api.emojiRemover('Hello Road 🛣')
    console.log(emoji)
    //yt search
    const ytSearch = await api.youtubeSearch('Alan Walker Faded')
    console.log(ytSearch.results[0].title)
    // Web Screenshot
    /** 
     * the first option is the site
     * second option is a boolean and it tells the package to turn the link into a discord message attachment
     * the third option is the file name and this is optional
     * **/
    const link = await api.webScreenShot('https://discord.com', true, 'discord.png')
    console.log(link)
}
apiTest()
```