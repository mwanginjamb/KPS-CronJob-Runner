/*This script runs the imprest and other finance transactions integration process to Core Banking System*/

const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');

const PORT = 4010;

app = express();

const logPath = path.resolve("log/investment-log.txt");




// Sync Investment

const cmd_sync_investment = `wget -a ${logPath} http://10.1.4.16/investment/sync-reversal`;








// Test the server

app.use('/',(req,res) => {
    res.send(`Server running on port : ${PORT}`);
});

cron.schedule('* * * * *', () => {
    console.log('-------------------------');
    console.info('Running Investment Cron Job');

    let currentdate = new Date(); 
    let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    
	if(shell.exec(cmd_sync_investment).code !== 0){
        shell.exit(1);
    }
    else{
        shell.echo(`KPS NAV - PROFITS INVESTMENT Sync thread completed @ ${datetime}. Oh Wow!!...`);
    }
});


app.listen(PORT);