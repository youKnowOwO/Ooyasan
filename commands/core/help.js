const EmbedBuilder = require('../../structures/EmbedBuilder.js');

exports.run = async (client, msg, args) => {
	if(args[0]){
		const { info } = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0])) || {};
		if(!info) return undefined;
		const embed = new EmbedBuilder()
		.setColor(Math.floor(Math.random()*0xFFFFFF))
		.setTitle(`📁 Command help for ${info.name}`)
		.setDescription(info.description || 'No description provided')
		.addField('Usage', info.usage || 'No usage provided')
		.addField('Aliases', info.aliases.map(x => `\`${x}\``).join(', ') || 'No aliases provided')
		.addField('Cooldown', `${info.cooldown}s`);
		
		return msg.channel.createMessage({embed});
	}
	const category = Array.from(new Set(client.commands.map(x => x.info.category)));
	const embed = new EmbedBuilder()
	.setColor(Math.floor(Math.random()*0xFFFFFF))
	.setAuthor(`${client.user.username}'s commands`, client.user.dynamicAvatarURL('.png'));
	for(const cat of category){
		embed.addField(`**${toPlural(cat)}**`, client.commands.filter(x => x.info.category === cat).map(x => `\`${x.info.name}\``).join(', '));
	}
	return msg.channel.createMessage({embed});
}

function toPlural(str){
	let arr = str.toLowerCase().split('');
	arr[0] = arr[0].toUpperCase();
	return arr.join('');
}

exports.info = {
	name: 'help',
	description: 'the first command you\'ll typing',
	usage: 'help [command]',
	aliases: ['h'],
	ownerOnly: false,
	cooldown: 3
}
