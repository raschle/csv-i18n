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

  grunt.registerMultiTask('centure_i18n', 'Convert CSV to json translation files', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
          key: "code",
          languages: ["heb", "eng"]
    });

    var key = this.data.translations.key;
    var languages = this.data.translations.languages;

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
                languages.forEach(function(lang){
                    translations[lang][record[key]] = record[lang];
                 });
             });
             // Dest file name parts
             var fileParts = file.dest.split('.');
             
             // Saving each language in a separate file, composed out of the file parts
            languages.forEach(function(lang){
                var flangName = fileParts[0].concat(".", lang, ".", fileParts[1]);
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
