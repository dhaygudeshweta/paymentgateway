const cors=require('cors');
const express = require('express');
const stripe=require('stripe')("sk_test_51JbTKCSFhbD0CPrvhvpkNRddiExkRHdxXKjn2isDL9UVV0UcjqoqMkPpqskGsdKgZjH59k3IR7UfCA0Kk4QcIYeh009N4jPFCX");
const uuid=require('uuid').v4;
const app=express();
app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello world");
})
app.post("/payment",(req,res)=>{
    const {product,token}=req.body;
    console.log("product",product);
    console.log("Price",product.price);

    const idempontencyKey=uuid();

     return stripe.customers
  .create({
    email: token.email,
    source:token.id,

  }).then (customer=>{
      stripe.charges.create({
          amount:product.price *100,
          currency:"usd",
          customer:customer.id,
          receipt_email:token.email,
          description:`purchase${product.name}`,
          shipping:{
              name:token.card.name,
              address:{country:token.card.address_country}
          }
      },{idempontencyKey});
  }).then(result=>res.status(200).json(result))
     .catch(error=>console.log(error));
})


app.listen(3001,()=>{console.log("app listening.......")});
