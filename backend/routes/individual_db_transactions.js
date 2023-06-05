module.exports=(app)=>
{
    app.get('/users' , (req, res)=>
    {
        res.status(200).json({message:"Routes succesfully created"});
    })
};
