//import server  from url deno
import {serve} from "https://deno.land/std@0.125.0/http/server.ts";
import _Router from './router.ts'

const router = new _Router();



router.get("/",()=>{

return new Response("my router ");

})



router.get("/login",()=>{







return  Response.redirect("http://youtube.com");





})



router.get("/users",()=>{


const users = [

{
name:"ali",
age:20
},
{
name:"ahmed",
age:30
},
{
name:"mohamed",
age:40
}

]

return new Response(JSON.stringify(users));



})


router.get("/users/:id",(req:any)=>{

const id = req.params.id

console.log(id)

return new Response(`user id ${id}`);



})



router.post("/users", async (req : Request)=>{

//ontain the json from req
const body = await req.json()

console.log(body);

return new Response("gracias por usarnos@)");









})








const handler =  (_req: Request) =>  router.resolve(_req)





serve(handler,{port:8080});