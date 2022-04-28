# Delight

minimal web framerwork inspired by express.js for deno 


``` ts
import delight from "https://raw.githubusercontent.com/time9683/delight/master/src/app.ts"

const app = new delight()

app.get('/',(req)=>{
return new Reponse('hello world')

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
the simplest way to use it is to import from "https://raw.githubusercontent.com/time9683/delight/master/src/app.ts"


``` ts
import delight from "https://raw.githubusercontent.com/time9683/delight/master/src/app.ts"
```


## features

- routing
- simple middleware
- simple static file server


