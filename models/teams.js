const Joi = require ('joi');
const mongoose = require('mongoose');

const Address = mongoose.model('addresses', new mongoose.Schema({
    locationName : String,
    address : String,
    address2 : String,
    state : String,
    city : String,
    zip : String
}));
var peopleSchema = new mongoose.Schema({
    personId:mongoose.Schema.Types.ObjectId,
    name : String,
    lastName : String
    //type : String,
    //picture : String,
    //phone : String,
    //description : String,
    //status : String
});
const People = mongoose.model('people',peopleSchema,'people');

  const Team = mongoose.model('teams',new mongoose.Schema({
    name: String,
    players:[
       // { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        //{ position: String},
        //{ jerseyNumber:Number}
    ],
    events:[],
    //coaches:[]
    coaches:[{
        position: String,
        personId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'people' 
        }
    }]
  }));
  function validateTeam(team){
      const schema ={
          name: Joi.string().min(5).max(50).required()
      };
      return Joi.validate(customer,schema);
  }

  exports.Team = Team;
  exports.People= People;
  exports.validate = validateTeam;