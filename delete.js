/*This Scripts Removes all process generated log files.*/

const fs = require('fs');
const glob = require('glob');

options = {};

glob("**/new-vendor*", options, function (er, files) {
    for (const file of files) {
         // remove file
         fs.unlinkSync(file);
        //console.log(`File is no: ${file}`);
    }
});


glob("**/sync-imprest*", options, function (er, files) {
    for (const file of files) {
         // remove file
         fs.unlinkSync(file);
        //console.log(`File is no: ${file}`);
    }
});


glob("**/sync-reversal*", options, function (er, files) {
    for (const file of files) {
         // remove file
         fs.unlinkSync(file);
        //console.log(`File is no: ${file}`);
    }
})


