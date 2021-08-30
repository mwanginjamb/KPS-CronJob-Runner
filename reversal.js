/*This cron job runs all rversals committed by imprest and other transactions process Integrations when necessary*/
const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');

const PORT = 7000;

app = express();

const logPath = path.resolve("log/reversal-log.txt");




//Transaction Reversal Job

const cmd_sync_gl = `wget -a ${logPath} http://10.1.4.16/finance/sync-reversal`;







// Test the server

app.use('/',(req,res) => {
    res.send(`Server running on port : ${PORT}`);
});

cron.schedule('* * * * *', () => {
    console.log('-------------------------');
    console.info('Running GL Cron Job');

    let currentdate = new Date(); 
    let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    
	
	if(shell.exec(cmd_sync_gl).code !== 0){
        shell.exit(1);
    }
    else{
        shell.echo(`KPS NAV - Transaction Reversal Sync thread completed @ ${datetime}. Oh Wow!!...`);
    }
});


app.listen(PORT);