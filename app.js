import { v4 as uuidv4 } from 'uuid';

class App {
    constructor(){ //constructor is a special method for a class
        this.$form = document.getElementById('form') //Anything with $ will represent an element
        this.$noteTitle = document.getElementById('note-title')
        this.$formButtons = document.getElementById('form-buttons')
        this.$notes = document.getElementById('notes')
        this.$notesText = document.getElementById('note-text')
        this.$submitButton = document.getElementById('submit-btn')
        this.note = []

        this.addEventListeners()
    }

    addEventListeners(){

        document.body.addEventListener('click', (event) => {
            this.handleFormClick(event)
        })

        this.$form.addEventListener('submit', (e) => {
            e.preventDefault()

            let fullNote = {
                id: uuidv4(),
                title: this.$noteTitle.value,
                noteText: this.$notesText.value
            }

            if(fullNote.title || fullNote.noteText){
                this.note.push(fullNote)
                this.renderNote(this.note)
                console.log(this.note)
                this.$notesText.value = ``
                this.$noteTitle.value = ``
            }
        })
    }

    handleFormClick(event){
        const isFormClicked = this.$form.contains(event.target)

        if(isFormClicked){
            this.openForm()
        } else{
            this.closeForm()
        }
    }

    openForm(){
        this.$form.classList.add('form-open')
        this.$noteTitle.style.display = 'block'
        this.$formButtons.style.display = 'block'
    }

    closeForm(){
        this.$form.classList.remove('form-open')
        this.$noteTitle.style.display = 'none'
        this.$notesText.value = ``
        this.$noteTitle.value = ``
        this.$formButtons.style.display = 'none'
    }

   getNoteHtml(arr){
    return arr.map((note) => {
        return `
         <div class="note">
                <div class="note-title">${note.title}</div>
                <div class="note-text">${note.noteText}</div>
            </div>
        `
    })
   }

   renderNote(arr){
    return this.$notes.innerHTML = this.getNoteHtml(arr)
   }
}

new App()

/*
    <div class="note">
                <div class="note-title">${title}</div>
                <div class="note-text">${noteText}</div>
            </div>
*/