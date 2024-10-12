const express = require('express');

const Router = express.Router();

const  {createSocialPlateform , updateSocialPlateform, deleteSocialPlateform, getAllSocialPlateform} = require('../controllers/socialPlatefromController');


Router.post('/createsocialplateform', createSocialPlateform);

Router.put('/updatesocialplateform/:id', updateSocialPlateform);

Router.delete('/deletesocialplateform/:id', deleteSocialPlateform);

Router.get('/getallsocialplateform', getAllSocialPlateform);



module.exports = Router;