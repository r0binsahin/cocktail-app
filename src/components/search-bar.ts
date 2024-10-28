import { component, useState } from 'haunted';
import { html } from 'lit-html';

function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const event = new CustomEvent('search', {
      detail: query,
      bubbles: true,
      composed: true,
    });
    dispatchEvent(event);
  };

  return html`
    <style>
      .search-container {
        margin-bottom: 20px;
        display: flex;
        border-radius: 16px;
        background-color: #edf7d2;
      }
      input {
        padding: 16px;
        font-size: 24px;
        width: 100%;
        background-color: transparent;
        border-radius: 16px;
        border: none;
      }

      input:focus {
        outline: none;
      }
      button {
        padding: 8px 16px;
        font-size: 20px;
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border: none;
        background-color: #386c0b;
        color: #fff;
        opacity: 0.8;
      }
    </style>
    <form class="search-container" @submit=${handleSubmit}>
      <input
        type="text"
        .value=${query}
        @input=${(e: SubmitEvent) =>
          setQuery((e.target as HTMLInputElement).value)}
        placeholder="Search cocktails..."
      />
      <button type="submit">Search</button>
    </form>
  `;
}

customElements.define('search-bar', component(SearchBar));
