const router=require("express").Router();
const Category=require("../models/Category");
const multer=require("multer");

const storage=multer.diskStorage({
 destination:(r,f,c)=>c(null,"uploads/"),
 filename:(r,f,c)=>c(null,Date.now()+"-"+f.originalname)
});
const upload=multer({storage});

router.get("/",async(r,s)=>s.json(await Category.find()));

router.post("/add",upload.single("image"),async(r,s)=>{
 s.json(await Category.create({name:r.body.name,image:r.file.filename}));
});

router.put("/update/:id",upload.single("image"),async(r,s)=>{
 const d={name:r.body.name};
 if(r.file) d.image=r.file.filename;
 s.json(await Category.findByIdAndUpdate(r.params.id,d,{new:true}));
});

router.delete("/delete/:id",async(r,s)=>{
 await Category.findByIdAndDelete(r.params.id);
 s.json("Deleted");
});

module.exports=router;
