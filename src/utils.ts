// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
// obsidian-z2k-template-large Obsidian Plugin
// +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
//
// File: utils.ts
//    - This source file contains misc utility code 
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

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Perfect place for z2K utils before we shuttle them off to a library
//  e.g. FillAutomatedFields