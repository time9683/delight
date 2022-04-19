// deno-lint-ignore-file ban-types


const dataError = await  Deno.readTextFile("./error.html")
const regexFile = /\.([a-zA-Z]+)$/


const mimeTypes : {[key:string] : string}  = {
    css:"text/css",
    html:"text/html",
    js:"text/javascript",
    json:"application/json",
    png:"image/png",
    jpg:"image/jpg",
    jpeg:"image/jpeg",
    svg:"image/svg+xml",
    ico:"image/x-icon",
    txt:"text/plain",
    mp4:"video/mp4",
    mp3:"audio/mp3",
    wav:"audio/wav",
    ogg:"audio/ogg",
    woff:"application/font-woff",
    woff2:"application/font-woff2",
    eot:"application/vnd.ms-fontobject",
    ttf:"application/font-sfnt",
    otf:"application/font-sfnt",
    sfnt:"application/font-sfnt",
    webp:"image/webp",
    pdf:"application/pdf",
    doc:"application/msword",
    docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls:"application/vnd.ms-excel",
    xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt:"application/vnd.ms-powerpoint",
    pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",
    mp2:"audio/mpeg",
    undefined:"application/octet-stream"
}


export default class _Router {
routes: { GET: Array<{ruta:string,callback:Function}>; POST: Array<{ruta:string,callback:Function}>; };
pageError: string;

constructor(){
this.routes = {GET:[],POST:[]};  
this.pageError  = "./error.html" ;
 }




get = (url : string,callback : Function) =>{
this.routes.GET.push({ruta:url,callback})
}

post = (url : string,callback : Function) =>{
this.routes.POST.push({ruta:url,callback})
}



async resolve(req:Request) : Promise<Response>{

let url = new URL(req.url).pathname
//analize a request a obtent the params 



if(req.method == "GET"){

//verify if the url is a route or a file
if(regexFile.test(url)){
 
const textFile = await Deno.readFile(`.${url}`)
    let  fileMime  =  url.split(".").pop()
 if(!fileMime){
 fileMime  =  mimeTypes["undefined"]
 }
    const mimeType =  mimeTypes[fileMime] || "text/plain";

return new  Response(textFile,{status:200,headers:{"content-type":mimeType}})

}




for (const route of this.routes.GET) {
    let isCorrect = true



const {ruta,callback} = route

let params : {[key:string] : string } = {};
    
//verify if the url route is a match with the url request
//firts split the url route by "/"
const routeSplit = ruta.split("/");
//then split the url request by "/"
const urlSplit = url.split("/");
//then  compare the first element of the routeSplit and the first element of the urlSplit 
//if they are equals, then the route is a match
//if the routerSplit is a dinamic  pass;
console.log(routeSplit)
console.log(urlSplit)
if(routeSplit[1].includes(":") && routeSplit.length == urlSplit.length){
    console.log("dinamic",routeSplit[1],urlSplit[1])
//if the param,save the param name and the value
const paramName = routeSplit[1].split(":")[1]
console.log(paramName)
params[paramName] = urlSplit[1]
//analize the rest of the routeSplit and the rest of the urlSplit if they are equals continue,and  if dinamic route save param
for(let i = 1; i < routeSplit.length; i++){

if(routeSplit[i] == urlSplit[i]){

continue

}else if(routeSplit[i].includes(":")){

const paramName = routeSplit[i].split(":")[1]
params[paramName] = urlSplit[i]



}else{
isCorrect = false
break
}
}

if(isCorrect){
    Object.assign(req,{params})
    //create a function netx '
return callback(req)

}




//si la primera ruta es estatica y tienen el mismo numero de elementos
}else if(routeSplit[1] == urlSplit[1] && routeSplit.length == urlSplit.length){
   
// console.log("static")
// console.log(routeSplit,urlSplit)
//analize the rest of the routeSplit and the rest of the urlSplit if they are equals continue,and  if dinamic route save param
for(let i = 1; i < routeSplit.length; i++){
if(routeSplit[i] == urlSplit[i]){
continue     
}else if(routeSplit[i].includes(":")){
const paramName = routeSplit[i].split(":")[1]
params[paramName] = urlSplit[i]
}else{
isCorrect = false
 break

}
}

if(isCorrect){
    Object.assign(req,{params})
    
    return callback(req)


}




}











} 




return PageError()


}

else if(req.method == "POST"){

    for (const route of this.routes.POST) {

const {ruta,callback} = route

if(ruta == url){

return callback(req);
}

}






return PageError()




}else{

return PageError()

}

}









}


const PageError = () =>{



return new Response(dataError,{status:404,headers:{"content-type":"text/html"}});

}


