# csv-i18n forked for ngx-translate compatibility

> Convert CSV to json translation files

> Added functionality for using nested objects and json filenames from language with suffix

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

You have to install this module manually from source

## Example

### Gruntfile

```js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
	  csv_json_i18n: {
		your_target: {
		  translations:{
			  key: "key", // the name of the column in the csv file which is the key of the translation
			  languages: ["en", "de"] // the name of the column/s you wish to translate
			},
			files: {
			  'src/assets/i18n/': ['src/assets/i18n/i18n.csv']
			},
			suffix: '.json'
		},
	  },
  });

  // Load the plugin
  grunt.loadNpmTasks('csv-i18n');

  // Default task(s)
  grunt.registerTask('default', ['csv_json_i18n']);

};
```

### Usage

The above example, will create 2 json files: one for english and one for german.
It will read the file src/assets/i18n/i18n.csv and will create src/assets/i18n/en.json and src/assets/i18n/de.json

i18n.csv will look like this:
```
key,en,de
HOME.HELLO,hello,Hallo
HOME.WELCOME,welcome,Willkommen
LOGOUT,Logout,Ausloggen
```

en.json will look like this:
```
{"HOME":{"HELLO":"hello","WELCOME":"welcome"},"LOGOUT":"Logout"}
```
de.json will look like this:
```
{"HOME":{"HELLO":"Hallo","WELCOME":"Willkommen"},"LOGOUT":"Ausloggen"}
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.0.1 - first release

## License
Copyright (c) 2015 Yakir. Licensed under the MIT license.
