/*
 * csscombine
 * https://github.com/liuxiaoyue/grunt-css-combine
 *
 * Copyright (c) 2014 xiaoyue
 * Licensed under the MIT license.
 */

'use strict';
var fs = require('fs');
var Path = require('path');
var utils = require('js-combine-pack');
var async = require('async');
var tool = utils.tool;
var toolOptions = tool.config;
var findFiles = tool.findFiles;
var findCssAllImport = tool.findCssAllImport;

module.exports = function(grunt) {
	grunt.registerMultiTask('csscombine', 'a simple, efficient, convenient css combine', function() {
		var done = this.async();
	    var options = this.options({
	     //    projectName : 'blog7style'
	    });
	    //设置工程名
		if (options.projectName) {
			toolOptions.projectName = options.projectName;
		}
	    this.files.forEach(function(f) {
	      	var confList, cssListCon, cssList, imageList, noCombineCssList;	
		    f.src.filter(function(path) {
		        if (grunt.file.exists(path)) {
					return true;
				} else {
					return false;
				}
		    }).forEach(function(path) {
		    	if(grunt.file.isDir(path)){
		    		//合并的根目录
		    		toolOptions.basedir = Path.resolve(path,toolOptions.projectName);
		    		//获取要合并的文件夹下所有的css文件列表包括：html，image，css
		    		cssList = findFiles.allCssFilesList(toolOptions.basedir);
		    		//获取要合并的文件夹下所有的css文件内容
		    		cssListCon = findFiles.allCssFilesCon(cssList,toolOptions.basedir);
		 		    //获取要合并的文件夹下所有需要合并的文件列表
		    		confList = cssList.filter(function(value,key){
						return (value.match(/\\conf\\/) && Path.extname(value) === '.css');
					});
		    		imageList = cssList.filter(function(value,key){
		    			return Path.extname(value) != '.css' && Path.extname(value) != '.html' && !value.match(/\\html\\/);
		    		});
		    		noCombineCssList = cssList.filter(function(value,key) {
		    			return (!value.match(/\\conf\\/) && Path.extname(value) === '.css');
		    		});
		    		noCombineCssList.forEach(function(file){
		    			var filename = file.replace(toolOptions.basedir,'');
						grunt.file.copy(file, Path.join(f.dest,filename));
						grunt.log.writeln('noCombineCssFile "' + file + '" created.');
		    		});
		    		imageList.forEach(function(file){
		    			var filename = file.replace(toolOptions.basedir,'');
						grunt.file.copy(file, Path.join(f.dest,filename));
						grunt.log.writeln('imageFile "' + file + '" created.');
		    		});
		    		async.each(confList, function(file, callback) {
		    			findCssAllImport(file,cssListCon,function(data){
		    				var filename = file.replace(toolOptions.basedir,'');
			    			grunt.file.write(f.dest + filename, data);
			    			grunt.log.writeln('File "' + f.dest + filename + '" created.');
			    		});
					},function(err){
					  	done();
					});
		    	}
		    });
	    });
	});
};
