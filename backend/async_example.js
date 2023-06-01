// Why is javascript async . 
// Core to how js works 

// Callbacks  , promises , async/await.
import('node-fetch/src/index.js')
  .then((module) => {
    // Code that depends on the imported module
  })
  .catch((error) => {
    // Handle any errors that occurred during the import
  }); 

const fetch = require('node-fetch')
const fs = require('fs')


setTimeout(() => {
    console.log('Waited 1 seconds')
    
}, 1000);


//error first callback

fs.readFile('server_config.json' , 'utf-8' , ((err,data)=>
{
    if (err)
    {
        console.error('Error');
    }
    else
    {
        console.log("Data")
    }
}))


//Create a promise
const myPromise = new Promise((resolve,reject)=>
{
    const rand = Math.floor(Math.random()*2);
    if(rand==0)
    {
        resolve();
    }
    else
    {
        reject();
    }
});

myPromise.then(()=> console.log('Success')).catch( ()=> console.error('Something went wrong'));

// Read exisintf
fs.promises.readFile('server_config.json' , {encoding:'utf-8'})
            .then((data)=>console.log(data))
            .catch((err)=> console.log(err));


//Fetch with promises

fetch('http://pokeapi.co/api/v2/pokemon/ditto')
   .then((res)=> res.json())
   .then((data)=> console.log(data))
   .catch((err)=>console.error(err));


// Async , await

const loadFile = async()=>{
    // Await cnan be used inside await. Only after wait ,
    const data = await fs.promises.readFile('server_config.json' , {encoding:'utf-8'});
    console.log(data)
};

// But if there is an error , you need to do try catch .

const loadFile_two = async()=>
{
    try
    {
        const data = await fs.promises.readFile('server_confidg.json' , {encoding:'utf-8'} );
        console.log(data)
    }
    catch(err)
    {
        console.log('ERRROR');
    }
}

const fetchPokemon = async(id)=>
{
    const res= await fetch('http://pokeapi.co/api/v2/pokemon/ditto');
    
}
