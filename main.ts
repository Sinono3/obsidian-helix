import { App, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { helix } from 'codemirror-helix';
import { Extension } from '@codemirror/state';

interface HelixSettings {
	enableHelixKeybindings: boolean;
}

const DEFAULT_SETTINGS: HelixSettings = {
	enableHelixKeybindings: false
}

export default class HelixPlugin extends Plugin {
	settings: HelixSettings;
	extensions: Extension[]

	async onload() {
		await this.loadSettings();
		this.extensions = [];
		this.addSettingTab(new HelixSettingsTab(this.app, this));
		this.setEnabled(this.settings.enableHelixKeybindings, false);
		this.registerEditorExtension(this.extensions);

		this.addCommand({
			id: "toggle-helix-keybindings",
			name: "Toggle Helix keybindings",
			callback: async () => this.setEnabled(!this.settings.enableHelixKeybindings, true, true),
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

	setEnabled(value: boolean, reload: boolean = true, print: boolean = false) {
		this.settings.enableHelixKeybindings = value;
		this.extensions.length = 0;
		if (value) this.extensions.push(helix());
		this.saveSettings();
		if (reload) this.app.workspace.updateOptions();
		if (print) {
			const msg = value ? "Enabled" : "Disabled";
			new Notice(`${msg} Helix keybindings`);
		}
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
			.addToggle(async (value) => {
				value
					.setValue(this.plugin.settings.enableHelixKeybindings)
					.onChange(async (value) => this.plugin.setEnabled(value))
			});
	}
}
