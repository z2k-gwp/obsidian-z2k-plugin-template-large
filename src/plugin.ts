// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-template-large Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: plugin.ts
//    - This source file contains the primary plugin class
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-template-large for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// 3rd Party Imports
import type moment from "moment"; // Just import the type from obsidian

// Obsidian Imports
import { App, Plugin, Editor, MarkdownView, Notice } from "obsidian";

// Internal Plugin Imports
import { showContextMenu } from "./ui";
import { DEFAULT_SETTINGS, IZ2KTemplateLargeSettings, Z2KTemplateLargeSettingTab } from "./settings";
import { capitalize }  from "./utils";


// ======================================================================================================
// globals
// ======================================================================================================
// 
declare global {
    interface Window {
      app: App;
      moment: typeof moment;
    }
  }


  
// ======================================================================================================
// Z2KTemplateSmallPlugin Plugin Class
// ======================================================================================================
// 
export default class Z2KTemplateSmallPlugin extends Plugin {

    // My Props and locals
	public settings: IZ2KTemplateLargeSettings;
    public isInitiallyLoaded: boolean;
	private ribbonEl: HTMLElement;


	/* ------------------------------------------------------------------------------------------------------ */
	// onload
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Performed when application first loads the plugin
	 * @remarks
	 * - This is done fairly early and synchronously - so set things up and then get out of the way. 
	 * - Hook the onLayoutReady event to do more complicated and async tasks.
	 */
     async onload(): Promise<void> {

		// Initialization
		this.ribbonEl = null;

		// Bind to updateSettings event 
        this.saveSettings = this.saveSettings.bind(this);

		// Load our settings first, as this controls what we do here.
		await this.loadSettings();

		// Log debug info
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Loading"); }

		// Bind to the onLayoutReady event so we can continue our initialization once the system has settled down.
		this.app.workspace.onLayoutReady(this.onLayoutReady.bind(this));

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		if (this.settings.debugLevel >= 10) {
			var loadMoment = (window as any).moment(Date.now())
			let statusBarItemEl = this.addStatusBarItem();
			// This is of course obnoxious so please don't do this in a real plugin:
			statusBarItemEl.setText('Z2K Small Template Plugin Loaded on ' + loadMoment.format('YYYY-MM-DD hh:mm:ss'));
		}

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new Z2KTemplateLargeSettingTab(this.app, this));

	}


	/* ------------------------------------------------------------------------------------------------------ */
	// onLayoutReady
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Event handler for when the layout is done and the plugin can perform more intense actions
	 */
	 async onLayoutReady():Promise<void> {

		// Todo: I forced this to be a async declaration, but the source shows it as sync
		// Thus, I don't think this will allow be to create a synch call to createZ2KDailyLog()

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Layout is ready...."); }

		// Configure our stuff
		this.configureRibbonIcons();
		this.configureCommands();

		// So some action for your plugin
		if (this.settings.doMyMainJobOnStartup) { 
			const moment = (window as any).moment(Date.now());
			var dailyNote = await this.MyMainJob(moment);
		}
	}


    
	/* ------------------------------------------------------------------------------------------------------ */
	// configureRibbonIcons
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Helper routine for configuring any ribbon icons we have
	 */
	private configureRibbonIcons() {
		this.ribbonEl?.detach();

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Configuring Ribbon Icons...."); }

		// Create our Ribbon Button (if configured to do so)
		if (this.settings.useRibbonButton) {

			// Default icons: 'logo-crystal', 'create-new', 'trash', 'search', 'right-triangle', 'document', 'folder', 'pencil', 'left-arrow', 'right-arrow', 'three-horizontal-bars', 'dot-network', 'audio-file', 'image-file', 'pdf-file', 'gear', 'documents', 'blocks', 'go-to-file', 'presentation', 'cross-in-box', 'microphone', 'microphone-filled', 'two-columns', 'link', 'popup-open', 'checkmark', 'hashtag', 'left-arrow-with-tail', 'right-arrow-with-tail', 'lines-of-text', 'vertical-three-dots', 'pin', 'magnifying-glass', 'info', 'horizontal-split', 'vertical-split', 'calendar-with-checkmark', 'sheets-in-box', 'up-and-down-arrows', 'broken-link', 'cross', 'any-key', 'reset', 'star', 'crossed-star', 'dice', 'filled-pin', 'enter', 'help', 'vault', 'open-vault', 'paper-plane', 'bullet-list', 'uppercase-lowercase-a', 'star-list', 'expand-vertically', 'languages', 'switch', 'pane-layout', 'install'
			this.ribbonEl = this.addRibbonIcon(
				'pencil', 
				'Z2K Plugin Template Small', 
				async (evt: MouseEvent) => {
					// Called when the user clicks the icon.
					const moment = (window as any).moment(Date.now());
					var dailyNote = await this.MyMainJob(moment);
				});

			// Provide a class to the ribbon button in case someone wants to modify it with CSS (e.g. to hide)
			this.ribbonEl.addClass('z2k-template-small-ribbon-class');

			// If we want to add a right-click context menu, here is how periodic notes did it:
			// this.ribbonEl.addEventListener("contextmenu", (ev: MouseEvent) => {
			// 	showFileMenu(this.app, this.settings, {
			// 	  x: ev.pageX,
			// 	  y: ev.pageY,
			// 	});

		}	
    }	


	/* ------------------------------------------------------------------------------------------------------ */
	// configureCommands
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Helper routine for configuring any commands that we want to expose to the user
	 */
	 private configureCommands() {

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Configuring Commands"); }

		// Add a command to trigger creating the daily log
		this.addCommand({
			id: 'create-Z2K-daily-log',
			name: "Create today's daily log",
			callback: async () => {
				const currentMoment = (window as any).moment(Date.now());
				var dailyNote = this.MyMainJob(currentMoment);
			}
		});

		// Add a command to trigger creating the daily log - for a different day based on what text is currently selected
		this.addCommand({
			id: 'create-Z2K-daily-log-for-selection',
			name: "Create a daily log for the date selected in the editor",
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				let editorMoment = (window as any).moment(editor.getSelection());
				if (editorMoment.IsValid()) { 
					let result = await this.MyMainJob(editorMoment);
					editor.replaceSelection("[[" + result + "]]");	
				} else {
					new Notice("Could not figure out a date from the selected text.")
				}
			}
		});
	}	



	/* ------------------------------------------------------------------------------------------------------ */
	// onunload
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * Event handler for when the plugin is just about to be unloaded
	 */
     onunload() {

		// Debug info - output to the console
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": Unloading."); }

	}



	// ======================================================================================================
	// Managing Settings
	// ======================================================================================================

    async loadSettings(): Promise<void> {
    	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

    async saveSettings(): Promise<void> {
		// Assumes caller has already updated the plugins setting values
        await this.saveData(this.settings);    
        this.onSettingsUpdate();
      }

    private onSettingsUpdate(): void {
		this.configureCommands(); // - Not really needed, as nothing has changed
		this.configureRibbonIcons();
	}



    
	// ======================================================================================================
	// Plugin Specific Functions
	// ======================================================================================================


	/* ------------------------------------------------------------------------------------------------------ */
	// MyMainJob
	/* ------------------------------------------------------------------------------------------------------ */
	/**
	 * This function performs the main work for the plugin. 
	 * 
	 * @remarks
	 * - This will need some fleshing.
	 * 
	 * @param  {Moment} dateToCreate - a Moment variable representing the day to create
	 * @returns Promise - Filehandle to the actual note
	 */
	async MyMainJob(dateToCreate: moment.Moment): Promise<Boolean> { 

		// Sanity Checks
		if (this.settings.debugLevel >= 100) { console.log(this.manifest.name + ": MyMainJob() - Entered"); }

		// and so on...

		return true;
	}


}
