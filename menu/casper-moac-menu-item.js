import '@polymer/paper-button/paper-button.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class CasperMoacMenuItem extends PolymerElement {

  static get is () {
    return 'casper-moac-menu-item';
  }

  static get template () {
    return html`
      <style>
        :host([disabled]) {
          pointer-events: none;
        }

        #container {
          display: flex;
          color: #212121;
          font-size: 15px;
          user-select: none;
          align-items: center;
          padding: 8px 25px 8px 15px;
        }

        #container ::slotted(a) {
          height: 100%;
          color: #212121;
          text-decoration: none;
        }

        :host([disabled]) #container,
        :host([disabled]) #container ::slotted(a) {
          color: var(--disabled-text-color);
          pointer-events: none;
        }

        #container:hover,
        #container:hover ::slotted(a) {
          color: var(--primary-color);
          cursor: pointer;
          text-decoration: none;
          transition: background-color 100ms linear;
        }

        #container casper-icon-button {
          flex: 0 0 30px;
          height: 30px;
          padding: 7px;
          margin-right: 10px;
          box-sizing: border-box;
        }
      </style>
      <div id="container">
        <casper-icon-button disabled="[[disabled]]" icon="[[icon]]"></casper-icon-button>
        <slot></slot>
      </div>
    `;
  }

  static get properties () {
    return {
      /**
       * Icon that will be used in the paper-icon-button.
       * @type {String}
       */
      icon: {
        type: String,
      },
      /**
       * Flag that enables / disables the menu item.
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }

  ready () {
    super.ready();

    this.shadowRoot.addEventListener('click', event => {
      if (event.composedPath().some(element => element.nodeName && element.nodeName.toLowerCase() === 'a')) return;

      const slotAssignedElements = this.shadowRoot.querySelector('slot').assignedElements();

      // Trigger the click manually when there is an anchor.
      if (slotAssignedElements.length > 0 && slotAssignedElements[0].nodeName.toLowerCase() === 'a') {
        slotAssignedElements[0].click();
      }
    });
  }
}

customElements.define(CasperMoacMenuItem.is, CasperMoacMenuItem);
