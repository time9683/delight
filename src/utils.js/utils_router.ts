
/** return a page error with html document and status 404 
 * 
 * @returns {Response}
 */
export  const PageError = (): Response =>  {



    return new Response("<h1>error page no found</h1>",{status:404,headers:{"content-type":"text/html"}});
    
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
 export   const analizeUrlParams = (url:string,ruta:string) : { params: { [key:string]:string}  ,isCorrect : boolean}   => {        
        
     const regex =   GenerateRegex(ruta)

        // verifica si la url coincide con la ruta
    
        if (!regex.test(url)) return  {params:{},isCorrect:false}
        //busca parametros en la ruta
        const  Result =  regex.exec(url)
        // si no hay parametros retonar url correcta pero sin parametros
        if(Result === null ||  Result.groups == undefined) return {params:{},isCorrect:true}
        // y si hay retorna dichos parametros
        return {params:Result.groups,isCorrect:true}
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


export function extractFile(url: string,to:string){

if(to == '/' ){

    return  url.split('/').slice(1).join('/')
}

return  url.split('/').slice(2).join("/")





}




function GenerateRegex(expresion:string){
    let newExpresion = expresion
    if(newExpresion == "/"){
       return new RegExp("^/$")
    }
    
    const a : RegExpMatchArray | null = expresion.match(/(:\w+)/g)
    if(a == null){
    return new RegExp("^"+newExpresion+"$")
    }

    
    a.forEach((elementos)=>{
    console.log(elementos)
    newExpresion =  newExpresion.replace(elementos, "(?<"+elementos.replace(":","")+">[A-Za-z0-9]+)")
    
    })
    
    return new RegExp("^"+newExpresion+"$")
    
    }



export  interface req extends Request{


params : {[key:string]:string}
child :  boolean




}  