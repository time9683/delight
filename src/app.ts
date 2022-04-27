import router from "./router.ts";
import {serve} from "https://deno.land/std@0.125.0/http/server.ts";

/** class representing a  App server
 * 
 * @class App
 * @extends {router}
 */
export default class App extends router {
        /**
         * is array of middlewares
         * @type {Array<{path:string,callback:Function}>} 
         * @memberof App
          */


/**
 *  create new App
 * 
 * @returns {App} - new App instance
 */


constructor(){
        super()
         }




    /**  pass the request to router and call the method resolve in router
     * 
     * @function
     * @param {Request} req - request object
     * @returns {Response} - response object
     */
private hadler(req:Request):  Promise<Response>{
return this.resolve(req)
// return  new Response("hello world",{headers:{"content-type":"text/plain"},status:200})

}




/** create a new server and start listening in port especified
 * 
 * @param port  - port to listen
 */

async listen(port:number){

  await   serve(this.hadler.bind(this),{port})

}



}
