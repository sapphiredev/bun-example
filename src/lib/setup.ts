import '@sapphire/plugin-logger/register';

// Unless explicitly defined, set NODE_ENV as development:
process.env.NODE_ENV ??= 'development';

import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework';
import { setup } from '@skyra/env-utilities';
import * as colorette from 'colorette';

colorette.createColors({ useColor: true });

setup();

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

declare module '@skyra/env-utilities' {
	// Add your environment variables here
	interface Env {
		DISCORD_TOKEN: string;
	}
}
