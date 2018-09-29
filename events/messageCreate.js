const { Collection } = require('eris');

module.exports = (client, msg) => {
	if(msg.author.bot || !msg.channel.guild) return undefined;
	if(!msg.content.startsWith(client.config.prefix)) return undefined;
	const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
	if(!cmd) return undefined;
	if(!parseCmd(client, msg, cmd.info)) return undefined;
	return cmd.run(client, msg, args);
}

function parseCmd(client, msg, cmd){
	if(cmd.ownerOnly && !client.config.owners.includes(msg.author.id)){
		msg.channel.createMessage('❌ | <@${msg.author.id}>, Only my developer can execute this command');
		return false;
	}
	if(cmd.cooldown){
		const now = Date.now();
		const commandCooldown = client.cooldowns.get(cmd.name) || new Collection();
		const userCooldown = commandCooldown.get(msg.author.id) || 0;
		const estimatedTime = userCooldown+(cmd.cooldown*1000) - now;
		if(userCooldown && !client.config.owners.includes(msg.author.id) && estimatedTime > 0){
			msg.channel.createMessage(`⏱ | <@${msg.author.id}>, You can use this command again in \`${estimatedTime/1000}s\``);
			return false;
		}
		commandCooldown.set(msg.author.id, now);
		client.cooldowns.set(cmd.name, commandCooldown);
	}
	return true;
}
