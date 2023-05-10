
var board;
var game;


window.onload=()=>{initGame();};


var initGame=()=>{
    var cfg={
        draggable:true,
        position:'start',
        onDrop:handleMove

    };

board=new ChessBoard('gameBoard',cfg);
game=new Chess();

};

//sa svakim novim otvorenim localhost:3000 
//on ce da instancira novog korisnika!

var socket=io();//kad ovo kazem
//moj klijent ce da se instancira i proba 
//da uspostavi konekciju sa serverom!



var handleMove=(source,target) =>
{
    var move=game.move({from:source,to:target});

if(move===null) return 'snapback';
else socket.emit("move",move); //ne mora da se serijalijzuje
//samo se salje ceo objekat u app.js!
};

//i sada na klijentu ponovo osluskujemo
//potez koji dobijamo
//Potez koji ce nama server da dostavi
//od suprotnog igraca!

socket.on('move',(msg)=>{
game.move(msg);
board.position(game.fen()); //fen je layout
//table to moras u chess.js docs-u da pogledas
});

//Odavde je samo problem sobe, tj cuvanja stanja nase partije saha na serveru
//Kako raditi ako neko samo otvori jos jedan tab, on nam ulece u partiju!!!