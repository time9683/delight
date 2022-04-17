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
routes: { GET: Map<string,Function>; POST: Map<string,Function>; };
pageError: string;

constructor(){
this.routes = {GET:new Map(),POST:new Map()};  
this.pageError  = "./error.html" 
 }




get = (url : string,callback : Function) =>{
this.routes.GET.set(url,callback);
}

post = (url : string,callback : Function) =>{
this.routes.POST.set(url,callback);
}



async resolve(req:Request) : Promise<Response>{

const url = new URL(req.url).pathname
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




const callback = this.routes.GET.get(url);

if(callback){
return callback(req);
}

return PageError()


}else if(req.method == "POST"){


const callback = this.routes.POST.get(url);

if(callback){
return callback(req);
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