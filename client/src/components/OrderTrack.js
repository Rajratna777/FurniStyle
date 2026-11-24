export default function OrderTrack({status}){
 const steps=["Pending","Packed","Shipped","Delivered"];
 return(
  <div>
   {steps.map((s,i)=>(
    <span key={s} style={{color:steps.indexOf(status)>=i?"green":"gray"}}>
     {s} →
    </span>
   ))}
  </div>
 );
}
