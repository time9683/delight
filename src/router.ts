// deno-lint-ignore-file ban-types
import {readableStreamFromReader} from "https://deno.land/std@0.135.0/streams/mod.ts" 
import  {PageError,analizeUrlParams,getMimeType,regexFile, extractFile} from "./utils.js/utils_router.ts"
import  streamingVideo from "./video.ts"
import  * as path  from "https://deno.land/std@0.180.0/path/mod.ts"
import type { req } from "./utils.js/utils_router.ts"

/** function with execute previus  entry point 
 * @param {Request} req
 */
interface midleware {
    (req:req,next:()=>void):void | undefined | Response
}

interface  entryPoint {
        path : string,
        callback : Function | Router , 
        midleware? : midleware  
        next?  :  ()=>void  
}
 




/**
 * class Router  represent the router of the application
 * @class Router
 * 
 */

export default class Router {

/** is a object with all routes of the application 
 *  @type {Object}
 * @memberof Router
 * 
 * @property {Array<{path:string,callback:Function,midleware:Function || undefined }>} GET - array of routes for GET method
 * @property {Array<{path:string,callback:Function}>} POST - array of routes for POST method
 * 
  
 * 
 */

routes: { [GET:string]: Array<entryPoint>; POST: Array<entryPoint>; DELETE: Array<entryPoint>; PUT: Array<entryPoint>;  };
private static : string
private to : string

constructor(){
this.routes = {GET:[],POST:[],DELETE:[],PUT:[]};  
this.static =  "/public"
this.to =  '/public'
}



/**add new  entry point to the router in the get method
 * 
 * @function
 * @param {string} url - url to  define entry point  request
 * @param {Function} callback - callback function to execute when the url is requested
 * 
 * 
 * 
*/
get = (url : string,callback : ((req:req)=> Response | Promise<Response>) | Router ,midleware?:midleware)  =>{
this.routes.GET.push({path:url,callback,midleware})
}
/** add new entry point to the router in the post method 
 * 
 * @function 
 * @param {string} url - url to  define entry point  request
 * @param {Function} callback - callback function to execute when the url is requested
 */
post = (url : string,callback : ((req:req)=> Response  | Promise<Response>)| Router, midleware?:midleware) =>{
this.routes.POST.push({path:url,callback,midleware})
}


/**add new  entry point to the router in the delete method
 * 
 * @function
 * @param {string} url - url to  define entry point  request
 * @param {Function} callback - callback function to execute when the url is requested
 * 
 * 
 * 
*/
delete = (url : string,callback : ((req:req)=> Response | Promise<Response>) | Router,midleware?:midleware) =>{
this.routes.DELETE.push({path:url,callback,midleware})
}



/**add new  entry point to the router in the put method
 * 
 * @function
 * @param {string} url - url to  define entry point  request
 * @param {Function} callback - callback function to execute when the url is requested
 * 
 * 
 * 
*/
put = (url : string,callback : ((req:req)=> Response | Promise<Response>) | Router,midleware?:midleware) =>{
this.routes.PUT.push({path:url,callback,midleware:midleware})
}



/**   resolve the request  and return the response
 * 
 * @param {Request} req - request object
 * @returns {Response} - response object
 *  
 *   */ 
  resolve = async (req:req) : Promise<Response> =>{


/**
 * is a pathname of the request
 */
let url = new URL(req.url).pathname


if(req.child === true && req.child !== undefined){
    url =  url.split("/")[2] === undefined ? "/" :  "/" + url.split("/")[2] 

}


if(!req.method)   return  new Response("Method not allowed",{status:405})

const listroute = this.routes[req.method]




if(!listroute) return new Response("Method not allowed",{status:405})

if(req.method == "GET"){

    if(regexFile.test(url) &&  ((url.split("/")[0] == '' && this.to == '/') ||  url.split("/")[1] ==  this.to) ){

try{

        const fileUrl  =   extractFile(url,this.to)
        const mimeType =  getMimeType(url)
        const urlforFile =  path.join(this.static,fileUrl)
      
        

        if(mimeType.includes("video")){
            return  streamingVideo(req,url)
        }
    const file = await Deno.open(urlforFile,{read:true})
    const readable =  readableStreamFromReader(file) 
    return new  Response(readable,{status:200,headers:{"content-type":mimeType}})

}catch{

console.error(`%cError 404: File not found ${url}`, "color: red")
return new Response("",{status:404})

}

}
}







//loop in the routes to find the route
for (const route of  listroute) {
    let url = new URL(req.url).pathname

    if(req.child === true && req.child !== undefined){
            url =  url.split("/")[2] === undefined ? "/" :  "/" + url.split("/")[2] 
        
        }


    
const {path,callback,midleware} = route

if(callback instanceof Router)
{
const urlsplit = url.split("/")
if(urlsplit.length > 2){ 
urlsplit.pop()
}
url = urlsplit.join("/")
}


const {isCorrect,params} = analizeUrlParams(url,path)



if(!isCorrect ){
 continue   
}


if(isCorrect){

if(callback instanceof Router){
    Object.assign(req,{child:true})
    return callback.resolve(req)
}


    Object.assign(req,{params})
if(midleware){ 
const  info = midleware(req,()=>{})
if(info instanceof Response){
    return info
}



}
const  res =   await  callback(req,()=>{})
if(res instanceof Response){
    console.log(`%c${req.method}%c:${req.url}`,'color:green','color:gray')
return res
}
continue
}

} 


console.log(`%c${req.method}:%c${req.url}`,'color:gray',"color:red")
return PageError()


}





use(path:string  ,callback: ((req:Request)=> Response ) | Router){

this.get(path,callback)
this.post(path,callback)

}

/**set the path for static files,the value initial is public
 * 
 * @param {string} url -  to  define  path
   @param {string} to - to define access point to the static
*/

fixed(url:string,to:string){

this.static = url
this.to = to


}








}


