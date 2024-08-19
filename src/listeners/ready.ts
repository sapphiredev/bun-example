import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener, type Store } from '@sapphire/framework';
import { envParseString } from '@skyra/env-utilities';
import { createBanner } from '@skyra/start-banner';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import figlet from 'figlet';
import gradient from 'gradient-string';

@ApplyOptions<Listener.Options>({ once: true })
export class UserListener extends Listener<typeof Events.ClientReady> {
	private readonly style = this.isDev ? yellow : blue;

	public run() {
		this.printBanner();
		this.printStoreDebugInformation();
	}

	private get isDev() {
		return envParseString('NODE_ENV') === 'development';
	}

	private printBanner() {
		const success = green('+');

		const llc = this.isDev ? magentaBright : white;
		const blc = this.isDev ? magenta : blue;

		console.log(
			createBanner({
				name: [gradient.retro.multiline(figlet.textSync('Bun Example'))],
				extra: [
					//
					`[${success}] Gateway`,
					this.isDev ? ` ${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''
				]
			})
		);
	}

	private printStoreDebugInformation() {
		const { client } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) console.log(this.styleStore(store, false));
		console.log(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
