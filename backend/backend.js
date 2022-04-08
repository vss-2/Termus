const path = require('path')
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3000

app.use(cors({origin: '*'}), express.static(path.join(__dirname, '..', 'backend'), ))

app.get('/daily.mp3', (req, res) => {
    res.sendFile(`daily.mp3`, {
        root: path.join(__dirname, '..', 'backend')
    });
    res.end();
});

app.get('/*.mp3', (req, res) => {
    var nota = (req.path.slice(1,).split('.mp3')[0]);
    if(['E','F','F#','G','G#','A','A#','B','C','C#','D','D#'].includes(nota)){
        res.sendFile(`${nota}.mp3`, {
            root: path.join(__dirname, '..', 'backend')
        });
        res.end();
    } else {
        res.status(404).send({
            error: 404,
            message: 'Musical note not found'
        });
    }
});

app.get('/submit/*', (req, res) => {
    //Os primeiros 8 caracteres são /submit/, %23 é o Unicode de #, usado em notas musicais
    let notas = req.path.slice(8,).replace(new RegExp('%23*', 'g'), '#').split('_');
    if(notas.length == 5){
        for(n of notas){
            if(!['E','F','F#','G','G#','A','A#','B','C','C#','D','D#'].includes(n)){
                // console.log('Não inclui'+n)
                res.sendStatus(400).send({
                    error: 400,
                    message: 'Invalid musical note'
                })
            }
        }
    }
    let correct_combination = ['C', 'D', 'G#', 'F', 'B'];

    let exists = {
        E: 0,
        F: 0,
        'F#': 0,
        G: 0,
        'G#': 0,
        A: 0,
        'A#': 0,
        B: 0,
        C: 0,
        'C#': 0,
        D: 0,
        'D#': 0
    }

    for (let nota of correct_combination) {
        exists[nota] = exists[nota] ? exists[nota] + 1 : 1;
    }

    // console.log('EXISTS:', exists);

    let response = {};

    for(let f=0; f<5; f++){
        if(notas[f] == correct_combination[f]){
            response[f] = 'correct'
            exists[notas[f]] = exists[notas[f]] - 1;
        } else if (correct_combination.includes(notas[f])){
            if(exists[notas[f]] > 0){
                response[f] = 'exists'
                exists[notas[f]] = exists[notas[f]] - 1;
            } else {
                response[f] = 'unexists'
            }
        } else {
            response[f] = 'unexists'
        }
    }
    
    // Descobrir porque não consigo mandar 
    // res.sendStatus(200).send(response)
    res.send(response)

});

app.get('/favicon.ico', (req, res) => {
    res.sendFile(`favicon.ico`, {
        root: path.join(__dirname, '..', 'backend')
    });
    res.end()
});

app.listen(8080, () => console.log('Server started on port 8080'))