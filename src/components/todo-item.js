import { html } from 'lit';

import Base from '../Base';

class TodoItem extends Base {

  static get properties() {
    return {
      todo: Object
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <section>
        <header><h2>${this.todo.data.title}</h2></header>
      </section>
    `;
  }
}

customElements.define('todo-item', TodoItem);