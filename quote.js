const fetch = require("node-fetch");

module.exports = {
	name: 'quote',
	description: 'Quote!',
	execute(message, args, client) {
    function getQuote() {
      return fetch("https://zenquotes.io/api/random")
        .then(res =>{
          return res.json()
        })
        .then(data =>{
          return data[0] ["q"] +  " - " + data[0] ["a"]
        })
    };

    getQuote().then(quote => message.channel.send(quote))
	},
};
