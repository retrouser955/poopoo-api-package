const fetch = (...args) => import('node-fetch').then(({
    default: fetch
}) => fetch(...args))
const generatePassword = require('./passwordgenerate.js')
const listsGetRandomItem =  require('./listGetRandom.js')
class PooPooAPI {
    /**
     * @param {string} options options for the package
     */
    constructor(options) {
        if(!options) throw new Error('PooPooAPI Error: The Options must be defined')
        if(typeof options !== 'object') throw new SyntaxError('PooPooAPI Syntax Error: The Option must be an object')
        if(!options.logError) throw new Error('PooPooAPI Error: The Error Logging option must be defined')
        if(typeof options.logError != "boolean") throw new SyntaxError('PooPooAPI Syntax Error: The Error Logging option must be a Boolean')
        this.error = options.logError
        if(!options.logAction) throw new Error('PooPooAPI Error: The Action Logging option must be defined')
        if(typeof options.logAction != "boolean") throw new SyntaxError('PooPooAPI Syntax Error: The Action Logging option must be a Boolean')
	    this.logAction = options.logAction
    }
    /**
     * @param {string} url
     * @returns {boolean} check if the url is a valid one
     */
    async isValidUrl(url) {
        if(this.logAction == true) console.log('PooPooAPI Logs: isValidUrl has started processing.')
        if(!url) throw new Error('PooPooAPI Error: Url must be a non-empty string')
        try {
            new URL(url)
        } catch {
            if(this.logAction == true) console.log('PooPooAPI Logs: isValidUrl has finished processing.')
            return false
        }
        if(this.logAction == true) console.log('PooPooAPI Logs: isValidUrl has finished processing.')
        return true
    }
    /**
     * @returns {string} random question
     */
    async qotd() {
            if(this.logAction == true) console.log('PooPooAPI Logs: Qotd has started processing.')
        try {
            const res = await fetch('https://api.frostzzone.repl.co/qotd')
            const data = await res.json()
            if(this.logAction == true) console.log('PooPooAPI Logs: Qotd has finished processing.')
            return data['question']
        } catch {
            console.warn('PooPooAPI Warning: There was an error while connecting to the API. Using the built in list. [Note that the list might be outdated]')
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
            await listsGetRandomItem(list, false)
            return list
        }
    }
    async passwordGenerator() {
        /**
         * @param {object} passwordAndRecoveryCode
         * @returns {object} returns a password and a recover code as an object
         */
        try {
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
        } catch (error) {
            console.warn("PooPooAPI Warning: There was an error while generating password.")
            if(this.error == true) return console.log(error)
        }
    }
    /**
     * 
     * @param {string} user 
     * @returns {object} github user data
     */
    async githubUserData(user) {
        if (!user) {
            throw new Error('PooPooAPI Error: User must be a non-empty string')
        }
        if(this.logAction == true ) console.log('PooPooAPI Logs: github User Data has started processing.')
        try {
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
            if(this.logAction == true ) console.log('PooPooAPI Logs: github User Data has finished processing.')
            return object
        } catch (error) {
            console.warn('PooPooAPI Warning: There was an error while getting github data from the API.')
            if(this.error == true) console.log(error)
            return null
        }
    }
    /**
     * 
     * @param {string} text
     * @returns {string} encodes text into binary
     */
    async binaryEncoder(text) {
        if(!text) throw new Error('PooPooAPI Error: Text must be a non-empty string')
        if(this.logAction == true ) console.log('PooPooAPI Logs: binary encoder has started processing.')
        try {
            const res = await fetch(`https://poopoo-api.vercel.app/api/encode?text=${text}`)
            const data = await res.json()
            if(this.logAction == true ) console.log('PooPooAPI Logs: binary encoder has finished processing.')
            return data.binary
        } catch (error) {
            console.warn('PooPooAPI Warning: There was an error while getting encoding data from the API.')
            if(this.error == true) console.log(error)
            return null
        }
    }
    /**
     * 
     * @param {string} binary
     * @returns {string} decoded text
     */
    async binaryDecoder(binary) {
        if(!binary) throw new Error('PooPooAPI Error: Binary must be a non-empty string containing 0s and 1s')
        if(this.logAction == true ) console.log('PooPooAPI Logs: binary decoder has started processing.')
        try {
            const res = await fetch(`https://poopoo-api.vercel.app/api/decode?binary=${binary}`)
            const data = await res.json()
            if(this.logAction == true ) console.log('PooPooAPI Logs: binary decoder has finished processing.')
            return data.text
        } catch (error) {
            console.warn('PooPooAPI Warning: There was an error while getting decoding data from the API.')
            if(this.error == true) console.log(error)
            return null
        }
    }
    /**
     * 
     * @param {string} spoilers 
     * @returns {string} Annoying Discord Spoilers
     */
    async discordSpoilers(spoilers) {
        if(!spoilers) throw new Error('PooPooAPI Error: Text must be a non-empty string')
        if(this.logAction == true ) console.log('PooPooAPI Logs: discord spoilers has started processing.')
        try {
            const res = await fetch(`https://poopoo-api.vercel.app/api/spoil?text=${spoilers}`)
            const data = await res.json()
            if(this.logAction == true ) console.log('PooPooAPI Logs: discord spoilers has finished processing.')
            return data.text
        } catch (error) {
            console.warn('PooPooAPI Warning: There was an error while getting spoilers from the API.')
            if(this.error == true) console.log(error)
            return null
        }

    }
    /**
     * 
     * @param {string} textWithEmoji 
     * @returns Remove emoji from text
     */
    async emojiRemover(textWithEmoji) {
        if(!textWithEmoji) throw new Error('PooPooAPI Error: Text With Emojis must be a non-empty string')
        if(this.logAction == true ) console.log('PooPooAPI Logs: emoji remover has started processing.')
        try {
            const res = await fetch(`https://poopoo-api.vercel.app/api/remove?type=emoji&text=${textWithEmoji}`)
            const data = await res.json()
            if(this.logAction == true ) console.log('PooPooAPI Logs: emoji remover has finished processing.')
            return data.text
        } catch(e) {
            console.warn(`PooPooAPI Warning: There was an error while connecting to the API`)
            if(this.error == false) return
            console.log(e)
            return null
        }
    }
    /**
     * 
     * @param {string} quary 
     * @returns An object with arrays
     */
    async youtubeSearch(quary) {
        if(!quary) throw new Error('PooPooAPI Error: quary must be a non-empty string')
        if(this.logAction == true ) console.log('PooPooAPI Logs: youtube search has started processing.')
        try {
            const res = await fetch(`https://poopoo-api.vercel.app/api/youtube/video?search=${quary}`)
            const data = await res.json()
            if(this.logAction == true ) console.log('PooPooAPI Logs: youtube finished has started processing.')
            return data
        } catch (e) {
            console.warn(`PooPooAPI Warning: There was an error while connecting to the API`)
            if(this.error == false) return
            console.log(e)
            return null
        }
    }
}
module.exports = PooPooAPI