/*This scheduler script runs the ADA DMS INTEGRATION*/


const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');

const PORT = 3000;

app = express();

const logPath = path.resolve("log/ada-log.txt");

// const cmd = `wget -a ${logPath} http://10.1.4.16/site/sync-vendor`; // For Sync(update or create)

const cmd_create = `wget -a ${logPath} http://10.1.4.16/site/new-vendor`; // Primarily For creation bt also updates if vendor is alread in dms




// Test the server

app.use('/',(req,res) => {
    res.send(`Server running on port : ${PORT}`);
});

cron.schedule('* * * * *', () => {
    console.log('-------------------------');
    console.info('Running DMS Cron Job');

    let currentdate = new Date(); 
    let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    
	
	if(shell.exec(cmd_create).code !== 0){
        shell.exit(1);
    }
    else{
        shell.echo(`KPS NAV-ADA Create thread completed @ ${datetime}. Oh Wow!!...`);
    }
	
	
	
});


app.listen(PORT);