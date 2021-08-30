/*This script runs the imprest and other finance transactions integration process to Core Banking System*/

const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');

const PORT = 4000;

app = express();

const logPath = path.resolve("log/imprest-log.txt");




// Sync Imprests

const cmd_sync_imprest = `wget -a ${logPath} http://10.1.4.16/finance/sync-imprest`;








// Test the server

app.use('/',(req,res) => {
    res.send(`Server running on port : ${PORT}`);
});

cron.schedule('* * * * *', () => {
    console.log('-------------------------');
    console.info('Running iMPREST Cron Job');

    let currentdate = new Date(); 
    let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    
	if(shell.exec(cmd_sync_imprest).code !== 0){
        shell.exit(1);
    }
    else{
        shell.echo(`KPS NAV - PROFITS Imprests Sync thread completed @ ${datetime}. Oh Wow!!...`);
    }
});


app.listen(PORT);