import { html } from 'lit';
import Base from '../Base.js';
import { getTodos, createTodo } from '../api/todo.js';

import '../components/todo-item.js';

export default class TodoHome extends Base {
  constructor() {
    super();
    this._todos = [];
  }

  static get properties() {
    return {
      _todos: {
        type: Array,
        state: true
      }
    };
  }

  async firstUpdated() {
    this._todos = await getTodos();
  }

  async createTodo(e) {
    e.preventDefault();

    const form = this.querySelector('form');
    const todo = form.querySelector('input[name="todo"]').value;

    createTodo({
      title: todo,
      done: false
    });

    form.querySelector('input[name="todo"]').value = null;

    this._todos = await getTodos();
  }

  render() {
    return html`
      <h1>Todos (${this._todos.length}):</h1>
      <ul>
        ${this._todos.map(todo => html`<li><todo-item .todo="${todo}"></todo-item></li>`)}
      </ul>

      <form @submit="${this.createTodo}">
        <input class="border-2 border-gray-600" type="text" name="todo">
        <button type="submit">Create</button>
      </form>
    `;
  }
}

customElements.define('todo-home', TodoHome);