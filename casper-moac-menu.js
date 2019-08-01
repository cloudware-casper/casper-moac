import './casper-moac-menu-items';
import { CasperMoacMenuItem } from './casper-moac-menu-item';
import '@casper2020/casper-icons/casper-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

class CasperMoacMenu extends PolymerElement {

  static get is () {
    return 'casper-moac-menu';
  }

  static get properties () {
    return {
      /**
       * Flag that states if the menu is currently disabled or not.
       * @type {Boolean}
       */
      disabled: {
        type: Boolean,
        value: false,
        observer: '_disabledChanged'
       },
       /**
        * Icon that will appear when the casper-moac-menu
        * is closed.
        * @type {String}
        */
       openIcon: {
         type: String,
         value: 'casper-icons:plus'
       },
       /**
        * Icon that will appear when the casper-moac-menu
        * is opened.
        * @type {String}
        */
       closeIcon: {
        type: String,
        value: 'casper-icons:clear'
      },
    };
  }

  static get template () {
    return html`
      <style>
        #menuTrigger {
          padding: 0;
          z-index: 2;
          width: 55px;
          height: 55px;
          color: white;
          border-radius: 50%;
          background-color: var(--primary-color);
        }

        #menuTrigger[disabled] {
          color: #A8A8A8;
          background-color: #EAEAEA;
        }

        #menuTrigger:not(disabled):hover {
          filter: brightness(90%);
          transition: filter 200ms linear;
        }

        #menuTrigger[data-menu-opened] {
          background-color: white;
          color: var(--primary-color);
          box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.25);
        }

        #circleBackground {
          width: 0;
          height: 0;
          z-index: 1;
          opacity: 0.95;
          position: absolute;
          border-radius: 50%;
          filter: brightness(200%);
          transform: translate(-40%, -40%);
          background-color: var(--primary-color);
          transition: width 200ms ease-in, height 200ms ease-in;
        }

        #circleBackground[data-menu-opened] {
          width: 500px;
          height: 500px;
        }
      </style>
      <paper-icon-button
        id="menuTrigger"
        disabled="[[disabled]]"
        icon="[[_menuIcon(_opened)]]"
        data-menu-opened$="[[_opened]]">
      </paper-icon-button>
      <casper-moac-menu-items
        id="menuItems"
        opened="{{_opened}}"
        vertical-align="top"
        horizontal-align="left">
        <slot></slot>
      </casper-moac-menu-items>
      <div id="circleBackground" data-menu-opened$="[[_opened]]"></div>
    `;
  }

  ready () {
    super.ready();

    afterNextRender(this, () => {
      const menuTriggerDimensions = this.$.menuTrigger.getBoundingClientRect();

      this.$.menuItems.positionTarget = this.$.menuTrigger;
      this.$.menuItems.verticalOffset = menuTriggerDimensions.height + CasperMoacMenuItem.buttonMargin / 2;
      this.$.menuItems.horizontalOffset = menuTriggerDimensions.width / 2 - CasperMoacMenuItem.buttonRadius;
      this.$.menuItems.addEventListener('iron-overlay-canceled', event => {
        // Prevent the default action which would close the overlay and then the below listener would re-open it.
        if (event.detail.path.includes(this.$.menuTrigger) || event.detail.path.includes(this.$.circleBackground)) {
          event.preventDefault();
        }
      });

      this.$.menuTrigger.addEventListener('click', () => {
        this.$.menuItems.toggle();
      });
    });
  }

  _menuIcon (opened) {
    return opened ? this.closeIcon : this.openIcon;
  }

  _disabledChanged (disabled) {
    if (disabled) this.$.menuItems.close();
  }

  open () {
    this.$.menuItems.open();
  }

  close () {
    this.$.menuItems.close();
  }

  toggle () {
    this.$.menuItems.toggle();
  }
}

customElements.define(CasperMoacMenu.is, CasperMoacMenu);