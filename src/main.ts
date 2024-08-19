import './lib/setup.js';

import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
	intents: [GatewayIntentBits.Guilds]
});

await client.login();
