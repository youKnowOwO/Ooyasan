const EmbedBuilder = require('../../structures/EmbedBuilder.js');

exports.run = async (client, msg, args) => {
	const message = await msg.channel.createMessage('🏓');
	const roundTrip = message.timestamp - msg.timestamp;
	const embed = new EmbedBuilder()
	.setColor(roundTrip < 20 ? 0x00CC4E : roundTrip < 30 ? 0xFFD000 : 0xFF0011)
	.setDescription(`
⏳ RoundTrip : ${roundTrip} ms,
❤ Api Latency: ${msg.channel.guild.shard.latency.toFixed(2)} ms
	`);
	return msg.channel.createMessage({embed, content: '🏓 Pong...'});
}

exports.info = {
	name: 'ping',
	description: 'ping pong with bot',
	usage: 'ping',
	aliases: [],
	ownerOnly: false,
	cooldown: 0
}
