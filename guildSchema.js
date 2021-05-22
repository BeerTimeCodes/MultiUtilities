const mongoose = require('mongoose'); // Require Mongoose

let guildSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    guildID: String,
    lastEdited: String,
    prefix: { type: String, default: "-" },
    muterole: { type: String, required: false },
    memberrole: { type: String, required: false },
    welcomechannel: { type: String, required: false },
    modlogchannel: { type: String, required: false }
});
// module.exports allowes us to require the file
module.exports = mongoose.model('Guild Collection' /*<- The name of the collection*/ , guildSchema /* <- Passing thru the schema*/)
