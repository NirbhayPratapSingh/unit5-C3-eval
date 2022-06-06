const express =required("express");
const fs=required("fs")
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/user/create",(req,res)=>{
    fs.readFile("./db.json",{encoding: "ust-8"},(err,data)=>{
        const parsed =JSON.parse(data);

        parsed.user=[...parsed.user,req.body];

        fs.writefile("./db.json",JSON.stringify(parsed),{encoding: "utf-8"},(req,res)=>{
        res.status(201).send("User Created");
        })
    })
});

app.post("/user/login",(req,res)=>{
    fs.readFile("./db.;json",{encoding: "utf-8"},(err,data)=>{ 

        const parsed =JSON.parsed(data); 

        parsed.user=[...parsed.user,req.body];
    })
})
const PORT = process.env.PORT || 8080;
app.listen(PORT);


// NIRBHAY Pratap singh