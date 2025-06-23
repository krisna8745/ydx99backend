const express = require('express');

const {getmatchbets,getsessionbets,getagentledger,getclientledgeruser,updateclientledger,getclientledgerfatch} = require('../controller/agentControler');
const router = express.Router();

router.get('/getmatchbets/:agentId', getmatchbets); 
router.get('/getsessionbets/:agentId', getsessionbets); 
router.get('/agent-ledger/:agentId', getagentledger); 
router.get('/getclientledgeruser/:agentId', getclientledgeruser); 
router.post('/update/client-ledger', updateclientledger); 
router.get('/fatch/get-client-ledger/:agentId', getclientledgerfatch); 
module.exports = router;

