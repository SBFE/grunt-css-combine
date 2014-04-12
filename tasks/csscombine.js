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
	      	var confList, cssListCon, cssList;	
		    f.src.filter(function(path) {
		        if (grunt.file.exists(path)) {
					return true;
				} else {
					return false;
				}
		    }).forEach(function(path) {
		    	if(grunt.file.isDir(path)){
		    		//打包的根目录 打包的工程名 在此目录下进行打包
		    		toolOptions.basedir = Path.resolve(path,toolOptions.projectName);
		    		//获取要打包的文件夹下所有的js文件地址
		    		cssList = findFiles.allCssFilesList(toolOptions.basedir);
		    		//获取要打包的文件夹下所有的js文件内容
		    		cssListCon = findFiles.allCssFilesCon(cssList,toolOptions.basedir);
		 		    //获取要打包的文件夹下所有需要合并并打包的文件列表
		    		confList = cssList.filter(function(value,key){
									return (value.match(/\\conf\\/) || Path.extname(value) != '.css');
								});
		    		
		    		async.each(confList, function(file, callback) {
		    			findCssAllImport(file,cssListCon,function(data){
		    				var filename = Path.basename(file);
			    			grunt.file.write(f.dest + filename, data);
			    			grunt.log.writeln('File "' + f.dest + filename + '" created.');
			    		});
					}, function(err){
					  	done();
					});
		    	}
		    });
	    });
	});
};
