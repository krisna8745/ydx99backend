const MarketLK = require('../models/marketLogicModel');
const User = require('../models/UserSignUp');
const Bet = require('../models/cricketMarketModel');
const agentLedgeModel=require('../models/agentLedgeModel');
const AgentPageModel=require('../models/AgentPageModel');
const ClientLedger=require('../models/clientledger');

const getmatchbets = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Step 1: Get all users with the same agent
    const users = await User.find({ agent: agentId }, '_id'); // only fetch _id
    const userIds = users.map(user => user._id); // extract array of ObjectIds

    // Step 2: Get all bets placed by those users
    const bets = await MarketLK.find({ user: { $in: userIds }})
                               .populate('user', 'username email agent userNo'); // optional: populate user info

    res.json(bets);
  } catch (error) {
    console.error('Error fetching bets:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};


const getsessionbets = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Step 1: Get all users with the same agent
    const users = await User.find({ agent: agentId }, '_id'); // only fetch _id
    const userIds = users.map(user => user._id); // extract array of ObjectIds

    // Step 2: Get all bets placed by those users
    const bets = await Bet.find({ userId: { $in: userIds }})
                               .populate('userId', 'username email agent userNo'); // optional: populate user info

    res.json(bets);
  } catch (error) {
    console.error('Error fetching bets:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};




const getagentledger = async (req, res) => {
  const { agentId } = req.params;
  try {
    const data = await agentLedgeModel.find({agentNo: agentId });
    const agentledge = await AgentPageModel.find({AgentNo: agentId });
    res.json({data:data,agentledge:agentledge});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getclientledgeruser = async (req, res) => {
  const { agentId } = req.params;
  try {
    const data = await User.find({agent: agentId },'email userNo');
    
    res.json({data:data});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateclientledger = async (req, res) => {
  try {
    const {
      agentNo,
      amount,
      clientId,
      collection,
      date,
      paymentType,
      remark
    } = req.body;

    // Validate input
    if (!agentNo || !amount || !clientId || !collection || !date || !paymentType || !remark) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert amount to number
    const amt = Number(amount);
    if (isNaN(amt)) {
      return res.status(400).json({ message: 'Amount must be a number' });
    }

    // Determine debit or credit based on paymentType
    const debit = paymentType === 'PAYMENT-DIYA' ? amt : 0;
    const credit = paymentType === 'PAYMENT-LIYA' ? amt : 0;

    // For now, set balance equal to debit or -credit
    const balance = debit - credit;

    const newLedger = new ClientLedger({
      agentNo,
      client: clientId,
      collectionName: remark,
      date,
      debit,
      credit,
      balance,
      paymentType:collection,
      doneBy: "client"
    });

    const saved = await newLedger.save();
    res.status(201).json({ message: 'Ledger entry saved', data: saved });

  } catch (error) {
    console.error('Ledger Save Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getclientledgerfatch = async (req, res) => {
  const { agentId } = req.params;
  try {
    const data = await ClientLedger.find({agentNo:agentId });
    
    res.json({data:data});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getmatchbets ,getsessionbets,getagentledger,getclientledgeruser,updateclientledger,getclientledgerfatch
};
