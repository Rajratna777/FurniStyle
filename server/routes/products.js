const router=require("express").Router();
const Product=require("../models/Product");
const multer=require("multer");

const storage=multer.diskStorage({
 destination:(r,f,c)=>c(null,"uploads/"),
 filename:(r,f,c)=>c(null,Date.now()+"-"+f.originalname)
});
const upload=multer({storage});

router.get("/",async(r,s)=>s.json(await Product.find()));

router.post("/add",upload.single("image"),async(r,s)=>{
 s.json(await Product.create({
  name:r.body.name,
  price:r.body.price,
  category:r.body.category,
  image:r.file.filename
 }));
});

router.put("/update/:id",upload.single("image"),async(r,s)=>{
 const d={name:r.body.name,price:r.body.price};
 if(r.file) d.image=r.file.filename;
 s.json(await Product.findByIdAndUpdate(r.params.id,d,{new:true}));
});

router.delete("/delete/:id",async(r,s)=>{
 await Product.findByIdAndDelete(r.params.id);
 s.json("Deleted");
});

module.exports=router;
