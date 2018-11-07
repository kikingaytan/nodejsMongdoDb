const {getTeams,getTeamById,saveTeam,removeTeam,addPlayerOnTeam, 
    addCoachOnTeam,addEventOnTeam,getPlayersByTeamId,getCoachesByTeamId,
    getEventsByTeamId} = require('../service/teamsService.js');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.get('/', async (req,res) =>{
    let teams = await getTeams();
    res.send(teams);
});

router.get('/:id', async (req,res)=>{
    let team = await getTeamById(req.params.id)
    res.send(team);
})
router.get('/:id/players', async (req,res)=>{
    let players = await getPlayersByTeamId(req.params.id)
    res.send(players);
})
router.get('/:id/coaches', async (req,res)=>{
    let coaches = await getCoachesByTeamId(req.params.id)
    res.send(coaches);
})
router.get('/:id/events', async (req,res)=>{
    let events = await getEventsByTeamId(req.params.id)
    res.send(events);
})
router.post('/', async (req, res) => {
    //const { error } = validate(req.body); 
    //if (error) return res.status(400).send(error.details[0].message);
    var team = await saveTeam(req.body);
    
    res.send(team);
  });
module.exports = router;