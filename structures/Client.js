const { Client, Collection } = require('eris');
const { Commands, Aliases } = require('../util/moduleHandler.js');

class OoyasanClient extends Client {
	constructor(...args){
		super(...args);
		
		this.commands = Commands;
		this.aliases = Aliases;
		this.cooldowns = new Collection;
	}
}

module.exports = OoyasanClient;
