import { assertEquals } from "https://deno.land/std@0.136.0/testing/asserts.ts";
import   App from "../app.ts";
import  Router  from "../router.ts";
import { req } from "../utils.js/utils_router.ts";

Deno.test({name:"App router",fn: async  (t) =>{


    const app = new App()
    const router = new Router()
app.get("/",(_req:Request)=>{

return new Response("hello world",{headers:{"content-type":"text/plain"}})


})

app.get("/users/:name",(req)=>{

return new Response(`hello ${req?.params?.name}`)


})

app.get("/:id/admin",(req)=>{

    
    return new Response(`hello ${req?.params?.id} admin`)
})

app.post("/registre",async (req:req)=>{

const {name,age} = await req.json()

return new Response(`registro completado name:${name}  age:${age}`,{status:201})


})

app.post("/registre/:type",async (req:req)=>{
   if(!req.params) return new Response("no params",{status:400})
    const {type} = req.params
    
    const {name,age} = await req.json()
    
    return new Response(`registro completado name:${name}  age:${age} type:${type}`,{status:201})


})

router.get("/",(_req)=>{






return new Response("son router",{headers:{"content-type":"text/plain"}})


})



router.get("/root",(_req)=>{
   
    
    return new Response("son router admin",{headers:{"content-type":"text/plain"}})

})


app.use("/son",router)





app.listen(4000)


await t.step({name:"Get reponse for url /",fn: async () =>{
    const  res = await   fetch('http://127.0.0.1:4000/');
    const body = await res.text();
    assertEquals(res.status,200)
    assertEquals(body,"hello world")
    assertEquals(res.headers.get("content-type"),"text/plain")
},sanitizeOps:false,sanitizeResources:false})

await t.step({name:"Get reponse with url dinamic /users/:name",fn: async () =>{
    const  res = await   fetch('http://127.0.0.1:4000/users/juan');
    const body = await res.text();
    assertEquals(res.status,200)
    assertEquals(body,"hello juan")
    assertEquals(res.headers.get("content-type"),"text/plain;charset=UTF-8")
},sanitizeOps:false,sanitizeResources:false})

await t.step({name:"get Reponse dinamic url in beginning /:id/admin",fn: async () =>{
    const  res = await   fetch('http://127.0.0.1:4000/1/admin');
    const body = await res.text();
    assertEquals(res.status,200)
    assertEquals(body,"hello 1 admin")
    assertEquals(res.headers.get("content-type"),"text/plain;charset=UTF-8")
},sanitizeOps:false,sanitizeResources:false})

await t.step({name:"get to not existing entry point",fn: async () =>{

    const  res = await   fetch('http://127.0.0.1:4000/not/existing');
    const _body = await res.text();
    assertEquals(res.status,404)
    assertEquals(res.headers.get("content-type"),"text/html")



},sanitizeOps:false,sanitizeResources:false})

await t.step({name:"post 201 request to url static",fn: async () =>{
const dataInjson = {
    name:"juan",
    age:20
}

const res = await   fetch('http://127.0.0.1:4000/registre',{ method: 'POST', body: JSON.stringify(dataInjson), headers: { 'Content-Type': 'application/json' } });
const body = await res.text();
assertEquals(res.status,201)
assertEquals(res.headers.get("content-type"),"text/plain;charset=UTF-8")
assertEquals(body,"registro completado name:juan  age:20")
},sanitizeOps:false,sanitizeResources:false})



await t.step({name:"post 201 request to url dinamic",fn: async () =>{
const dataInjson = {
    name:"juan",
    age:20
}

const res = await   fetch('http://127.0.0.1:4000/registre/admin',{ method: 'POST', body: JSON.stringify(dataInjson), headers: { 'Content-Type': 'application/json' } });
const body = await res.text();
assertEquals(res.status,201)
assertEquals(res.headers.get("content-type"),"text/plain;charset=UTF-8")
assertEquals(body,"registro completado name:juan  age:20 type:admin")
},sanitizeOps:false,sanitizeResources:false})


await t.step({name:"post to route in externet Router",fn: async () =>{

const res = await   fetch('http://127.0.0.1:4000/son');
const body = await res.text();
assertEquals(res.status,200)
assertEquals(res.headers.get("content-type"),"text/plain")
assertEquals(body,"son router")


},sanitizeOps:false,sanitizeResources:false})



await t.step({name:"post to subpath in external router",fn: async () =>{

const res = await   fetch('http://127.0.0.1:4000/son/root');
const body = await res.text();
assertEquals(res.status,200)
assertEquals(res.headers.get("content-type"),"text/plain")
assertEquals(body,"son router admin")


},sanitizeOps:false,sanitizeResources:false})


}, sanitizeResources: false,
    sanitizeOps: false,})