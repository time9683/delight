// deno-lint-ignore-file ban-types
import {readableStreamFromReader} from "https://deno.land/std@0.135.0/streams/mod.ts" 
import  {PageError,analizeUrlParams,getMimeType,regexFile} from "./utils.js/utils_router.ts"
import  streamingVideo from "./video.ts"



/** function with execute previus  entry point 
 * @param {Request} req
 */
interface midleware {
    (req:Request,next:()=>void):void | undefined | Response
}

interface  entryPoint {
        path : string,
        callback : Function,
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

routes: { GET: Array<entryPoint>; POST: Array<{path:string,callback:Function}>; };
pageError: string;
static : string

constructor(){
this.routes = {GET:[],POST:[]};  
this.pageError  = "./error.html" ;
this.static =  "/public"
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
get = (url : string,callback : Function,midleware?:midleware)  =>{
this.routes.GET.push({path:url,callback,midleware})
}
/** add new entry point to the router in the post method 
 * 
 * @function 
 * @param {string} url - url to  define entry point  request
 * @param {Function} callback - callback function to execute when the url is requested
 */
post = (url : string,callback : Function) =>{
this.routes.POST.push({path:url,callback})
}



/**   resolve the request  and return the response
 * 
 * @param {Request} req - request object
 * @returns {Response} - response object
 *  
 *   */ 
  resolve = async (req:Request) : Promise<Response> =>{


/**
 * is a pathname of the request
 */
const url = new URL(req.url).pathname



if(req.method == "GET"){
console.log({url})
//verify if the url is a route or a file
if(regexFile.test(url) &&  ( ("/"+ url.split('/')[1] ===   this.static)  || this.static === '' || this.static === '/')){
try{
        const mimeType =  getMimeType(url)
      
        

        if(mimeType.includes("video")){
            return  streamingVideo(req,url)
        }
//joint the urls
    const file = await Deno.open(`.${url}`,{read:true})
    const readable =  readableStreamFromReader(file) 
    return new  Response(readable,{status:200,headers:{"content-type":mimeType}})

}catch{
console.error(`%cError 404: File not found ${url}`, "color: red")
return new Response("",{status:404})

}

}


//loop in the routes to find the route
for (const route of this.routes.GET) {

const {path,callback,midleware} = route
const {isCorrect,params} = analizeUrlParams(new URL(req.url).pathname,path)
if(!isCorrect ){
 continue   
}
if(isCorrect){
    Object.assign(req,{params})
if(midleware){ 
    
const  info = midleware(req,()=>{})
if(info instanceof Response){
    return info
}

}
const  res =   await  callback(req,()=>{})
if(res instanceof Response){
return res
}
continue
}

} 

return PageError()


}

else if(req.method == "POST"){

    for (const route of this.routes.POST) {

const {path,callback} = route
const {isCorrect,params} = analizeUrlParams(new URL(req.url).pathname,path)
if(!isCorrect ){
 continue   
}
if(isCorrect){
    Object.assign(req,{params})
 return callback(req)
}





}



return PageError()

}else{
return PageError()
}
}



use(path:string  ,callback:Function){

this.get(path,callback)
this.post(path,callback)

}

/**set the path for static files,the value initial is public
 * 
 * @param {string} url -  to  define  path
 */

fixed(url:string){

this.static = url



}








}


