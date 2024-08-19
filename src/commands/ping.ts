import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	description: 'ping pong'
})
export class UserCommand extends Command {
	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand({
			name: this.name,
			description: this.description
		});
	}

	public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		const pingMessage = await interaction.reply({ content: 'Ping?', fetchReply: true });

		const content = `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
			pingMessage.createdTimestamp - interaction.createdTimestamp
		}ms.`;

		return interaction.editReply({
			content
		});
	}
}
