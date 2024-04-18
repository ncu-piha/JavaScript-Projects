const request=require("request");
const fs=require("fs");
const path=require("path");
const cheerio=require("cheerio");
const pdfkit=require("pdfkit");
function getIssuesPageHtml(url,topic,reposName){
   request(url,cb);
   function cb(err,response,html){
       if(err){
        console.log(err)
       }else{
        // console.log(html);
        getIssues(html);
       }
   }

   function getIssues(html){
    let $=cheerio.load(html);
    let issuesElemArr=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    console.log(issuesElemArr.length);
    let arr=[];
    for(let i=0;i<issuesElemArr.length;i++){
        let link=   $(issuesElemArr[i]).attr("href");
        // console.log(link);
        arr.push(link)
    }
    //    console.log(topic,arr)
     let folderPath=path.join(__dirname,topic)
    dirCreator(folderPath);
    let filePath=path.join(folderPath,reposName+".pdf");
    let text=JSON.stringify(arr);
    let pdfDoc=new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath))
    pdfDoc.text(text);
    pdfDoc.end();
    fs.writeFileSync(filePath,text);
   }

}
module.exports=getIssuesPageHtml;

function dirCreator(folderPath){
    if(fs.existsSync(folderPath)==false){
        fs.mkdirSync(folderPath);
    }
}


//convert to pdf file
// let pdfDoc=new pdfkit();
// pdfDoc.pipe(fs.createWriteStream(filePath))
// pdfDoc.text(text);
// pdfDoc.end();


//learnong about pdf
//"https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/"