//all emojis
var emojis = ["angel", "emoticon", "heart", "kiss",
                "loudly", "love", "sad", "smiley",
                "smiling", "tears","unamused","break",
                "cover", "fear", "fire", "zzz",
                "hearts", "kisses", "movie", "pink",
                "piracy", "pop", "recycle", "signal",
                "thinking", "thumb", "thumbs", "tongue",
                "triangle", "wink",
                "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "e30",
                "e11", "e12", "e13", "e14", "e15", "e16", "e17", "e18", "e19", "e10",
                "e21", "e22", "e23", "e24", "e25", "e26", "e27", "e28", "e29", "e20",
            ];

// all position
var position = new Array(36);

//create random position for game
for(let i=0; i<18; i++){
    let randomEmojis =  parseInt(Math.random()*60);
    let condition = false;
    for(let j=0; j<position.length;j++){
        if(position[j]==emojis[randomEmojis]) {
            condition = true;
            break; 
        }
    }
    if(condition) {
        i--;
        continue;
    }
    let a = 0;
    while(true){
        let random =  parseInt(Math.random()*36);
        if(position[random]===undefined){
            position[random] = emojis[randomEmojis];
            a+=1;
        } else {
            continue;
        } 
        if(a==2)
            break;
    }
}

//load all emojis
async function loadImage() {
    for(let i = 0; i<position.length; i++) {
        $("#fargi").attr('src', "../img/"+position[i]+".png");
        await sleep(100);
    }
}
loadImage();

//give emojis to all position
for(let i = 0; i<position.length; i++){
    $(".emoji-"+(i+1)).css('background-image', "url('../img/question.png')");
    $(".game-td-"+(i+1)).hover(
        function(){
            $(this).css("background-color","grey")
        },
        function(){
            $(this).css("background-color", "white")
        }
    );
    $(".emoji-"+(i+1)).bind('click', {index : i}, clickEvent);
}

//sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//variable for manage step
var gameEmoji = [];
var gameStart;
var gameStartPosition;
var gamePosition = 1;
var gameOver = [];
var totalScore = 0;
async function clickEvent(event){
    //check click event is valid or not, check btn already pressed or not
    for(let pos = 0; pos<gameOver.length; pos++){
        if(gameOver[pos]==event.data.index) {
            return
        }
    }
    if(gameStartPosition==event.data.index){
        return;
    }
    gameStartPosition=event.data.index;

    // after click show emoji
    $(this).css("background-image", "url('../img/"+position[event.data.index]+".png')");
    $(".game-td-"+(event.data.index+1)).css("background-color", "yellow");
    $(".game-td-"+(event.data.index+1)).hover(
        function(){
            $(this).css("background-color","yellow");
        },
        function(){
            $(this).css("background-color", "yellow");
        }
    );
    gameEmoji.push(event.data.index);

    //show total score
    totalScore+=1;
    $("#score").html(totalScore);

    //check emojis conditions
    if(gamePosition==1){
        gameStart=position[event.data.index];
    }
    else if(gamePosition==2) {
        //check emoji win or not
        if(gameStart==position[event.data.index]){
            gameEmoji.forEach(p=>{
                $(".game-td-"+(p+1)).css("background", "aqua")
                $(".game-td-"+(p+1)).hover(
                    function(){
                        $(this).css("background-color","aqua")
                    },
                    function(){
                        $(this).css("background-color", "aqua")
                    }
                );
            });
            gameOver.push(gameEmoji[0]);
            gameOver.push(gameEmoji[1]);
            if(gameOver.length==36){
                await sleep(1000);
                alert("Congratulation\nTotal Moves - "+totalScore);
                location.reload();
            }
        } else {
            for(let ss = 0; ss<position.length;ss++){
                $(".emoji-"+(ss+1)).unbind("click");
            }
            gameEmoji.forEach(p=>{
                $(".game-td-"+(p+1)).css("background", "red")
                $(".game-td-"+(p+1)).hover(
                    function(){
                        $(this).css("background-color","red")
                    },
                    function(){
                        $(this).css("background-color", "red")
                    }
                );
            });
            await sleep(500);
            
            for(let ss = 0; ss<position.length;ss++){
                $(".emoji-"+(ss+1)).bind('click', {index : ss}, clickEvent);
            }
            gameEmoji.forEach(p=>{
                $(".game-td-"+(p+1)).css("background", "white")
                $(".emoji-"+(p+1)).css('background-image', "url('../img/question.png')");
                $(".game-td-"+(p+1)).hover(
                    function(){
                        $(this).css("background-color","grey")
                    },
                    function(){
                        $(this).css("background-color", "white")
                    }
                );
            });
        }
        gameStart = "";
        gameStartPosition = null;
        gamePosition = 1;
        gameEmoji = [];
        return;
    }
    gamePosition+=1;
}
