/*
 * centure-i18n
 * 
 *
 * Copyright (c) 2015 Yakir
 * Licensed under the MIT license.
 */

'use strict';

var Converter = require("csvtojson").core.Converter;
var fs = require("fs"); 

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('csv_json_i18n', 'Convert CSV to json translation files', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
          key: "key",
          languages: ["en", "de"]
    });

    var key = this.data.translations.key;
    var languages = this.data.translations.languages;
	var suffix = this.data.suffix;
	
    var done = this.async();
    //Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath){
          var fileStream = fs.createReadStream(filepath);
          var csvConverter = new Converter({constructResult:true});

           //end_parsed will be emitted once parsing finished 
          csvConverter.on("end_parsed",function(jsonObj){
            // Creating the translation object
             var translations = {};
             languages.forEach(function(lang){
                translations[lang] = {};
             });
             // Populating the translation object with keys and values
             jsonObj.forEach(function(record){
				if(record[key].startsWith("//")) return;
                languages.forEach(function(lang){
					
					var recordParts = record[key].split('.');
					
					if(recordParts.length === 1) {
						translations[lang][record[key]] = record[lang];
					} else if (recordParts.length === 2){
						
						if(!translations[lang][recordParts[0]]) {
							translations[lang][recordParts[0]] = {};
						}
						translations[lang][recordParts[0]][recordParts[1]] = record[lang];
					} else if (recordParts.length === 3){
						
						if(!translations[lang][recordParts[0]]) {
							translations[lang][recordParts[0]] = {};
						}
						if(!translations[lang][recordParts[0]][recordParts[1]]) {
							translations[lang][recordParts[0]][recordParts[1]] = {};
						}
						translations[lang][recordParts[0]][recordParts[1]][recordParts[2]] = record[lang];
					}
                  
                 });
             });
             // Saving each language in a separate file, composed out of the file parts
            languages.forEach(function(lang){
				var flangName = file.dest.concat(lang,suffix);
                grunt.file.write(flangName, JSON.stringify(translations[lang]));
             });

             done();
          });
          //read from file 
          fileStream.pipe(csvConverter);
      });
    });
  });
};
