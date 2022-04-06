var topNote = ['','','','',''];

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
    var player = document.getElementById('invisible-player');

    while(player.childElementCount > 0){
        let child = player.lastElementChild; 
        while (child) {
            player.removeChild(child);
            child = player.lastElementChild;
        }
    }

    let source = document.createElement('source');
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

    player.appendChild(source);
    player.play();

    addTopNote(key);
    setTimeout(function(){
        document.getElementById('div-invisible-player').innerHTML = '';
        setTimeout(function(){
            let newPlayerElement = document.createElement('audio');
            newPlayerElement.id = 'invisible-player';
            document.getElementById('div-invisible-player').appendChild(newPlayerElement);
        }, 100);
    }, 3000)
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
