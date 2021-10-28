## Obsidian Plugin Template for Larger Projects

## Overview
This [Obsidian](https//obsidian.md) code template is used to create larger plugins. Large is defined as:
- residing in multiple files in a .\src subdirectory
- needs classes and potentially external interfaces and additional dependencies to pull it off
- uses rollup for building and npm for library management
- (Future:) uses [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) for linting
- (Future:) uses Jest for testing

## Details
- It is assumed you are experienced enough with coding plugins that you've graduated to the next level from the [official Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)
- It is also assumed you have at least explored a small project (e.g. the [Small Plugin Template](https://github.com/z2k-gwp/obsidian-z2k-plugin-template-small))
- More documentation may be found on the [plugin's wiki pages](https://github.com/z2k-gwp/obsidian-z2k-plugin-template-large/wiki).

## Installation
- Make sure you have the basics preconfigured:
    - You've installed NodeJS/npm.
    - You are using Hot Reload
    - You have run `npm update` recently to ensure your Obsidian API is up to date.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. Put the folder in your .obsidian/plugins/your-plugin-name folder.
- run `npm i` or `yarn` to install dependencies
- Run the compile wait loop by running from the command line `npm run dev`

## Tools
- Be sure to head over to the [small plugin template's github wiki](https://github.com/z2k-gwp/obsidian-z2k-plugin-template-small/wiki) for tools to make development easier
- For more advanced topics, head over to [this template's github wiki](https://github.com/z2k-gwp/obsidian-z2k-plugin-template-large/wiki)
 and for documentation on this template.
