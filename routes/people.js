const {getTeams,getTeamById,saveTeam,removeTeam,addPlayerOnTeam, 
    addCoachOnTeam,addEventOnTeam,getPlayersByTeamId,getCoachesByTeamId,
    getEventsByTeamId,savePerson,getPeople} = require('../service/teamsService.js');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.get('/', async (req,res) =>{
    let people = await getPeople();
    res.send(people);

});

router.post('/', async (req, res) => {
    //const { error } = validate(req.body); 
    //if (error) return res.status(400).send(error.details[0].message);
  
    var person = await savePerson(req.body);
    
    res.send(person);
  });
module.exports = router;
