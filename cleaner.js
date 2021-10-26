const cron = require('node-cron');
const shell = require('shelljs');
const path = require('path');


const cmd_delete = `node ./delete.js`; 

cron.schedule('* * * * *', () => {
    console.log('-------------------------');
    console.info('Running Log Cleaner Cron Job');

    let currentdate = new Date(); 
    let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    
	
	if(shell.exec(cmd_delete).code !== 0){
        shell.exit(1);
    }
    else{
        shell.echo(`Log cleaner completed @ ${datetime}. Oh Wow!!...`);
    }
	
	
	
});