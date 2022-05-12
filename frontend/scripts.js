var topNote = ['','','','',''];
var playerNumber = 0;
const gameID = fetch("http://localhost:8080/gameid");

function cookieOnLoad(){
    let notes = document.cookie;
    if(notes.length == 0) return;
    // console.log('Notas do cookie', notes.split('|'));
    let topNote = [];
    for(let l of notes){ topNote.push(l); }

    let qtdJogadas = document.cookie.split('|');
    // qtdJogadas = qtdJogadas.filter(function(value){return value.length == 0;});
    console.log('qtdJogadas', qtdJogadas)
    for(let q of qtdJogadas){
        if(q == '') continue;
        let url = topNote.join('_').replaceAll('#', '%23');
        let newdiv = document.getElementById('table-notes');
        let clonediv = newdiv.cloneNode(true);
        for(let f = 0; f < 5; f++){
            clonediv.children[0].children[0].children[f].children[0].id = 'played';
            clonediv.children[0].children[0].children[f].children[0].children[0].id = 'played';
            clonediv.children[0].children[0].children[f].children[0].style.background = q.split(',')[f+5];
            clonediv.children[0].children[0].children[f].children[0].children[0].innerHTML = q.split(',')[f];
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
    }

    // tables.appendChild(clonediv);

}

cookieOnLoad();

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
            document.getElementById('div-top-note-0').style.background = '#FFBA01';
        }
        if(data['1'] == "exists"){
            document.getElementById('div-top-note-1').style.background = '#FFBA01';
        }
        if(data['2'] == "exists"){
            document.getElementById('div-top-note-2').style.background = '#FFBA01';
        }
        if(data['3'] == "exists"){
            document.getElementById('div-top-note-3').style.background = '#FFBA01';
        }
        if(data['4'] == "exists"){
            document.getElementById('div-top-note-4').style.background = '#FFBA01';
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

        if(data['0'] == "correct" && data['1'] == "correct" && data['2'] == "correct" && data['3'] == "correct" && data['4'] == "correct"){
            document.getElementById('canvas').style.visibility = "visible";
            document.getElementById('modal-congrats').style = visibility = "visible";
            let congratsText = document.createElement('h3');
            congratsText.style.color = "white";
            congratsText.innerText = "Parabéns você concluiu em: "+ Number(((document.getElementsByTagName('tr').length - 5)/2)+1) + " tentativa(s)";
            document.getElementById('modal-congrats').appendChild(congratsText);
        }

    });
    const saveNotes = topNote.toString()+',';
    document.cookie += saveNotes;
    setTimeout(function(){
        document.cookie += [
            String(document.getElementById('div-top-note-0').style.background).replace('rgb(32, 17, 49)', ''),
            String(document.getElementById('div-top-note-1').style.background).replace('rgb(32, 17, 49)', ''),
            String(document.getElementById('div-top-note-2').style.background).replace('rgb(32, 17, 49)', ''),
            String(document.getElementById('div-top-note-3').style.background).replace('rgb(32, 17, 49)', ''),
            String(document.getElementById('div-top-note-4').style.background).replace('rgb(32, 17, 49)', ''), '|'
        ]
    }, 200)
    
    // document.cookie = document.cookie.toString()+'|';

    let isCustomized = [window.location.href.split('?gameid='), window.location.href.split('&code=')]
    if(isCustomized[0].length > 1){
        isCustomized[0] = window.location.href.split('?gameid=')[1].split('&')[0]
        isCustomized[1] = window.location.href.split('&code=')[1];
        fetch('http://localhost:8080/submit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({gameid: isCustomized[0], code: isCustomized[1]})
        }).then(res => {
            return res.text();
        });
    }

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
    
    key = key.replace('#', '%23');
    // console.log(key)

    if(mapValue == 1)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 2)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 3)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 4)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 5)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 6)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 7)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 8)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 9)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 10)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 11)
        source.src = `http://localhost:8080/${key}.m4a`
    else if(mapValue == 12)
        source.src = `http://localhost:8080/${key}.m4a`

    player.id = `player-${playerNumber}`;
    player.appendChild(source);
    divPlayer.appendChild(player)
    player.play();

    key = key.replace('%23', '#');

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

function saveSessionCookie(){

}

function resetSessionCookie(){
    let browserGameID = document.getElementById('cookies');
    if(String(browserGameID).split('gameid').length > 1){
        if(gameID != browserGameID){
            document.cookie = String(browserGameID).split('gameid:')[1].split(';')[0];
        }
    }
}

async function getRanking(){
    let customized = window.location.href.split('?gameid=')[1];
    if(customized){
        fetch('http://localhost:8080/getRanking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({gameid: customized.split('&')[0]})
        })
        .then(res => res.json())
        .then(res => {
            let divRanking = document.getElementById('ranking');
            // console.log(res);
            let ranking = document.createElement('h3')
            ranking.classList.add('ranking')
            ranking.innerText = '🏆 Ranking 🏆';
            divRanking.appendChild(ranking)
            for(let r = 0; r < res.ranking.length; r++){
                let playerAndScore = document.createElement('h3')
                playerAndScore.innerText = r+1 + '. ' + res.ranking[r].player + ': ' + res.ranking[r].tries;
                if(r == 0){ playerAndScore.classList.add('gold') }
                if(r == 1){ playerAndScore.classList.add('silver') }
                if(r == 2){ playerAndScore.classList.add('bronze') }
                divRanking.appendChild(playerAndScore);
            }
        });
    }
}

async function playDaily(){
    let player = document.createElement('audio');
    player.id = 'player-daily';

    let source = document.createElement('source');
    source.id = 'source-daily';
    source.src = 'http://localhost:8080/playDaily.m4a';

    player.appendChild(source);
    document.getElementById('daily').appendChild(player);
    player.play();

    setTimeout(function(){
        document.getElementById(`source-daily`).remove();
        document.getElementById(`player-daily`).remove();
    }, 5001)
}

getRanking();

async function playDaily(){
    document.getElementById('daily').play()
}

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
