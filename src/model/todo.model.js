const {Schema,model}=require("mongoose");
const todoSchema=new Schema({
    text: String,
    userId:{ type: Schema.Types.ObjectId, ref: 'users' }
},{
    versionKey:false,
    timestamps:true
});
module.exports ={Todo:model("todo",todoSchema),todoSchema};
