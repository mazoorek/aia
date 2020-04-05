export function defineComponent() {
    class ListRowComponent extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            this.shadow.innerHTML = `
             <div class="row-item">
                <input class="input-row-item author-input-row-item" type="text">
                <div class="input-text-row-item author-input-text-row-item"></div> 
            </div>
                <div class="row-item">
                    <input class="input-row-item title-input-row-item" type="text">
                    <div class="input-text-row-item title-input-text-row-item"></div> 
                </div>
                <div class="row-item actions-button-container">
                    <button class="save-button">Save</button>
                    <button class="edit-button">Edit</button>
                    <button class="remove-button">Remove</button>
                </div>
            <style>      
                :host {
                    box-sizing: border-box;
                    display: flex;
                    width: 100%;
                }
                
                .save-button {
                    display: inline;
                }
                
                .edit-button {
                    display: none;
                }
                
                :host([saved]) .save-button {
                    display: none;
                }
                
                :host([saved]) .edit-button {
                    display: inline;
                }
                
                .row-item {
                    flex: 1 1 0;
                    height: 3rem;
                    line-height: 3rem;
                }
                
                .row-item .input-row-item  {
                    display: inline;
                    margin-left: 5px;
                    width: 90%;
                }
                
                :host([saved]) .row-item .input-row-item {
                    display: none;
                }  
                
                .row-item .input-text-row-item  {
                    display: none;
                }
                               
                :host([saved]) .row-item .input-text-row-item {
                    display: inline;
                    padding-left: 5px;
                }                
                
                .row-item.actions-button-container {
                    padding-left: 5px;
                }
                
                .row-item:not(:last-of-type) {
                    border-right: 2px solid white;
                }
            </style>
            `;
        }

        connectedCallback() {
            this.author = '';
            this.title = '';
            const saveButton = this.shadowRoot.querySelector('.save-button');
            const editButton = this.shadowRoot.querySelector('.edit-button');
            const removeButton = this.shadowRoot.querySelector('.remove-button');
            saveButton.addEventListener('click', () => this._onSaveClicked()); //this would be equivalent to this._onSaveClicked.bind(this)
            editButton.addEventListener('click', this._onEditClicked.bind(this));
            removeButton.addEventListener('click', () => this._onRemoveClicked());
        }

        _onSaveClicked() {
            this.author = this.shadowRoot.querySelector('.author-input-row-item').value;
            this.title = this.shadowRoot.querySelector('.title-input-row-item').value;
            this.shadowRoot.querySelector('.author-input-text-row-item').innerHTML = `${this.author}`;
            this.shadowRoot.querySelector('.title-input-text-row-item').innerHTML = `${this.title}`;
            this.setAttribute('saved', '');
        }

        _onEditClicked() {
            this.removeAttribute('saved');
        }

        _onRemoveClicked() {
            const removeBookEvent = new Event('remove-book', {bubbles: true, composed: true});
            this.dispatchEvent(removeBookEvent);
        }
    }

    customElements.define('list-row-component', ListRowComponent);
}