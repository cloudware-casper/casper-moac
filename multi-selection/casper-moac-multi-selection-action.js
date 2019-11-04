import '@casper2020/casper-icons/casper-icon.js';
import '@polymer/paper-button/paper-button.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class CasperMoacMultiSelectionAction extends PolymerElement {

  static get is () {
    return 'casper-moac-multi-selection-action';
  }

  static get properties () {
    return {
      /**
       * Icon that will be used in the paper-button.
       * @type {String}
       */
      icon: {
        type: String
      },
      /**
       * Flag that enables / disables the multi selection action.
       * @type {Boolean}
       */
      disabled: {
        type: Boolean,
        value: false,
        observer: '__disabledChanged'
      }
    };
  }

  static get template () {
    return html`
      <style>
        :host {
          height: 25px;
          margin-top: 10px;
        }

        #button {
          height: 25px;
          font-size: 10px;
          font-weight: bold;
          border-radius: 15px;
          padding: 0 7px 0 5px;
        }

        #button:not([disabled]) {
          background-color: var(--primary-color);
        }

        #button.only-icon {
          width: 25px;
          padding: 0;
          min-width: unset;
          border-radius: 50%;
        }

        #button casper-icon {
          width: 19px;
          height: 19px;
          padding: 5px;
          --casper-icon-fill-color: white;
        }
      </style>

      <paper-button id="button" disabled="[[disabled]]">
        <casper-icon icon="[[icon]]"></casper-icon>
        <slot></slot>
      </paper-button>
    `;
  }

  ready () {
    super.ready();

    if (this.shadowRoot.querySelector('slot').assignedNodes().length === 0) {
      this.$.button.classList.add('only-icon');
    }
  }

  /**
   * Observer that fires when the multi selection action is enabled / disabled and react accordingly.
   */
  __disabledChanged () {
    this.shadowRoot.host.style.pointerEvents = this.disabled ? 'none' : '';
  }
}

customElements.define(CasperMoacMultiSelectionAction.is, CasperMoacMultiSelectionAction);
