const express=require('express');
const twilio=require('twilio');
const accountSid = "AC2d2e1a3c645f164d290e202ef1484d5c";
const authToken = "ca5f42cd31ee3a01f782dd58ed55cc0a";
const app=express();
app.listen(3000,()=>{
    console.log("Listening to 3000");
})


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {people,project}=require('./db/db');

const  mongoose=require('mongoose');
const url="mongodb://127.0.0.1:27017/myDB";
mongoose.connect(url,{useNewUrlParser: true, 
    useUnifiedTopology: true},(err)=>{
        if(err)
        console.log(err);
        else
        console.log("connected");
    })

app.set('view engine','ejs');

var login="";
var locpinfo=[];
var selpinfo=[];
app.use(express.static('public'));

app.get('/',(req,res)=>{
login="";
locpinfo=[];
selpinfo=[];
var aanum=0;
    res.render('pages/index3',{anum:aanum,locpinfo,selpinfo,login});

})

app.get('/login',(req,res)=>{
    res.render('pages/index');

})



app.post('/login',async(req,res)=>{
    console.log(req.body);
    const anum=req.body.anum;
    var user=await people.findOne({"anum":req.body.anum});
    if(user!=null)
    {
    console.log(user);
    var num=123456;//100000+Math.floor(Math.random()*900000);
    var phno=user.pno;
// const client = new twilio(accountSid, authToken);

// await client.messages
//   .create({ body: `your OTP is - ${num}. Valid for only 5 mnutes`, from: "+12768816056", to: "+91"+phno })
//   .then(message => console.log(message.sid))
//   .catch((e)=>{console.log(e)});

    await people.updateOne({"anum":anum},{$set:{"otp":num,"extime":Date.now()+30000}})
    .then(()=>{
        console.log("otp sent and recored success");
    })
    .catch((e)=>{
        console.log("otp not recorded in database");
    })
     console.log("success");
    res.render('pages/index2',{anum});

    }else{
    res.render('pages/index');

     console.log("fail");
    }


})

app.post('/login/otp',async(req,res)=>{
    console.log(req.body);
    const {anum,otp}=req.body;
    var user=await people.findOne({"anum":anum,"otp":otp});
    
    if(user!=null && user.extime>=Date.now())
    {
    console.log(user);
    console.log("otp is correct");
    login=user.name;
    livepinfo=await project.find({"loc":user.loc,"edate":{$gt:Date.now()}});
    selpinfo=await project.find({"loc":user.loc,"edate":{$lt:Date.now()}});

    console.log(selpinfo);
    res.render('pages/index3',{anum,livepinfo,selpinfo,login});
    }else{
        console.log("Wrong otp");
        res.render('pages/index');
    }
    
    }
    )
    

    app.post("/vote",(req,res)=>{

        
        // blockchain connection
        // cs.castvote(req.body.pid, req.body.aid, req.body.type).then((value)=>{
        //     console.log(value)
        // }, (error)=>{
        //     console.log(error.toString())
        // })
        res.json(req.body);

    })

    app.post("/getvote",(req,res)=>{

        
        // blockchain connection
        // cs.getvotes(req.body.pid).then((value)=>{
        //     console.log(value)
        // }, (error)=>{
        //     console.log(error.toString())
        // })
        res.json(req.body);

    })

    app.get("/addp",(req,res)=>{


        res.render("pages/adminaddp");
    })

    app.post("/addp",(req,res)=>{
        
        // cs.addproject(req.body.pid).then((value)=>{
        //     console.log(value)
        // }, (error)=>{
        //     console.log(error.toString())
        // })

        res.json(req.body);
    })

    app.get("/admin",(req,res)=>{
    res.render("pages/admin");
    })

    app.post("/admin",async(req,res)=>{

        if(req.body.adminid=="admin123" && req.body.passw=="admin123"){

            var allp=await project.find({});
            console.log(allp);
        res.render("pages/adminintro",{allp});
        }else{
        res.redirect("/admin");}
        })
// people.insertMany([{name:"sudeep",age:22},
// {name:"sudeep2",age:23},
// {name:"sudeep3",age:24}])
// .then((ans)=>{
//     console.log(ans);
// })