
const dataError = await  Deno.readTextFile("./public/error.html")
/** return a page error with html document and status 404 
 * 
 * @returns {Response}
 */
export  const PageError = (): Response =>  {



    return new Response(dataError,{status:404,headers:{"content-type":"text/html"}});
    
    }
    
    
    
    /** return the  mimetype of file 
     * @param {string} nameFile - name of file
     * @returns {string} - mimetype of file
    */
    
  export   const getMimeType = (nameFile:string) : string => {
    
    const ext = nameFile.split(".")[1]
    
    return mimeTypes[ext] || "text/plain";
    
    }
    
    
    
    
    /** 
     * analize the url and return if is correct and the params includes in the url
     * 
     * 
     * @param url 
     * @param ruta 
     * @returns  {isCorrect:boolean,params:object}
     */
 export   const analizeUrlParams = (url:string,ruta:string) : {[key:string] : {}  ,isCorrect : boolean}   => {
    
    
        const urlsplit = url.split("/")
        const rutasplit = ruta.split("/")
        const params : {[key:string] : string } = {};
        let isCorrect = true;
    //  console.log({urlsplit,rutasplit})
        if(rutasplit[1].includes(":") && (rutasplit.length === urlsplit.length) || (ruta  ==  '/:') ){
         
            const paramName = rutasplit[1].split(":")[1]
            params[paramName] = urlsplit[1]
            for(let i = 1; i < rutasplit.length; i++){
                if(rutasplit[i] == urlsplit[i]){
                    continue
                }else if(rutasplit[i].includes(":")){
                    const paramName = rutasplit[i].split(":")[1]
                    params[paramName] = urlsplit[i]
                }else{
                    isCorrect = false
                    break
                }
            }
            if(isCorrect){
                return {params:params,isCorrect}
            }
    
    
    
    
    
        }else if(rutasplit[1] == urlsplit[1] && rutasplit.length === urlsplit.length){
            
            for(let i = 1; i < rutasplit.length; i++){
                if(rutasplit[i] == urlsplit[i]){
                    continue
                }else if(rutasplit[i].includes(":")){
                    const paramName = rutasplit[i].split(":")[1]
                    params[paramName] = urlsplit[i]
                }else{
                    isCorrect = false
                    break
                }
            }
            if(isCorrect){
                return {params:params,isCorrect}
           
            }
    
        }
    
        return {params:{},isCorrect:false}
    
    
    
     
        
        }





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


export const regexFile = /\.([a-zA-Z0-9]+)$/