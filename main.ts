import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { helix } from 'codemirror-helix';

interface HelixSettings {
	enableHelixKeybindings: boolean;
}

const DEFAULT_SETTINGS: HelixSettings = {
	enableHelixKeybindings: false
}

export default class HelixPlugin extends Plugin {
	settings: HelixSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new HelixSettingsTab(this.app, this));

		if (this.settings.enableHelixKeybindings) {
			this.registerEditorExtension([helix()]);
		}

		this.addCommand({
			id: "toggle-helix-keybindings",
			name: "Toggle Helix keybindings",
			callback: async () => this.setEnabled(!this.settings.enableHelixKeybindings),
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	setEnabled(value: boolean) {
		this.settings.enableHelixKeybindings = value;
		this.saveSettings();
		const stateMessage = value ? "Enabled" : "Disabled";
		new Notice(`${stateMessage} Helix keybindings. Please reload Obsidian to see the changes`);
	}
}

class HelixSettingsTab extends PluginSettingTab {
	plugin: HelixPlugin;

	constructor(app: App, plugin: HelixPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("p", { text: "Vim keybindings must be disabled for the plugin to work" });

		new Setting(containerEl)
			.setName('Enable Helix keybindings')
			.setDesc('Requires a reload to apply the changes')
			.addToggle(async (value) => {
				value
					.setValue(this.plugin.settings.enableHelixKeybindings)
					.onChange(async (value) => this.plugin.setEnabled(value))
			});
	}
}
