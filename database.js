const fs = require('fs');

const dbFile = './chat.db';
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const dbWrapper = require('sqlite');
let db;


dbWrapper 
.open({
    filename: dbFile,
    driver: sqlite3.Database
})
.then(async dBase => {
    db = dBase;
    try{
        if (!exists){
            await db.run(
                `INSERT INTO user(login, password) VALUES
                ('admin','banana'),
                ('user', 'password1');`
            );
            await db.run(
                `CREATTE TABLE user(
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                login TEXT,
                password TEXT
                );`
            );
        } 
        else {
            console.log(await db.all('SELECT * from user'));
        }
    } catch (dbError) {
        console.error(dbError);
    }

});


module.exports = {
    getMessage: async () =>{
        try{
            return await db.all(
                `SELECT msg_id, content, login, user_id from message
                JOIN user ON message.autor = user.user_id`
            );
        } catch (dbError) {
            console.error(dbError);
        }
    },

    addMessage: async (matchesGlob,userId) =>{
        await db.run(
                `INSERT INTO message (content, autor) VALUE (?, ?)`,
                [msg, userId]
        );
    }
};