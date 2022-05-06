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
}
apiTest()
```
If you want further information on the API, check out the [Documentation](https://github.com/retrouser955/poopoo-api-package/blob/main/docs/1.1.0.md) and the [API website](https://poopoo-api.vercel.app/)