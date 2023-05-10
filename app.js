//Odavde novi server po
//dokumentaciji socket.io

const express=require('express');
const {createServer}=require('http');
const {Server}=require("socket.io");


const app=express();
const httpServer=createServer(app);
const io=new Server(httpServer);

app.use(express.static('public'));

app.get('/',function(req,res) {res.sendFile(__dirname+'/public/default.html');});

io.on('connection',(socket)=>{
console.log('New user connected!');

socket.on('move',(msg)=>
{
    //legitimno broadcast 
    //jer ga ja saljem ostalima 
    //a ne ovom koji jeste poslao
    //ne bi imalo smisla drugacije
    socket.broadcast.emit('move',msg);
   
});


});

httpServer.listen(3000,()=>{console.log('Listening on port *: 3000');});

