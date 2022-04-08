var topNote = ['','','','',''];
var playerNumber = 0;

function addTopNote(key){
    let nums = [1,2,3,4,5]
    for(let n = 1; n<nums.length + 1; n++){
        if(document.getElementById(`top-note-${n}`).innerText == ''){
            document.getElementById(`top-note-${n}`).innerText = key;
            topNote[n-1] = key;
            break;
        }
    }
}

const mapKey = {
    'E'     : 1,
    'F'     : 2,
    'F#'    : 3,
    'G'     : 4,
    'G#'    : 5,
    'A'     : 6,
    'A#'    : 7,
    'B'     : 8,
    'C'     : 9,
    'C#'    : 10,
    'D'     : 11,
    'D#'    : 12,
}

async function playOnKeyPress(key){
    let divPlayer = document.getElementById('div-invisible-player');
    let player = document.createElement('audio');
   
    let source = document.createElement('source');
    source.id = `source-${playerNumber}`;
    let mapValue = mapKey[key];

    if(mapValue == 1)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 2)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 3)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 4)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 5)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 6)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 7)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 8)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 9)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 10)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 11)
        source.src = `http://localhost:8080/${key}.mp3`
    else if(mapValue == 12)
        source.src = `http://localhost:8080/${key}.mp3`

    player.id = `player-${playerNumber}`;
    player.appendChild(source);
    divPlayer.appendChild(player)
    player.play();

    addTopNote(key);
    function deletePlayer(id){
        setTimeout(function(){
            document.getElementById(`source-${id}`).remove();
            document.getElementById(`player-${id}`).remove();
        }, 3000)
    }
    deletePlayer(playerNumber);
    playerNumber++;
}

function printKey(event){
    if(event.key == 'Backspace'){
        for(let n = 5; n > 0 ; n--){
            if(document.getElementById(`top-note-${n}`).innerText != ''){
                document.getElementById(`top-note-${n}`).innerText = '';
                topNote[n-1] = '';
                break;
            }
        }
    }
}

let body = document.getElementById('body');
body.addEventListener(onkeydown, 
    function(event) {
        console.log(event)
    }
);

// 'E',
// 'F',
// 'F#',
// 'G',
// 'G#',
// 'A',
// 'A#',
// 'B',
// 'C',
// 'C#',
// 'D',
// 'D#'
