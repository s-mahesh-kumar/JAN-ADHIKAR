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

project.insertMany([{id:"ABCD123",loc:"Bagalkot",name:"Bagalkot road project",budget:50,desc:"lorem lorem lorem",
sdate:"2023-01-05",edate:"2023-01-06"},
{id:"ABCD124",loc:"Mysur",name:"Mysur park project",budget:50,desc:"lorem 2 lorem lorem",
sdate:"2023-01-05",edate:"2023-01-06"},
{id:"ABCD125",loc:"Hubbali",name:"Hubbali bus stand",budget:50,desc:"lorem 3 lorem lorem",
sdate:"2023-01-05",edate:"2023-01-06"}])
.then((ans)=>{
    console.log(ans);
})