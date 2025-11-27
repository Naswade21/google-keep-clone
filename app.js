import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
//<button type="button" id="edit-btn">Edit</button>

class App {
    constructor(){ //constructor is a special method for a class
        this.$form = document.getElementById('form') //Anything with $ will represent an element
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
        this.note = []
        
        this.addEventListeners()
    }

    addEventListeners(){

        document.body.addEventListener('click', (event) => {
            this.handleFormClick(event)
            this.openModal(event)
        })

        this.$closeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            this.closeForm()
        })

        this.$form.addEventListener('submit', (e) => {
            e.preventDefault()

            let fullNote = {
                id: uuidv4(),
                color: 'white',
                title: this.$noteTitle.value,
                noteText: this.$notesText.value
            }

            if(fullNote.title || fullNote.noteText){
                this.note.push(fullNote)
                this.renderNote(this.note)
                this.$placeHolder.style.display = 'flex'
                this.$notesText.value = ``
                this.$noteTitle.value = ``
                this.closeForm()
            } else{
                this.$placeHolder.style.display = 'none'
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

    openModal(e){
        if (e.target.closest('.note')){
            this.$modal.classList.toggle('open-modal')
            this.renderEditBtn(this.note)
        }
    }

   getNoteHtml(arr){
    return arr.map((note) => {
        return `
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
        `
    }).join('')
   }

   getModalButtonHtml(arr){
    return `<button type="button" data-edit="${arr[0].id}" id="edit-btn">Edit</button>`
    }

   renderEditBtn(arr){
    return this.$modalBtn.innerHTML = this.getModalButtonHtml(arr)
   }

   renderNote(arr){
    return this.$notes.innerHTML = this.getNoteHtml(arr)
   }
}

new App()