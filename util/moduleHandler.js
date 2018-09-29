const { readdirSync } = require('fs');
const { Collection } = require('eris');

const Command = new Collection();
const Aliases = new Collection();

for(const module of readdirSync('./commands')){
	console.log(`Load module ${module}....`);
	for(const command of readdirSync(`./commands/${module}`).filter(x => x.endsWith('.js')){
		const cmd = require(`../commands/${module}/${command}`);
		console.log(`Loading command ${cmd.info.name} ...`);
		cmd.info.category = module;
		Command.set(cmd.info.name.toLowerCase(), cmd);
		for(const alias of cmd.info.aliases){
			Aliases.set(alias.toLowerCase(), cmd.info.name.toLowerCase());
		}
	}
}

module.exports = { Command, Aliases }
