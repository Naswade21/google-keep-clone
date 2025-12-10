import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class App {
    constructor(){ //constructor is a special method for a class
        this.$form = document.getElementById('form') // Anything with $ will represent an element
        this.$noteTitle = document.getElementById('note-title')
        this.$formButtons = document.getElementById('form-buttons')
        this.$notes = document.getElementById('notes')
        this.$notesText = document.getElementById('note-text')
        this.$submitButton = document.getElementById('submit-btn')
        this.$placeHolder = document.getElementById('placeholder')
        this.$closeBtn = document.getElementById('form-close-btn')
        this.$modal = document.querySelector('.modal')
        this.$modalTitle = document.querySelector('.modal-title')
        this.$modalText = document.querySelector('.modal-text')
        this.$modalBtn = document.getElementById('new-btn')
        this.$modalClose = document.querySelector('.modal-close-button')
        this.$toolColor = document.querySelector('.color-tooltip')
        this.fullNote = {}
        this.note = JSON.parse(localStorage.getItem('notes')) || [{"id":"081a4593-6e19-4ce4-801c-4ed4cfdcd3b5","color":"white","title":"Feel free to delete these as well","noteText":""},{"id":"4fa62bde-b506-4631-8c1b-d984e4b84ac3","color":"#fbbc04","title":"Leave a good note","noteText":"if you got time..."},{"id":"62cf9028-d31b-4a60-8fae-53ce12057a92","color":"white","title":"Colors","noteText":"Feel free to change the colors of the notes as well"},{"id":"89b843cf-2627-4580-b777-7ea31e329f85","color":"white","title":"Welcome to the App!","noteText":"The notes actually save on this one"}]
        this.renderNote(this.note) 

        this.addEventListeners()
    }

    addEventListeners(){

        document.body.addEventListener('click', (event) => {

           if(event.target.closest('.toolbar-color')){
           this.chooseColor(event.target.closest('.toolbar-color'))
        } else if(event.target.closest('.toolbar-delete')){
            this.deleteNote(event.target.closest('.toolbar-delete'))
        } else if(event.target.closest('.note')){
            this.openModal(event.target.closest('.note'))
        } else if(event.target.dataset.edit){
            this.editText(event.target.dataset.edit)
        } else if(event.target.closest('.color-option')){
            this.changeNoteColor(event.target.closest('.color-option'))
        } 
            this.handleFormClick(event)
        })

        this.$closeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            this.closeForm()
        })

        this.$modalClose.addEventListener('click', (e) =>{
            e.stopPropagation()
            this.closeModal()
        })

        this.$form.addEventListener('submit', (e) => {
            e.preventDefault()

            this.fullNote = {
                id: uuidv4(),
                color: 'white',
                title: this.$noteTitle.value,
                noteText: this.$notesText.value
            }

            if(this.fullNote.title || this.fullNote.noteText){
                this.note.unshift(this.fullNote)
                this.renderNote(this.note)
                this.$placeHolder.style.display = 'flex'
                this.$notesText.value = ``
                this.$noteTitle.value = ``
                this.$placeHolder.style.display = 'none'
                this.closeForm()
            }
        })
    }

    deleteNote(note){
        let mainDiv = note.parentElement.parentElement.parentElement
        let newNoteArr = this.note.filter((note) => {
            if(note.id === mainDiv.id){
                return false
            }

            return true
        })

        this.note = newNoteArr

        this.renderNote(this.note)
    }

    chooseColor(color){
        let mainDiv = color.parentElement.parentElement.parentElement
        let specificColorBar = document.querySelector(`[data-pick="${mainDiv.id}"]`)
        specificColorBar.classList.toggle('hidden')
    }

    changeNoteColor(color){
        let mainDiv = color.parentElement //access colortooltip class
        let noteDiv = mainDiv.previousElementSibling // get div before it
        let colorHash = color.dataset.color //the color from 'closest' color
        let targetNote = this.note.filter((note) => {
            return note.id === noteDiv.id
        })[0]

        targetNote.color = `${colorHash}`
        this.renderNote(this.note)
        
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

    openModal(note){
                this.$modal.classList.toggle('open-modal')
                this.$modalBtn.innerHTML = this.getModalButtonHtml(note.id)
                let noteTitle = note.children[0]
                let noteText = note.children[1]
                this.getNoteDetails(noteText, noteTitle)
           
    }

    editText(noteId){
        let targetNote = this.note.filter((note) => {
            return noteId === note.id
        })[0]

       targetNote.title = this.$modalTitle.value
       targetNote.noteText = this.$modalText.value
       this.renderNote(this.note)
       this.closeModal()
    }

    getNoteDetails(text, title){
        this.$modalTitle.value = title.textContent
        this.$modalText.value = text.textContent
    }

    closeModal(){
        this.$modal.classList.toggle('open-modal')
    }

    saveNotes(){
        localStorage.setItem('notes', JSON.stringify(this.note))
    }

   getNoteHtml(arr){
    return arr.map((note) => {
        return `
        <div class="color-wrapper">
            <div class="note" id="${note.id}" style="background: ${note.color};">
                <div class="note-title">${note.title}</div>
                <div class="note-text">${note.noteText}</div>
                <div class="toolbar-container">
                    <div class="toolbar">
                        <div class="toolbar-color"><i class="fa-solid fa-palette"></i></div>
                        <div class="toolbar-delete"><i class="fa-solid fa-x"></i></div>
                    </div>
                </div>
            </div>
            <div class="color-tooltip hidden" data-pick="${note.id}">
                <div class="color-option" data-color="#fff" id="white"></div>
                <div class="color-option" data-color="#d7aefb" id="purple"></div>
                <div class="color-option" data-color="#fbbc04" id="orange"></div>
                <div class="color-option" data-color="#a7ffeb" id="teal"></div>
            </div>
        </div>
        `
    }).join('')
   }

   getModalButtonHtml(buttonId){
     let buttonHtml = `<button type="button" data-edit="${buttonId}" id="edit-btn">Edit</button>`
     return buttonHtml
    }

   renderNote(arr){
    this.saveNotes()
    return this.$notes.innerHTML = this.getNoteHtml(arr)
   }
}

new App()