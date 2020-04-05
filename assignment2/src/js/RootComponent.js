//import styleText from './root-component.style.css'
// const sheet = new CSSStyleSheet();
// sheet.replaceSync(styleText);

export function defineComponent() {
    class RootComponent extends HTMLElement {
        constructor() {
            super();

            const shadow = this.attachShadow({mode: 'open'});
            // shadow.adoptedStyleSheets = [sheet];
            shadow.innerHTML = `
            <list-component></list-component>
            <style>
                :host {
                    box-sizing: border-box;
                    height: 100vh;
                    max-width: 100vw;
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                }
                
                list-component {
                    margin-top: 10rem;
                }
            </style>
            `;
        }
    }

    customElements.define('root-component', RootComponent);
}