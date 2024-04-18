#!/usr/bin/env node
let inputArr = process.argv.slice(2);
console.log(inputArr);
// const { dir } = require("console");
let fs = require("fs");
let helpObj=require("./commands/help");
let treeObj= require("./commands/tree");
let organizeObj= require("./commands/organize")
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}

//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help

let command = inputArr[0];
switch (command) {
    case "tree":
        // treefn(inputArr[1])
        treeObj.treeKey(inputArr[1]);
        break;

    case "organize":
        // organizefn(inputArr[1])
        organizeObj.organizeKey(inputArr[1]);
        break;

    case "help":
        // helpfn();
        helpObj.helpKey();
        break;

    default:
        console.log("Pleae input right command")
        break;
}





//I use this movify folder and it make organized_files folder in this path or address and make these following categories acoording to files.
//"C:\Users\HP\Desktop\Moviefy (2)\Moviefy"
