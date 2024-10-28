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
