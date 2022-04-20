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

async function submit(){
    let url = topNote.join('_').replaceAll('#', '%23');
    fetch('http://localhost:8080/submit/'+url).then(res => {
        return res.text();
    })
    .then(data => {
        data = JSON.parse(data);
        if(data["0"] == "exists"){
            document.getElementById('div-top-note-0').style.background = 'yellow';
        }
        if(data['1'] == "exists"){
            document.getElementById('div-top-note-1').style.background = 'yellow';
        }
        if(data['2'] == "exists"){
            document.getElementById('div-top-note-2').style.background = 'yellow';
        }
        if(data['3'] == "exists"){
            document.getElementById('div-top-note-3').style.background = 'yellow';
        }
        if(data['4'] == "exists"){
            document.getElementById('div-top-note-4').style.background = 'yellow';
        }
        if(data['0'] == "correct"){
            document.getElementById('div-top-note-0').style.background = 'green';
        }
        if(data['1'] == "correct"){
            document.getElementById('div-top-note-1').style.background = 'green';
        }
        if(data['2'] == "correct"){
            document.getElementById('div-top-note-2').style.background = 'green';
        }
        if(data['3'] == "correct"){
            document.getElementById('div-top-note-3').style.background = 'green';
        }
        if(data['4'] == "correct"){
            document.getElementById('div-top-note-4').style.background = 'green';
        }
    });

    setTimeout(function(){
        let newdiv = document.getElementById('table-notes');
        let clonediv = newdiv.cloneNode(true);
        for(let f = 0; f < 5; f++){
            clonediv.children[0].children[0].children[f].children[0].id = 'played';
            clonediv.children[0].children[0].children[f].children[0].children[0].id = 'played';
            // remove o id das novas children
        }
        let tables = document.getElementById('tables');
        clonediv.children[0].children[0].children[5].innerHTML = "";
        for(let _ = 0; _ < 5; _++) {
            document.getElementById(`div-top-note-${_}`).style.background = '#201131';
            printKey({key: 'Backspace'});
            // Remove letras após o play e cor das notas de cima
        }
        document.getElementById('table-notes').parentNode.insertBefore(clonediv, document.getElementById('table-notes').nextSibling);
        // tables.appendChild(clonediv);

    }, 250)
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
