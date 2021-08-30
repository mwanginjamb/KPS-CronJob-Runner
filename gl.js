/*This cron job synchronizes gl account creation from Nav ERP to Profits Core Banking System*/

const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');

const PORT = 6000;

app = express();

const logPath = path.resolve("log/gl-log.txt");




//Sync Gl Accounts

const cmd_sync_gl = `wget -a ${logPath} http://10.1.4.16/finance/syncglaccount`;







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
        shell.echo(`KPS NAV - PROFITS GL Sync thread completed @ ${datetime}. Oh Wow!!...`);
    }
});


app.listen(PORT);