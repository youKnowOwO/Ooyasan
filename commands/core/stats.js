const moment = require('moment');
require('moment-duration-format');
const { version, dependencies, repository } = require('../../package.json');
const EmbedBuilder = require('../../structures/EmbedBuilder.js');

exports.run = async (client, msg, args) => {
	const embed = new EmbedBuilder()
	.setColor(0x0089FF)
	.setTitle('My Current statistic')
	.setThumbnail(client.user.dynamicAvatarURL('.png'))
	.setDescription(`\`\`\`
Memory Usage   : ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB
Uptime         : ${moment.duration(client.uptime).format('hh:mm:ss', { trim: false })}
Owners         : ${client.config.owners.map(x => `${client.users.get(x).username}#${client.users.get(x).discriminator}`).join(', ')}
Users          : ${client.users.size.toLocaleString()}
Channels       : ${client.channels.size.toLocaleString}
Servers        : ${client.guilds.size.toLocaleString}
Library        : Eris v${require('eris/package.json').version}
Node           : ${process.version}
Version Bot    : v${version}\`\`\``)
	.addField('📌 Dependencies', Object.entries(dependencies).map(x => parseDependencies(x[0], x[1]).join(', '));
	return msg.channel.createMessage({embed});
}

function parseDependencies (name, src){
	if(src.startsWith('github:')){
		const repo = src.replace('github:', '').split('/');
		return `[${name}](https://github.com/${repo[0]}/${repo[1].replace(/#.+/, '')})`;
	}
	return `[${name}](https://npmjs.com/${name})`;
}

exports.info = {
	name: 'stats',
	description: 'show current statistic bot',
	usage: 'stats',
	aliases: [],
	ownerOnly: false,
	cooldown: 0
}
