import '@polymer/paper-button/paper-button.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class CasperMoacMenuItem extends PolymerElement {

  static get is () {
    return 'casper-moac-menu-item';
  }

  static get template () {
    return html`
      <style>
        #container {
          display: flex;
          color: #212121;
          font-size: 15px;
          user-select: none;
          align-items: center;
          padding: 8px 25px 8px 15px;
        }

        #container ::slotted(a) {
          color: #212121;
          height: 100%;
          text-decoration: none;
        }

        #container[disabled],
        #container[disabled] ::slotted(a) {
          color: #A8A8A8;
          pointer-events: none;
        }

        #container:hover,
        #container:hover ::slotted(a) {
          color: var(--primary-color);
          cursor: pointer;
          text-decoration: none;
          transition: background-color 100ms linear;
        }

        #container casper-icon {
          flex: 0 0 30px;
          height: 30px;
          padding: 7px;
          box-sizing: border-box;
          margin-left: 0;
          border-radius: 50%;
          margin-right: 10px;
          background-color: var(--primary-color);
        }

        #container[disabled] casper-icon {
          --casper-icon-fill-color: #A8A8A8;
          background-color: transparent;
        }

        #container:not([disabled]) casper-icon {
          --casper-icon-fill-color: white;
        }

        #container:not([disabled]):hover casper-icon {
          background-color: white;
          --casper-icon-fill-color: var(--primary-color);
        }
      </style>
      <div id="container" disabled$="[[disabled]]">
        <casper-icon icon="[[icon]]"></casper-icon>
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
        observer: '__disabledChanged'
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

  /**
   * Observer that fires when the menu item is enabled / disabled and react accordingly.
   */
  __disabledChanged () {
    this.shadowRoot.host.style.pointerEvents = this.disabled ? 'none' : '';
  }
}

customElements.define(CasperMoacMenuItem.is, CasperMoacMenuItem);
