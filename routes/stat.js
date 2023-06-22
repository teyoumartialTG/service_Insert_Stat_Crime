const express = require( 'express');
const router = express.Router();

// Require controller modules.
const statControllers = require('../controllers/statControllers')

router.get('/', statControllers.index);

router.get('/:pays/:ville/:quartier/:crime', statControllers.stat);

router.get('/:pays/:ville', statControllers.statcirculaire);

router.get('/Banditisme', statControllers.statcirculaireBanditisme);

router.get('/Viol', statControllers.statcirculaireViol);

router.get('/Vol', statControllers.statcirculaireVol);

router.get('/Meurtre', statControllers.statcirculaireMeurtre);

router.post('/', statControllers.insert);

router.put('/:id', statControllers.update);

router.delete('/:id', statControllers.delete);

module.exports = router;