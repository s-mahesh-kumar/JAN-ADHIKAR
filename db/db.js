const mongoose=require('mongoose');

const accSchema=new mongoose.Schema({
name:String,
anum:Number,
pno:Number,
otp:Number,
extime:Date,
loc:String
});

const people=mongoose.model("people",accSchema);


const prSchema=new mongoose.Schema({
id:String,
loc:String,
name:String,
budget:Number,
desc:String,
sdate:Date,
edate:Date,
url:String
});

const project=mongoose.model("project",prSchema);

module.exports={
    people,project
}