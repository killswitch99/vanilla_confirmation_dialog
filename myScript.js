async function openModal() {
	this.myModal = new SimpleModal(
		'Are you sure you want to continue?',
		'Yes',
		'No'
	)
	try {
		await myModal.question()
		myModal.displayResponse()
	} catch (err) {
		console.log(err)
	}
}

class SimpleModal {
	constructor(modalText, acceptText, cancelText) {
		this.modalText = modalText || 'Are you sure you want to continue?'
		this.acceptText = acceptText || 'Yes'
		this.cancelText = cancelText || 'No'

		this.parent = document.body

		this.modal = undefined
		this.acceptButton = undefined
		this.cancelButton = undefined

		this.responseText = undefined
		this.createModal()
	}

	question() {
		return new Promise((resolve, reject) => {
			if (!this.modal || !this.acceptButton || !this.cancelButton) {
				reject('There was a problem creating the modal window!')
				return
			}
			this.acceptButton.focus()

			this.acceptButton.addEventListener('click', () => {
				resolve(true)
				this.responseText = this.acceptText
				this.destroyModal()
			})

			this.cancelButton.addEventListener('click', () => {
				resolve(false)
				this.responseText = this.cancelText
				this.destroyModal()
			})
		})
	}

	createModal() {
		// Background dialog
		this.modal = document.createElement('dialog')
		this.modal.classList.add('modal-dialog')
		this.modal.show()

		// Message window
		const window = document.createElement('div')
		window.classList.add('modal-window')
		this.modal.appendChild(window)

		// Main text
		const text = document.createElement('div')
		text.classList.add('modal-text')
		text.textContent = this.modalText
		window.appendChild(text)

		// Accept and cancel button group
		const buttonGroup = document.createElement('div')
		buttonGroup.classList.add('modal-button-group')
		window.appendChild(buttonGroup)

		// Cancel button
		this.cancelButton = document.createElement('button')
		this.cancelButton.type = 'button'
		this.cancelButton.classList.add('button')
		this.cancelButton.classList.add('button-secondary')
		this.cancelButton.classList.add('button-regular')
		this.cancelButton.textContent = this.cancelText
		buttonGroup.appendChild(this.cancelButton)

		// Accept button
		this.acceptButton = document.createElement('button')
		this.acceptButton.type = 'button'
		this.acceptButton.classList.add('button')
		this.acceptButton.classList.add('button-primary')
		this.acceptButton.classList.add('button-regular')
		this.acceptButton.textContent = this.acceptText
		buttonGroup.appendChild(this.acceptButton)

		// Let's rock
		this.parent.appendChild(this.modal)
	}
	displayResponse() {
		const element = document.getElementById('container')
		element.innerHTML += `You just clicked "${this.responseText}"`
	}
	destroyModal() {
		this.parent.removeChild(this.modal)
		delete this
	}
}
