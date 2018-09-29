const { readdirSync } = require('fs');
const Client = require('./structures/Client.js');

const client = new Client(process.env.TOKEN);

for (const event of readdirSync('./events')) {
	client.on(event.split('.')[0], (...args) => require(`./events/${event}`)(client, ...args));
}

client.connect();

process.on('error', e => console.error('[ERROR]', e));
process.on('uncaughtException', e => console.error('[UNCAUGHT EXCEPTION]', e));
process.on('unhandledRejection', e => console.error('[UNHANDLED REJECTION]', e));
