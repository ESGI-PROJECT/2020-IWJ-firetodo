import { html } from 'lit';
import Base from '../Base.js';
import { getTodos, createTodo, createUser, login, getUser } from '../api/todo.js';

import '../components/todo-item.js';

export default class TodoHome extends Base {
  constructor() {
    super();
    this._todos = [];
    this._connected = false;
    this._user = {};
  }

  static get properties() {
    return {
      _todos: {
        type: Array,
        state: true
      },
      _connected: {
        type: Boolean,
        state: true
      },
      _user: {
        type: Object,
        state: true
      }
    };
  }

  async firstUpdated() {
    this._user = await getUser();
    if (this._user) {
      this._connected = true;
      this._todos = await getTodos();
    }
  }

  async createTodo(e) {
    e.preventDefault();

    const form = this.querySelector('#createTodo');
    const todo = form.querySelector('input[name="todo"]').value;

    createTodo({
      title: todo,
      done: false
    });

    form.querySelector('input[name="todo"]').value = null;

    this._todos = await getTodos();
  }

  async signUp(e) {
    e.preventDefault();

    const form = this.querySelector('#signUp');

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    
    await createUser(email, password);

    this._connected = true;
  }

  async signIn(e) {
    e.preventDefault();

    const form = this.querySelector('#signIn');

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    this._user = await login(email, password);
    this._connected = true;
  }


  loginState() {
    return html`
      <form id="signUp" @submit="${this.signUp}">
        <h1>Sign Up</h1>
        <input class="border-2 border-gray-600" type="email" name="email" id="">
        <input class="border-2 border-gray-600" type="password" name="password" id="">
        <button type="submit">Sign Up</button>
      </form>

      <form id="signIn" @submit="${this.signIn}" class="mt-4">
        <h1>Sign in</h1>
        <input class="border-2 border-gray-600"  type="email" name="email" id="">
        <input class="border-2 border-gray-600"  type="password" name="password" id="">
        <button type="submit">Sign In</button>
      </form>
    `;
  }

  connectedState() {
    return html`
      <header class="flex justify-end">
        <span>Welcome : ${this._user.email}</span>
      </header>
      <h1>Todos (${this._todos.length}):</h1>
      <ul>
        ${this._todos.map(todo => html`<li><todo-item .todo="${todo}"></todo-item></li>`)}
      </ul>

      <form id="createTodo" @submit="${this.createTodo}">
        <input class="border-2 border-gray-600" type="text" name="todo">
        <button type="submit">Create</button>
      </form>
    `;
  }

  render() {
    return this._connected ? this.connectedState() : this.loginState();
  }
}

customElements.define('todo-home', TodoHome);