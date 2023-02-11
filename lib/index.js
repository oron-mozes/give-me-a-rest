#! /usr/bin/env node
"use strict";
// const fs = require('fs')
// const { argv } = require('node:process')
// const swaggerFilePath = argv
//     .find(arg => arg.startsWith('--file'))
//     ?.split('=')[1]
// if (!swaggerFilePath) {
//     throw 'missing file path'
// }
// const types = {
//     string: '',
//     number: 1,
//     boolean: false,
// }
// const data = fs.readFileSync(swaggerFilePath, { encoding: 'utf8', flag: 'r' })
// const builderTemplate = fs.readFileSync('generator/builderTemplate.txt', {
//     encoding: 'utf8',
//     flag: 'r',
// })
// const swaggerData = JSON.parse(data)
// // for (const schema in swaggerData.schemas) {
// //     const templateCopy = builderTemplate
// // }
// const details = getObjectDetails(
//     'ICondition',
//     swaggerData.components.schemas.ICondition,
//     builderTemplate,
// )
// console.log(details)
// fs.writeFileSync(
//     `./builderICondition.js`,
//     getObjectDetails(
//         'ICondition',
//         swaggerData.components.schemas.ICondition,
//         builderTemplate,
//     ),
// )
// function getObjectDetails(schema, data, template) {
//     const initialData = {}
//     const handlers = []
//     for (const mustHave of data.required) {
//         initialData[mustHave] = types[mustHave.type]
//     }
//     template = template.replace('#defaultData#', JSON.stringify(initialData))
//     for (const key in data) {
//         const fnName = `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`
//         handlers.push(`with${fnName}(${key}){
//             data.${key} = ${key}
//             return this;
//         }`)
//     }
//     template = template.replace('#handlers#', handlers.join(','))
//     template = template.replace('#name#', schema)
//     return template
// }
console.log("Hello");
