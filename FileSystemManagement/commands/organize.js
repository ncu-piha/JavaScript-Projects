let fs=require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}
function organizefn(dirPath) { 
    // console.log("organize command implemented for", dirPath);
    //1. input-> directory path given
    let destPath;
    if (dirPath == undefined) {
        // console.log("Kindly enter the path");
        destPath=process.cwd();
        return;
    } else {
        let doesExists = fs.existsSync(dirPath);
        if (doesExists) {
            //2. create->organized_files ->directory
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }


        } else {
            console.log("Kindly enter the correct path");
            return;
        }
    }

    organizedHelper(dirPath, destPath);


}



function organizedHelper(src, dest) {
    //3. identify categories of all files present in that input directory -> 
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to -->", category);
            //4. copy/cut files to that organized directory inside of nay of the category folder
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to", category);
}

function getCategory(name) {
    let ext = path.extname(name);
    // console.log(ext);
    ext = ext.slice(1);
    for (let type in types) {
        let cTypeArray = types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizeKey:organizefn
}