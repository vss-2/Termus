function playOnKeyPress(key){
    var audio = new Audio();
    var player = document.getElementById('invisible-player');

    while(player.childElementCount > 0){
        let child = player.lastElementChild; 
        while (child) {
            player.removeChild(child);
            child = player.lastElementChild;
        }
    }

    // console.log(`Tentando reproduzir: ${key}.mp3`)
    let source = document.createElement('source');

    switch (key){
        case "E":
            // source.src = 
        case "F":
            // source.src = 
        case "F#":
            // source.src = 
        case "G":
            // source.src = 
        case "G#":
            // source.src = 
        case "A":
            // source.src = 
        case "A#":
            // source.src = 
        case "B":
            // source.src = 
        case "C":
            source.src = `http://localhost:8080/${key}.mp3`
        case "C#":
            // source.src = 
        case "D":
            // source.src = 
        case "D#":
            // source.src = 
    }

    player.appendChild(source);
    player.play();

}

function printKey(event){
    console.log(event);
}

let body = document.getElementById('body');
body.addEventListener(onkeydown, 
    function(event) {
        console.log(event);
});

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
