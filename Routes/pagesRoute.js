
// const express = require('express');

// const {paymentpageadmin,titlipagesignup,cricketpageadmin,cricketpagesignup,titliadminlogin,matkapagelogin,avaitorpagesignup,aarpaarparchpagelogin,avaitoradminlogin,matkaadminlogin} = require('../controller/pagesControler');
// const router = express.Router();

// router.post('/admin/cricketpagesignup', cricketpagesignup); 
// router.post('/admin/titlipagesignup', titlipagesignup);
// router.post('/admin/signupmatka', matkapagelogin);   
// router.post('/admin/avaitorpagesignup', avaitorpagesignup);  
// router.post('/admin/aarpaarparchpagelogin', aarpaarparchpagelogin);  

// router.post('/page/matka/login', matkaadminlogin);

// router.post('/page/login', avaitoradminlogin);
// router.post('/page/tittli/login', titliadminlogin);
// router.post('/page/cricket/login', cricketpageadmin);
// router.post('/page/payment/login', paymentpageadmin);


// module.exports = router;

const express = require('express');

const {updateclientbalance,getagentclient,createclientsbyagent,profileContext,getAgentProfile,paymentpageadmin,titlipagesignup,cricketpageadmin,agentcreate,titliadminlogin,matkapagelogin,avaitorpagesignup,aarpaarparchpagelogin,avaitoradminlogin,matkaadminlogin,agentLogin } = require('../controller/pagesControler');
const router = express.Router();

router.post('/admin/cricketpagesignup', agentcreate); 
router.post('/admin/titlipagesignup', titlipagesignup);
router.post('/admin/signupmatka', matkapagelogin);   
router.post('/admin/avaitorpagesignup', avaitorpagesignup);  
router.post('/admin/aarpaarparchpagelogin', aarpaarparchpagelogin);  

router.post('/page/matka/login', matkaadminlogin);

router.post('/page/login', avaitoradminlogin);
router.post('/page/tittli/login', titliadminlogin);
router.post('/page/cricket/login', cricketpageadmin);
router.post('/page/payment/login', paymentpageadmin);
router.post('/agent/login', agentLogin);
router.get('/agent/:id', getAgentProfile);
router.get('/profileContext/:id', profileContext);
router.post('/createclientsbyagent',createclientsbyagent)
router.get('/agent/getagentclient/:id', getagentclient);
router.post('/agent/updateclientbalance',updateclientbalance)
module.exports = router;



