const Notes = require('../models/Notes');

exports.getAllNotes = async (req, res, next) => {
    try{
        const [notes, _] = await Notes.findAll();
        res.status(200).json({count : notes.length, notes})
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.updateNotes = async (req, res, next) => {
    try{
        let id = req.params.id
        let {title, body, datetime} = req.body
        const [post, _] = await Notes.updateNotesById(id, title, body, datetime);

        res.status(200).json({message : "Notes updated successfully"})
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.createNewNotes = async (req, res, next) => {
    try{
        let {title, body, datetime} = req.body
        console.log("Crete New Notes function")
        console.log("title : " + title)
        console.log("body : " + body)
        console.log("dateTime : " + datetime)
        let note = new Notes(title, body, datetime)
        note = await note.save()
        console.log(note)
        res.status(201).json({message : "Notes created successfully"})
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.getNotesById = async (req, res, next) => {
    try{
        let noteId = req.params.id
        console.log(noteId)
        let [note, _] = await Notes.findById(noteId)
        
        res.status(200).json({note})
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.deleteNotes = async (req, res, next) => {
    try{
        let noteId = req.params.id
        let [note, _] = await Notes.deleteNotesById(noteId)
        
        res.status(204).json({note})
    }catch(err){
        console.log(err)
        next(err)
    }
}

