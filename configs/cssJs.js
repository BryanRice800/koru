/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Just concatenate and compress all Js and Css into a file of their own.
var nodeMinify = require('node-minify');

new nodeMinify.minify({
  type: 'uglifyjs',
  fileIn: 'public/javascripts/**/*.js',
  fileOut: 'public/dist/js/script.js',
  callback: function (error, min) {
    if (error) {
      console.log('Compressing JS error: ', error);
    }
  }
});
new nodeMinify.minify({
  type: 'csso',
  fileIn: 'public/stylesheets/css/**/*.css',
  fileOut: 'public/dist/css/style.css',
  callback: function (error, min) {
    if (error) {
      console.log('Compressing Css error: ', error);
    }
  }
});