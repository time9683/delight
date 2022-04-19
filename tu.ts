import {
    copy,
    readerFromStreamReader,
  } from "https://deno.land/std@0.135.0/streams/mod.ts";

const data  = await fetch("https://www.youtube.com/68be068d-6563-4d2e-abfb-310028fc6597")
const f = await Deno.open("test.mp4",{read:true,write:true,create:true})
 
const reader = readerFromStreamReader(data.body!.getReader())
await copy(reader,f)
f.close()
