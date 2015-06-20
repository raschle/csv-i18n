# csv-i18n

> Convert CSV to json translation files

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install csv-i18n --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('csv-i18n');
```

## The "csv_json_i18n" task

### Overview
In your project's Gruntfile, add a section named `csv_json_i18n` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  csv_json_i18n: {
    your_target: {
      translations:{
          key: "code", // the name of the column in the csv file which is the key of the translation
          languages: ["heb", "eng"] // the name of the column/s you wish to translate
        },
        files: {
          'tmp/i18n.json': ['test/fixtures/i18n.csv']
        }
    },
  },
})
```

### Usage Examples

The above example, will create 2 json files: one for hebrew and one from english.
It will read the file test/fixtures/i18n.csv and will create tmp/i18n.heb.json and tmp/i18n.eng.json files

If i18n.csv will look like this:
code,heb,eng
YES,כן,yes
NO,לא,no

i18n.eng.json for example, will look like this:
{"YES":"yes","NO":"no"}

You can then, obtain the translation file via require/ajax and use it with a simple translation function like this:
```js
// obtain LANGFILE somehow...
// then:
var lang = JSON.parse(LANGFILE);
var translate = function(code) {
  if(str == "" ) return "";
  if(lang[str]) return lang[str];
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.0.1 - first release

## License
Copyright (c) 2015 Yakir. Licensed under the MIT license.
