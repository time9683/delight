import App from './src/app.ts'

const app = new App()


app.get("/",(req:any)=>{

   
 return new Response("hello world")   
})


app.listen(3000)




