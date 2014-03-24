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
var rootpath = process.cwd();
var utils = require('js-combine-pack');
var tool = utils.tool;
var toolOptions = tool.config;

var findFiles = tool.findFiles;
var byline = tool.lineStream;
var dStream = tool.depsStream;

var md5Cache = tool.md5Cache;

function isJs(path) {
	return Path.extname(path) === '.js';
}

function isDirPath(path) {
	return Path.lastIndexOf('/') === path.length - 1;
}

module.exports = function(grunt) {
	grunt.registerMultiTask('csscombine', 'a simple, efficient, convenient css combine', function() {
	 //    var done = this.async();   
	 //    var options = this.options({
	 //     //    projectName : 'blog7',
	 //     //    reset : true,
	 //    });

		// if (options.projectName) {
		// 	toolOptions.projectName = options.projectName;
		// }

		// if(!options.reset){
		// 	toolOptions.reset = options.reset;
		// }

		// if(options.minify){
		// 	toolOptions.minify = options.minify;
		// }

	 //    this.files.forEach(function(f) {
	 //      	var confList, jsListCon, jsList;
	 //      	//打包后的地址传给配置文件
	 //      	toolOptions.publishUrl = f.dest;
	      	
		//     f.src.filter(function(path) {
		//         if (grunt.file.exists(path)) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		//     }).forEach(function(path) {
		//     	if(grunt.file.isDir(path)){
		//     		//若设置工程名，读取要打包的工程
		//     		if (options.projectName) {
		//     			path = Path.resolve(path,options.projectName);
		//     		}
		//     		//设置要打包的文件的绝对路径
		//     		toolOptions.srcUrl = Path.resolve(rootpath,path);
		    		
		//     		//获取要打包的文件夹下所有的js文件地址
		//     		jsList = findFiles.allFilesList(path);
		//     		//获取要打包的文件夹下所有的js文件内容
		//     		jsListCon = findFiles.allFilesCon(jsList);
		//     		//获取要打包的文件夹下所有需要合并并打包的文件列表
		//     		confList = findFiles.confList(jsList);
		//     		//是否进行增量打包，默认情况下全部打包，即不进行增量打包
		//     		if(toolOptions.reset){
		//     			fs.unlink(toolOptions['cacheMapUrl'],function(err){
		// 					if(err){
		// 						console.log('error');
		// 						return;
		// 					}
		// 				});
		//     		}
		//     		//合并js依赖文件的方法 并且查找依赖结束后直接进行压缩文件
		// 			var loadDeps = function(config,confList,jsMap,jsDepsMap){
		// 				if(confList && confList.length){
		// 					var confFile = confList.shift();
		// 					var lineStream = new byline();
		// 					var depsStream  = new dStream(done);
		// 					var confStream = fs.createReadStream(confFile);
		// 					confStream.pipe(lineStream);
		// 					lineStream.pipe(depsStream);
		// 					depsStream.pipe(lineStream,config,confFile,jsMap,confList,jsDepsMap,loadDeps);
		// 				}
		// 			};	
		// 			//此方法用来判断增量打包变更的文件，若reset为true，此方法返回值始终为false
		// 			var changedFile = md5Cache(toolOptions,jsListCon);
		// 			if(changedFile === false){
		// 				//全部打包文件
		// 				var jsDepsMap = {};
		// 				confList.forEach(function(value,key){	
		// 					confList[key] = value;
		// 				});
		// 				loadDeps(toolOptions,confList,jsListCon,jsDepsMap);
		// 			}else{
		// 				//增量打包文件
		// 				var combineList = [];
		// 				var jsDepsMap = JSON.parse(fs.readFileSync(toolOptions.depsMapUrl,'utf-8'));
		// 				changedFile.forEach(function(value){
		// 					if(jsDepsMap[value]){
		// 						combineList.push(value);
		// 					}
		// 					for(var i in jsDepsMap){
		// 						if(jsDepsMap[i].indexOf(value) >=0){
		// 							if(combineList.indexOf(i) < 0){
		// 								combineList.push(i);
		// 							}
		// 						}
		// 					}
		// 				});
		// 				loadDeps(toolOptions,combineList,jsListCon,jsDepsMap);
		// 			}	
		//     	}
		//     });
	 //    });
	});
};
