class App {
    constructor(){ //constructor is a special method for a class
        this.$form = document.getElementById('form') //Anything with $ will represent an element
        this.$noteTitle = document.getElementById('note-title')
        this.$formButtons = document.getElementById('form-buttons')
        this.$notes = document.getElementById('notes')
        this.$notesText = document.getElementById('note-text')
        this.$submitButton = document.getElementById('submit-btn')

        this.addEventListeners()
    }

    addEventListeners(){

        document.body.addEventListener('click', (event) => {
            this.handleFormClick(event)
        })

        this.$form.addEventListener('submit', (e) => {
            e.preventDefault()

            let title = this.$noteTitle.value
            let noteText = this.$notesText.value

            this.renderNote(title, noteText)

            title = ' '
            noteText = ''
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
        this.$formButtons.style.display = 'none'
    }

    renderNote(title, noteText = ''){
        return this.$notes.innerHTML += `
        <div class="note">
                <div class="note-title">${title}</div>
                <div class="note-text">${noteText}</div>
            </div>
        `
    }
}

new App()