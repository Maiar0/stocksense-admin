const express = require('express'  );
const {getOrgs, createOrg, updateOrg, deleteOrg} = require('../controllers/orgController');

const router = express.Router();

router.get('/', getOrgs);
router.post('/', createOrg);
router.put('/:id', updateOrg);
router.delete('/:id', deleteOrg);

module.exports = router;