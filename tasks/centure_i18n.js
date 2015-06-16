/*
 * centure-i18n
 * 
 *
 * Copyright (c) 2015 Yakir
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('centure_i18n', 'Convert CSV to json translation files', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });


    var Converter=require("csvtojson").core.Converter;
    var fs=require("fs");
     
    var csvFileName=this.files[0].src[0];
     console.log(csvFileName);
    var fileStream=fs.createReadStream(csvFileName);
    //new converter instance 
    var csvConverter=new Converter({constructResult:true});
    
//    var done = this.async();

    // //end_parsed will be emitted once parsing finished 
    // csvConverter.on("end_parsed",function(jsonObj){
    //    var translations = {heb: [], eng: []};
    //    jsonObj.forEach(function(record){
    //       translation.heb.push({record.code, record.heb});
    //       translation.eng.push({record.code, record.eng});
    //    })
    //    done();
    // });
     
    //read from file 
  //  fileStream.pipe(csvConverter);


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
             var translations = {heb: {}, eng: {}};
             console.log(jsonObj);
             jsonObj.forEach(function(record){
                translations.heb[record.code] = record.heb;
                translations.eng[record.code] = record.eng;
             });
             var dotIndex = file.dest.indexOf('.');
             var fname = file.dest.substring(0, dotIndex);
             var hebFile = fname.concat(".heb",file.dest.substring(dotIndex));
             var engFile = fname.concat(".eng",file.dest.substring(dotIndex));
             grunt.log.writeln("hebfile: "+ hebFile);
             grunt.log.writeln("hebfile: "+ translations.heb);
             grunt.file.write(hebFile, JSON.stringify(translations.heb));
             grunt.file.write(engFile, JSON.stringify(translations.eng));
             done();
          });
           
          //read from file 
          fileStream.pipe(csvConverter);

      });
    });
    //.map(function (filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(file.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + file.dest + '" created.');
    // });
  });

};
