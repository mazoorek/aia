//import styleText from './x-counter.style.css'
// const sheet = new CSSStyleSheet();
// sheet.replaceSync(styleText);

export function defineComponent() {
    class RootComponent extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({mode: 'open'});
            // shadow.adoptedStyleSheets = [sheet];
            shadow.innerHTML = `
            <div class="title">Welcome to my book collection</div>
            <list-component></list-component>
            <style>
                .title {
                font-weight: bold;
                font-size: 3rem;
                padding: 20px 10px;
                }
                
                :host {
                    height: 100vh;
                    width: 100%;
                    display: flex;
                    flex-flow: column;
                }
            </style>
            `;
        }
    }

    customElements.define('root-component', RootComponent);
}