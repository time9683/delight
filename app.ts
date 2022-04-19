// deno-lint-ignore-file ban-types
import router from "./router.ts";
import {serve} from "https://deno.land/std@0.125.0/http/server.ts";

class App extends router {
      uses : Array<{path:string,callback:Function}>
constructor(){
  
        super()
        this.uses = []
    }


private hadler =  (req:Request)=>{


return this.resolve(req)

}






listen = (port:number) =>{





    console.log(JSON.stringify(this.routes.GET))
    console.log(`Server is running on port ${port}`)
    serve(this.hadler,{port})

}



}


const app = new App()



app.get("/",(req:Request)=>{


return new Response("hello world")
}
)








app.listen(8080)