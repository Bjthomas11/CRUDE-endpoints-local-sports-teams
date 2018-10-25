const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {localCityName, localTeamName} = require("./models");

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan("common"));

localCityName.create("Dallas");
localCityName.create("Dallas");
localCityName.create("Dallas");
localCityName.create("Texas");

localTeamName.create("Cowboys");
localTeamName.create("Mavericks");
localTeamName.create("Stars");
localTeamName.create("Rangers");

// LOCAL CITY NAME ENDPOINTS 
app.get("/local-city-name", (req,res) => {
    res.json(localCityName.get());
});

app.post("/local-city-name", jsonParser, (req,res) => {
    const requiredNames = ["localName", "teamName"];
    for (let i =0; i < requiredNames.length; i++){
        const field = requiredNames[i];
        if(!(field in req.body)){
            const msg = `Missing ${field} in request body`;
            console.error(msg);
            return res.status(404).send(msg);
        }
    }

    const item = localCityName.create(req.body.localName, req.body.teamName);
    res.status(201).json(item);
});

app.put("/local-city-name/:id", jsonParser, (req,res)=> {
    const requiredNames = ["localName", "teamName", "id"];
    for (let i =0; i < requiredNames.length; i++){
        const field = requiredNames[i];
        if(!(field in req.body)){
            const msg = `Missing ${field} in request body`;
            console.error(msg);
            return res.status(400).send(msg);
        }
    }

    if(req.params.id !== req.body.id){
        const msg = `Request path id (${req.path.id}) and request body if (${req.body.id}) must match`;
        console.error(msg);
        return res.status(400).send(msg);
    } 
        console.log(`Updating local city name ${req.params.id}`);
        localCityName.update({
            id: req.params.id,
            localName: req.body.localName,
            teamName: req.body.teamName
        });
        res.status(204).end();
});


app.delete("/local-city-name/:id", (req,res)=>{
    localCityName.delete(req.params.id);
    console.log(`Deleted local city name ${req.params.id}`);
    res.send(204).end();
});


// LOCAL TEAM NAME CRUDE ENDPOINTS
app.get("/local-team-name", (req,res)=> {
    res.json(localTeamName.get());
});

app.post("/local-team-name", jsonParser, (req,res)=>{
    const requiredNames = ["localName", "teamColor"];
    for (let i =0; i < requiredNames.length; i++){
        const field = requiredNames[i];
        if(!(field in req.body)){
            const msg = `Missing ${field} in request body`;
            console.error(msg);
            return res.status(400).send(msg);
        }
    }
    const item = localTeamName.create(req.body.localName, req.body.teamColor);
    res.send(201).json(item);
});

app.delete("/local-team-name/:id", (req,res) => {
    localTeamName.delete(req.params.id);
    console.log(`Deleted local team name ${req.params.id}`);
    res.status(204).end();
});

app.put("/local-team-name/:id", jsonParser, (req,res)=> {
    const requiredNames = ["localName", "teamColor", "id"];
    for (let i =0; i < requiredNames.length; i++){
        const field = requiredNames[i];
        if(!(field in req.body)){
            const msg = `Missing ${field} in request body`;
            console.error(msg);
            return res.status(400).send(msg);
        }
    }
    if(req.params.id !== req.body.id){
        const msg = `Request path id (${req.path.id}) and request body if (${req.body.id}) must match`;
        console.error(msg);
        return res.status(400).send(msg);
    } 
        console.log(`Updating local city name ${req.params.id}`);
        localTeamName.update({
            id: req.params.id,
            localName: req.body.localName,
            teamColor: req.body.teamColor
        });
        res.status(204).end();
});



app.listen(5000);