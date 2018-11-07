const mongoose = require('mongoose');
const {Team,People,validate} = require('../models/teams.js')
mongoose.connect('mongodb://localhost:37017/soccer')
.then(  () => console.log('connected to mongo db'))
.catch(err => console.log('error ',err));

async function getTeams() {
  //como va lidear con operaciones FS va a regresar la respuesta
  //en un futuro por eso hay que esperar a que regrese
  console.log('Team ',Team);
  return await Team
//  .find({ isPublished: true, tags: 'backend' })
//  .find({ category : 'premium' })
  .find({  })
  .sort({ name: 1 })
//  .select({ name: 1, author: 1 });
.select({});
}

async function getTeamById(id ) {
  return await Team
  .find({_id:id})
  .populate('coaches.personId')
  .exec();
  //.exec(function(error,response){
  //  if (error) console.log('error : ',error);
  //  if (response) console.log('response ',response);
  //});
  
}

async function getPeople() {
  //como va lidear con operaciones FS va a regresar la respuesta
  //en un futuro por eso hay que esperar a que regrese
  console.log('People ',People);
  return await People
//  .find({ isPublished: true, tags: 'backend' })
//  .find({ category : 'premium' })
  .find({})
  .sort({ name: 1 })
//  .select({ name: 1, author: 1 });
.select({});
}
async function saveTeam(newTeam ) {
  //como va lidear con operaciones FS va a regresar la respuesta
  //en un futuro por eso hay que esperar a que regrese
  console.log('newTeam',newTeam);
  var coach = await People.find({_id:'5bdf1d94524ea61be441762e'});
  console.log('coach',coach);
  newTeam.coaches.push({position : 'Sub Coach', personId:coach[0]._id});
  //return newTeam;
  return  await Team.create(newTeam) 
}

async function savePerson(newPerson ) {
  //como va lidear con operaciones FS va a regresar la respuesta
  //en un futuro por eso hay que esperar a que regrese
  console.log('newTeam',newPerson);
  console.log('People',People);
  var peopleModel = new People(newPerson)

  return  await People.create(peopleModel);
//  return  await People.save((function (err, newPerson) {
//    if (err) console.log('errores  ',err);
//  }));
}

async function removeTeam(id ) {
  return await Team.findByIdAndRemove({_id:id});
}

async function addPlayerOnTeam(id, player1 ) {
  return await Team.findByIdAndUpdate (id, 
    {$push: {players: player1}}, {new : true}
   );
}

async function addCoachOnTeam(id, coach ) {
  return await Team.findByIdAndUpdate (id, 
    {$push: {coaches: coach}}, {new : true}
   );
}

async function addEventOnTeam(id, event ) {
 return await Team.findByIdAndUpdate (id, 
    {$push: {events: event}}, {new : true}
   );
}

async function getPlayersByTeamId(idTeam ) {
  //console.log('idTeam =',idTeam);
  var playersResults = await Team
  .find({ _id: idTeam  })
  //.sort({ players.jerseyNumber: 1 })
//  .select({ name: 1, author: 1 });
.select({players:1, _id:0});
//console.log('players as result:',playersResults);
  if (playersResults && playersResults.length>0 ){
    var response1 = playersResults[0];
    //console.log('players as result2:',response1.players);
    return response1.players;
  }
  return ;
}

async function getCoachesByTeamId(idTeam ) {
  var coachesResults = await Team
  .find({ _id: idTeam  })
  //.sort({ players.jerseyNumber: 1 })
//  .select({ name: 1, author: 1 });
.select({coaches:1, _id:0});
  if (coachesResults && coachesResults.length>0 ){
    var response1 = coachesResults[0];
    return response1.coaches;
  }
  return ;
}

async function getEventsByTeamId(idTeam ) {
  var eventsResults = await Team
  .find({ _id: idTeam  })
  //.sort({ players.jerseyNumber: 1 })
//  .select({ name: 1, author: 1 });
.select({events:1, _id:0});
  if (eventsResults && eventsResults.length>0 ){
    var response1 = eventsResults[0];
    return response1.events;
  }
  return ;
}

exports.getTeams =getTeams;
exports.getTeamById = getTeamById;
exports.saveTeam=saveTeam;
exports.removeTeam=removeTeam;
exports.addPlayerOnTeam=addPlayerOnTeam;
exports.addCoachOnTeam=addCoachOnTeam;
exports.addEventOnTeam=addEventOnTeam;
exports.getPlayersByTeamId=getPlayersByTeamId;
exports.getCoachesByTeamId =getCoachesByTeamId;
exports.getEventsByTeamId=getEventsByTeamId;
exports.savePerson=savePerson;
exports.getPeople=getPeople;