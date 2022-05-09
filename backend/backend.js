const path = require('path')
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3000
const uuidv4 = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const hash = require('object-hash');
const { randomInt } = require('crypto');

db.serialize(() => {
    db.run('CREATE TABLE party (gameid TEXT, player TEXT, playerHash TEXT, tries INTEGER)');
    // const statement = db.prepare('INSERT INTO party VALUES (?, ?, ?, ?)');
    // statement.run('TESTE GAMEID', 'TESTE PLAYER', 'TESTE HASH NAME', 0);
    // statement.finalize();
})

app.use(cors({origin: '*'}), express.static(path.join(__dirname, '..', 'backend'), ));
app.use(express.json());

app.get('/daily.mp3', (req, res) => {
    res.sendFile(`daily.mp3`, {
        root: path.join(__dirname, '..', 'backend')
    });
    res.end();
});

app.get('/*.m4a', (req, res) => {
    var nota = (req.path.slice(1,).split('.m4a')[0]);
    if(['E','F','F#','G','G#','A','A#','B','C','C#','D','D#'].includes(nota)){
        res.sendFile(`${nota}.m4a`, {
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

app.post('/submit/*', (req, res) => {
    console.log(req.body)
    if(req.body.gameid && req.body.code){
        let update = db.all('SELECT gameid, playerHash, tries FROM party', (err, rows) => {
            console.log(rows)
            let selected = rows.filter((x) => {
                if(req.body.gameid == x.gameid && req.body.code == x.playerHash){
                    db.run("UPDATE party SET tries = ? WHERE playerHash = ?", x.tries+1, x.playerHash);
                    console.log('update')
                }
            });
        });
    }
    res.sendStatus(200);
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
    let correct_combination = ['G', 'A', 'B', 'D', 'D'];

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

app.get('/gameid', (req, res) => {
    let date = new Date;
    date = date.getUTCMonth()+1 > 10 ? date.getUTCMonth()+1+''+date.getUTCDate() : '0'+date.getUTCMonth()+date.getUTCDate();
    res.send(String(date));
    res.end();
});

app.post('/newUser', (req, res) => {
    let nameHash = hash(req.body.userid);
    const statement = db.prepare('INSERT INTO party VALUES (?, ?, ?, ?)');
    console.log('newUser', req.body.gameid, req.body.userid, nameHash, 0);
    statement.run(req.body.gameid, req.body.userid, nameHash, 0);
    statement.finalize();
    let urlContent = 'http://localhost:5500/frontend/index.html?gameid=' + req.body.gameid +'&code=' + nameHash;
    res.send({url: urlContent});
});

app.post('/getRanking', (req, res) => {
    let gameid = req.body.gameid;
    let ranking = db.all('SELECT gameid, player, tries FROM party', (err, rows) => {
        let selected = rows.filter((x) => {
            // console.log(x, gameid)
            if(x.gameid == gameid){ return true } else { return false }
        });
        selected.sort((a,b) => a.tries < b.tries)
        // console.log(selected, gameid)
        res.send({ranking: selected});
    });
})

app.post('/party', (req, res) => {
    let generatedID = uuidv4.v4();
    let nameHash = hash(req.body.creatorNick);
    const statement = db.prepare('INSERT INTO party VALUES (?, ?, ?, ?)');
    statement.run(generatedID,  req.body.creatorNick, nameHash, 0);
    statement.finalize();
    res.send({id: generatedID, code: nameHash});
})

app.get('/party/id/', (req, res) => {
    // Buscar no banco retornar página igual ao index
    // só que com requests alterados com o ID da partida
})

app.listen(8080, () => console.log('Server started on port 8080'))