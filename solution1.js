const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:37017/soccer')
.then(  () => console.log('connected to mongo db'))
.catch(err => console.log('error ',err));
//mongoose.connect('mongodb://localhost:37017/');


async function getTeams() {
  //como va lidear con operaciones FS va a regresar la respuesta
  //en un futuro por eso hay que esperar a que regrese
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
  .findById(id);
}

async function saveTeam(newTeam ) {
  //como va lidear con operaciones FS va a regresar la respuesta
  //en un futuro por eso hay que esperar a que regrese
  return  result = await Team.save(newTeam) 
}

async function removeTeam(id ) {
  return  team = await Team.findByIdAndRemove({_id:id});
}

async function addPlayerOnTeam(id, player1 ) {
  const team = await Team.findByIdAndUpdate (id, 
    {$push: {players: player1}}, {new : true}
   );
  if (!team) return;
  return team;
}

async function addCoachOnTeam(id, coach ) {
  const team = await Team.findByIdAndUpdate (id, 
    {$push: {coaches: coach}}, {new : true}
   );
  if (!team) return;
  return team;
}

async function addEventOnTeam(id, event ) {
  const team = await Team.findByIdAndUpdate (id, 
    {$push: {events: event}}, {new : true}
   );
  if (!team) return;
  return team;
}

async function getPlayersByTeamId(idTeam ) {
  var playersResults = await Team
  .find({ _id: idTeam  })
  //.sort({ players.jerseyNumber: 1 })
//  .select({ name: 1, author: 1 });
.select({players:1, _id:0});
  if (playersResults && playersResults.length>0 ){
    var response1 = playersResults[0];
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
    return eventsArray=response1.events;
  }
  return ;
}

async function run() {
  var player1 ={
    personId : 3,
    position : 'Third Sub Coach'
  };
  //const teams = await addCoachOnTeam('5bd528516d33d93f8448cf1a',player1 );
  //const teams = await getTeamById('5bd528516d33d93f8448cf1a');
  //const events = await getEventsByTeamId('5bd528516d33d93f8448cf1a');
  const events = await addCoachOnTeam('5bd528516d33d93f8448cf1a',player1);

  console.log(events);
}

run();
