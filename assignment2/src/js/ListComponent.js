export function defineComponent() {
    class ListComponent extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
            this.shadow.innerHTML = `
             <div class="title">Welcome to my book collection</div>
            <button class="add-book-button">Add new book</button>
            <div class="header">
                <div class="header-item">Author</div>
                <div class="header-item">Title</div>
                <div class="header-item"></div>
            </div>
            <style>      
                :host {
                    box-sizing: border-box;
                    width: 800px;
                    /*border: 1px solid black;*/
                    box-shadow: 0 0 2rem 0 #888888;
                    display: flex;
                    flex-flow: column;
                    align-items: flex-start;
                    padding: 2rem 1rem;
                }
                
                .title {
                font-weight: bold;
                font-size: 3rem;
                padding-bottom: 3rem;
                }
                
                .header {
                    display: flex;
                    flex-grow: 1;
                    width: 100%;
                }
                
                .header .header-item {
                    flex: 1 1 0;
                    font-weight: bold;
                    text-align: center;
                    height: 3rem;
                    line-height: 3rem;
                    /*if line height is same size as height and the text is one-liner the text content get centered*/
                }
                
                list-row-component {
                    flex-grow: 1;
                }
                
                list-row-component:nth-child(2n-1) {
                 background-color: lightgrey;
                }
            </style>
            `;
        }

        connectedCallback() {
            const addButton = this.shadowRoot.querySelector('.add-book-button');
            addButton.addEventListener('click', () => {
                const listRow = document.createElement('list-row-component');
                this.shadow.appendChild(listRow);
                listRow.addEventListener('remove-book', () => {
                    this.shadowRoot.removeChild(listRow);
                });
            });
        }
    }

    customElements.define('list-component', ListComponent);
}