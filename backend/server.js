const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");


// Need to parse json data. 


console.log("The file format is ")
// console.log(jsonData)

app.get("/" , (req , res) =>
{
    console.log("this is the request that you get")

} );


app.listen(8080 , ()=>
{
    console.log(`Server is running on Port 8080`);
})