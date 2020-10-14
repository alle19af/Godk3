const jwt = require('jsonwebtoken');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;



// A simpel application that returns Hello world
//whenever u hit the / path on port 3000
app.get('/', (req, res) => res.send('Hello world! dad and mooom'));

//adding endpoint 1 //localhost:3000/secret
// adding a secret API endpoint that will be protected by us
app.get('/secret', isAuthorized, (req, res) => {
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE"});
})

//adding endpoint 2 //localhost:3000/readme
//adding a /readme endpoint which will be open for the world to see
app.get('/readme', (req, res) => {
    res.json({ "message" : "This is open to the world"});
})

//last endpoint on the page /jwt
app.get('/jwt', (req,res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff"}, privateKey, {algorithm: 'HS256'});
    res.send(token);
})


//secret endpoint is now not authorised to see
// because of this function
function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, decoded) => {
            
            // if there has been an error...
            if (err) {  
                // shut them out!
                res.status(500).json({ error: "Not Authorized" });
                //throw new Error("Not Authorized");
            }
            console.log(decoded);
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.status(500).json({ error: "Not Authorized" });
        //throw new Error("Not Authorized");
    }
}



app.listen(port, () => console.log(`Simple Express app listening on port ${port}!`))


