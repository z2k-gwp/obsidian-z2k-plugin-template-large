// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-template-large Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: ui.ts
//    - This source file contains code related to modal boxes and menus to display
//    - Please see https://github.com/z2k-gwp/obsidian-z2k-template-large for more information
//
//

// ======================================================================================================
// Imports
// ======================================================================================================
// 

// 3rd Party Imports
import type moment from "moment";

// Obsidian Imports
import { App, Menu, Modal, Point } from "obsidian";


// ======================================================================================================
// Commands
// ======================================================================================================
// 

// todo: move over configureCommands() to here.


/* ------------------------------------------------------------------------------------------------------ */
// showFileMenu
/* ------------------------------------------------------------------------------------------------------ */
/**
 * Shows a pull down menu when the ribbon button is right clicked
 * 
 * @param  {App} app
 * @param  {ISettings} settings
 * @param  {Point} position
 * @returns void
 */
export function showContextMenu(
    app: App,
    settings: ISettings,
    position: Point
  ): void {
    const contextMenu = new Menu(app);
  
    // Need to do more here...
    contextMenu.addItem((item) =>
          item
            .setTitle(`Twist and Shout`)
            .setIcon(`dice`)
            .onClick(() => { })
        );
    
    contextMenu.showAtPosition(position);
  }