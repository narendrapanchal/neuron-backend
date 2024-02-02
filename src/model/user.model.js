const {Schema,model}=require("mongoose");
const userSchema=new Schema({
    count:{type:Number, default:0}
    
},{
    versionKey:false,
    timestamps:true
});

module.exports ={User:model("user",userSchema),userSchema};
