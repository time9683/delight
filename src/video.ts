
import { readableStreamFromReader } from "https://deno.land/std@0.135.0/streams/mod.ts";


/** parse video request and return if video allows streaming if not return full video
 * 
 * @param req  
 * @param filename 
 * @returns  {Promise<Response>}
 */

export default async function Stream(req:Request,filename:string) :  Promise<Response>{

const file = await Deno.open(`./${filename}`);
const range = req.headers.get("range")
const fileSize = (await file.stat()).size

const  maxChunk =  16_384

//calculate the chunks per request
const blocks  = 30 
const blockSize =    maxChunk * blocks


if(!range){

    const headers = {
        "content-type":"video/mp4",
        "content-length":    ((await file.stat()).size).toString()
    }
    const stream = readableStreamFromReader(file)

    return new Response(stream,{headers})
}

const   [start,_end] = range.replace(/bytes=/,'').split('-');

const startn = parseInt(start,10)
const endn =  Math.min(startn +  blockSize  ,fileSize - 1)



 
const headers = {
    "content-type":"video/mp4",
    "content-length": `${endn - startn}`,
    "content-range": `bytes ${startn}-${endn}/${(await file.stat()).size}`
}


let seek;


if(startn === 0){   
    seek =  Deno.SeekMode.Start
    }else if(endn === (await file.stat()).size - 1){
    seek =  Deno.SeekMode.End
    }else{
    seek = Deno.SeekMode.Current
    }


await Deno.seek(file.rid,startn,seek)
let readblocks =  blocks;
const stream =  new ReadableStream({
    async pull(controler){
        const chunk =  new Uint8Array(maxChunk)
      const read =   await file.read(chunk)
        
        if(read){
            controler.enqueue(chunk.subarray(0,read))
            
        }
        readblocks--
        if(readblocks === 0){
            
            file.close()
            controler.close()
        }
        

        
    }
})





return new Response(stream,{headers,status:206});

}





