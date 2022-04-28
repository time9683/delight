# Delight

minimal web framerwork inspired by express.js for deno 


``` ts
import * as delight from "https://deno.land/x/delight@1.0.0-beta/app.ts";
import Router import * as delight from "https://deno.land/x/delight@1.0.0-beta/router.ts";



const app = new delight()
const router = new Router()


router.get("/",(req:any)=>{


return new Response("path admin")
})


app.use("/admin",router)



app.get('/',(req)=>{
return new ReSponse('hello world')

})

app.post('/users',async (req)=>{

    const {name,email} = await req.json()
    return new Response(`hello ${name} your email is ${email}`)
})



app.use("/:",(req)=>{

    return new Response('error 404',{status:404})
})

//define a path for static files, for default is /public
app.fixed("/static")



app.listen(3000)
```


## how to use delight
the simplest way to use it is to import from "https://deno.land/x/delight@1.0.0-beta/app.ts";
"


``` ts
import * as delight from "https://deno.land/x/delight@1.0.0-beta/app.ts";

```


## features

- routing
- simple middleware
- simple static file server


