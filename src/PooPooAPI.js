const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
const generatePassword = require('./passwordgenerate.js')
const listsGetRandomItem =  require('./listGetRandom.js')
class PooPooAPI {
    /**
     * @param {string} key 
     */
    constructor(key) {
        if(!key) {
            this.key = null
            console.warn('PooPooAPI Warning: No API key was provided')
        } else {
            this.key = key
        }
    }
    /**
     * @param {string} url
     */
    async isValidUrl(url) {
        /**
         * @param {boolean} ValidUrl if the url is valid or not
         */
        if(!url) throw new Error('PooPooAPI Error: Url must be a non-empty string')
        try {
            new URL(url)
        } catch {
            return false
        }
        return true
    }
    async qotd() {
        /**
         * @param {string} qotd returns a qotd
         */
        try {
            const res = await fetch('https://api.frostzzone.repl.co/qotd')
            const data = await res.json()
            return data['question']
        } catch {
            console.warn('There was an error while connecting to the API. Using the built in list. [Note that the list might be outdated]')
            const list = [
                "Are you happy about yourself?",
                "Do you like playing video games? If yes, then what is your favorite game genre?",
                "What was your favorite hobby as a kid?",
                "Has your life been rough recently?",
                "Why did you choose your usernames? What is the story behind them?",
                "If you have a chance to change the past, what would you change?",
                "Have you ever been bullied at school/work? What did you do to stop the bullying?",
                "Do you know any coding languages?",
                "Is there anything that you about yourself that you find weird?",
                "What continents are you from? (Asia/Africa/North America/South America/Antarctica/Europe/Australia)",
                "[Troll Question] Do you like hamburger with pinapples?",
                "Would you rather to eat at KFC or McDonalds?",
                "Have you broken any rules in a Discord server?",
                "Do you have a job? If yes, then what is it?",
                "What is your favorite season? (Spring/Summer/Autumn/Winter)",
                "What do you do during freetimes?",
                "Would you consider yourself a nerd?",
                "If you have a choice to choose your nationality, what country would you want to be in?",
                "What chatting app do you use the most? (Discord, Skype, Twitter DM, Messenger, Slack, etc)",
                "Does Children's Online Privacy Protection Rule (\"COPPA\") actually protects children or is it blocking kids from seeing the reality?",
                "Do you have enough money to afford Minecraft?",
                "If you have a chance to change your past, what would you change?",
                "Have you ever been hacked? If yes, how did you try to get your accounts back?",
                "What can you do to calm yourself down when you are mad?"
            ]
            listsGetRandomItem(list, false)
            return list
        }
    }
    async passwordGenerator() {
        /**
         * @param {object} passwordAndRecoveryCode
         */
        var outcome = []
        await generatePassword.loopPassword(outcome)
        var password = outcome.join('')
        var recoverCode = []
        await generatePassword.loopRecover(recoverCode)
        let object = {
            password: '',
            recoverCode: ''
        }
        object.password = String(password)
        object.recoverCode = String(recoverCode.join(''))
        const finalData = {
            password: object.password,
            recoverCode: object.recoverCode
        }
        return finalData
    }
    /**
     * 
     * @param {string} user 
     */
    async githubUserData(user) {
        /**
         * @param {object} githubData
         */
        if (!user) {
            throw new Error('PooPooAPI Error: User must be a non-empty string')
        }
        const response = await fetch(`https://api.github.com/users/${user}`)
        const data = await response.json()
        const object = new Object()
        object['url'] = data.url
        object['avatar'] = data.avatar_url
        object['account_type'] = data.type
        object['name'] = data.login
        if (data.company == null) {
            object['company'] = "None"
        } else {
            object['company'] = data.company
        }
        if (data.blog == null) {
            object['blog'] = "None"
        } else {
            object['blog'] = data.blog
        }
        if (data.location == null) {
            object['location'] = "Not set"
        } else {
            object['location'] = data.location
        }
        if (data.email == null) {
            object['email'] = "None"
        } else {
            object['email'] = data.email
        }
        if (data.bio == null) {
            object['bio'] = "No Bio"
        } else {
            object['bio'] = data.bio
        }
        if (data.twitter_username == null) {
            object['twitter'] = "Not Set"
        } else {
            object['twitter'] = data.twitter_username
        }
        object['public_repos'] = data.public_repos
        object['public_gists'] = data.public_gists
        object['followers'] = data.followers
        object['following'] = data.following
        object['created_at'] = data.created_at
        object['updated_at'] = data.updated_at
        return object
    }
    /**
     * 
     * @param {string} text
     */
    async binaryEncoder(text) {
        /**
         * @param {string} binaryData
         */
        if(!text) throw new Error('PooPooAPI Error: Text must be a non-empty string')
        const res = await fetch(`https://poopoo-api.vercel.app/api/encode?text=${text}`)
        const data = await res.json()
        return data.binary
    }
    /**
     * 
     * @param {string} binary
     */
    async binaryDecoder(binary) {
        /**
         * @param {string} text
         */
        if(!binary) throw new Error('PooPooAPI Error: Binary must be a non-empty string containing 0s and 1s')
        const res = await fetch(`https://poopoo-api.vercel.app/api/decode?binary=${binary}`)
        const data = await res.json()
        return data.text
    }
    /**
     * 
     * @param {string} spoilers 
     * @returns Annoying Discord Spoilers
     */
    async discordSpoilers(spoilers) {
        if(!spoilers) throw new Error('PooPooAPI Error: Text must be a non-empty string')
        const res = await fetch(`https://poopoo-api.vercel.app/api/spoil?text=${spoilers}`)
        const data = await res.json()
        return data.text
    }
    /**
     * 
     * @param {string} textWithEmoji 
     * @returns Remove emoji from text
     */
    async emojiRemover(textWithEmoji) {
        if(!textWithEmoji) throw new Error('PooPooAPI Error: Text With Emojis must be a non-empty string')
        const res = await fetch(`https://poopoo-api.vercel.app/api/remove?type=emoji&text=${textWithEmoji}`)
        const data = await res.json()
        return data.text
    }
    /**
     * 
     * @param {string} quary 
     * @returns An object with arrays
     */
    async youtubeSearch(quary) {
        if(!quary) throw new Error('PooPooAPI Error: quary must be a non-empty string')
        const res = await fetch(`https://poopoo-api.vercel.app/api/youtube/video?search=${quary}`)
        const data = await res.json()
        return data
    }
}
module.exports = PooPooAPI