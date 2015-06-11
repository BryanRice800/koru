/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Not neccesarley dangerous, this is just a place to add custom funtions to every single js build in object (String, Object, etc).
 * But things can go very wrong if someone does something ugly to the prototype objects without knowing exactly wat he / she is doing.
 */


/**
 * capitalizes the first letter of a string.
 * @returns the string with the first letter capitalized.
 */
String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/^./, function (match) {
        return match.toUpperCase();
    });
};