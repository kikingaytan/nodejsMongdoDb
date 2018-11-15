const {
    getTeams,
    getTeamById,
    saveTeam,
    removeTeam,
    addPlayerOnTeam,
    addCoachOnTeam,
    addEventOnTeam,
    getPlayersByTeamId,
    getCoachesByTeamId,
    getEventsByTeamId,
    savePerson,
    getPeople
} = require('../service/teamsService.js');

const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'c:\\uploads')
    },
    filename: function(req, file, cb) {
        //cb(null,file.filename);
        cb(null, new Date().toISOString() + file.originalname);
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const router = express.Router();
router.get('/', async(req, res) => {
    let people = await getPeople();
    res.send(people);

});

router.post('/', upload.single('photeImage'), async(req, res) => {
    //const { error } = validate(req.body); 
    //if (error) return res.status(400).send(error.details[0].message);
    console.log(req.file.path);
    // fieldProductImage: req.file.path
    var person = await savePerson(req.body);

    res.send(person);
});
module.exports = router;