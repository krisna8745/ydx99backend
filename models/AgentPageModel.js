const mongoose = require('mongoose');

const agentPageSchema = new mongoose.Schema({
  username: { type: String, required: true }, // e.g., '8979066955'
  name: { type: String, required: true },     // e.g., 'Mehraj Ali Khan'
  password: { type: String, required: true }, // e.g., '123456'
  balance: { type: Number, default: 0 },      // e.g., 10000
  commType: { type: String, default: 'Bet by Bet' },
  matchComm: { type: String, default: '0' },
  sessComm: { type: String, default: '0' },
  casinoComm: { type: String, default: '0' },
  createdBy: { type: String, default: 'admin' },
  AgentNo: { type: String },                  // optional
}, { timestamps: true });

const AgentPageModel = mongoose.model('AgentPageModel', agentPageSchema);
module.exports = AgentPageModel;
