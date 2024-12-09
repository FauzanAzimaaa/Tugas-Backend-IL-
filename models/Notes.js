const db = require("../config/db");

class Notes{
    constructor(title, note, dateTime){
        this.title = title
        this.note = note
        this.dateTime = dateTime
    }

    static createdAt(){
        let d = new Date()
        let yyyy = d.getFullYear() 
        let mm = d.getMonth() + 1
        let dd = d.getDate()
        
        let hours= d.getHours()
        let minutes = d.getMinutes()
        let seconds = d.getSeconds()
        return `${yyyy}-${mm}-${dd} ${hours}:${minutes}:${seconds}`;
    }

    save(){
        // const dateTime = Notes.createdAt()
        return db.execute(`
        INSERT INTO notes (
            title, 
            note,
            datetime
        )
        VALUES(?, ?, ?)`, [this.title, this.note, this.dateTime], (err, rows) => {
            if(err) throw err
            return rows
        });
    }
    

    static findAll(){
        let sql = "SELECT * FROM notes"
        return db.execute(sql)
    }


    static findById(id){
        return db.execute('SELECT * FROM notes WHERE id = ?', [id], (err, rows) => {
            if(err) throw err
            return rows
        });
    }

    static updateNotesById(id, title, note, datetime){
        // const dateTime = Notes.createdAt()
        return db.execute(`
            UPDATE notes 
            SET title = ?, 
            note = ?, 
            datetime = ?
            WHERE id = ?`, [title, note, datetime, id], (err, rows) => {
            if(err) throw err
            return rows
        });
    }

    static deleteNotesById(id){
        return db.execute(`
            DELETE FROM notes 
            WHERE id = ?`, [id], (err, rows) => {
            if(err) throw err
            return rows
        });
    }
}

module.exports = Notes