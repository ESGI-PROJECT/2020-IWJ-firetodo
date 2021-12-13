import { LitElement } from 'lit';

export default class Base extends LitElement {
  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }
}