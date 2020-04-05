export function defineComponent() {
    class ListComponent extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
            <button class="add-book-button">Add new book</button>
            <div class="header">
                <div class="header-item">Author</div>
                <div class="header-item">Title</div>
                <div class="header-item"></div>
            </div>
            <style>      
                :host {
                    width: 100%;
                    display: flex;
                    flex-flow: column;
                    align-items: flex-start;
                    padding: 0 10px;
                }
                
                .header {
                    display: flex;
                    flex-grow: 1;
                    width: 100%;
                }
                
                .header .header-item {
                    flex-grow: 1;
                    font-weight: bold;
                    text-align: center;
                    height: 30px;
                    line-height: 30px;
                    /*if line height is same size as height and the text is one-liner the text content get centered*/
                }
            </style>
            `;
        }
    }

    customElements.define('list-component', ListComponent);
}