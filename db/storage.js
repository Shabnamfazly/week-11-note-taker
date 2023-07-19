const util = require('util')
const fs = require('fs')
const uuid = require('uuid/v1')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
class Storage{
    read(){
        return readFileAsync("db/db.json","utf-8")
    }
    write(note){
        return writeFileAsync("db/db.json",JSON.stringify(note))
    }
    getNote(){
        return this.read().then((notes)=>{
            let parsedNotes;
            return parsedNotes
        })
    }
    addNote(note){
        const {title,text}= note;
        const newNote = {title,text,id:uuid()}
        return this.getNote().then((notes)=>[...notes,newNote]).then((updatedNotes)=>this.write(updatedNotes)).then(()=>newNote)
    }
}
module.exports = new Storage();