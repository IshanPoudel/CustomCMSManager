const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");







// Reading from a file is the same as fetching from an api , you need to handle both cases. 

const startServer = async()=>
{
    try
    {
        // Try reading in the data from the config file. 
        const jsonData = await fs.promises.readFile('server_config.json' , {encoding:'utf-8'} );
        // If succesfully read. 
        console.log(jsonData)
        
        // Start the server. 
        port = JSON.parse(jsonData).port


        app.listen(port , ()=>
        {
            console.log(`Server is running on Port ${port}`);
        })

    }
    catch(err)
    {
        console.log(err)
        process.exit()

    }
}


startServer();
// At this point , our app should be listening. 
app.get("/" , (req,res)=>
{
    res.send("Hello world");
})