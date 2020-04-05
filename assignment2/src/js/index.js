//import styleText from './x-counter.style.css'
// const sheet = new CSSStyleSheet();
// sheet.replaceSync(styleText);

import "../style.scss"

define();

function define() {
    class XCounter extends HTMLElement {
        set value(value) {
            this._value = value;
            this.valueElement.innerText = this._value;
        }

        get value() {
            return this._value;
        }

        constructor() {
            super();
            this._value = 0;

            var shadow = this.attachShadow({mode: 'open'});

            // shadow.adoptedStyleSheets = [sheet];
            shadow.innerHTML = `
            <button aria-label="decrement">-</button>
            <p>0</p>
            <button aria-label="increment">+</button>

            <style>
                button, p {
    display: inline-block;
    color: dodgerblue;
}
            </style>
            `;

            this.valueElement = shadow.querySelector('p');
            var incrementButton = shadow.querySelectorAll('button')[1];
            var decrementButton = shadow.querySelectorAll('button')[0];

            incrementButton.onclick = () => this.value++;
            decrementButton.onclick = () => this.value--;
        }
    }

    customElements.define('x-counter', XCounter);
}
