const {people,}=require('./db/db');

const  mongoose=require('mongoose');
const url="mongodb://127.0.0.1:27017/myDB";
mongoose.connect(url,{useNewUrlParser: true, 
    useUnifiedTopology: true},(err)=>{
        if(err)
        console.log(err);
        else
        console.log("connected");
    })

people.insertMany([{name:"sudeep",anum:468457708838,pno:9113808136,otp:123456,extime:Date.now()+300000,loc:""},
{name:"sudeep",anum:468457708839,pno:9113808136,otp:345678,extime:Date.now()+300000,loc:""},
{name:"sudeep",anum:468457708840,pno:9113808136,otp:456789,extime:Date.now()+300000,loc:""}])
.then((ans)=>{
    console.log(ans);
})