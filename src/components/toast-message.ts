import { component, useState, useEffect } from 'haunted';
import { html } from 'lit-html';

function ToastMessage() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  };

  useEffect(() => {
    window.addEventListener('show-toast', ((e: CustomEvent) => {
      showToast(e.detail);
    }) as EventListener);

    return () => {
      window.removeEventListener('show-toast', ((e: CustomEvent) => {
        showToast(e.detail);
      }) as EventListener);
    };
  }, []);

  return html`
    <style>
      .toast {
        position: fixed;
        bottom: 20px;
        right: 150px;
        background: #6cae75;
        color: #000;
        padding: 12px 24px;
        border-radius: 16px;
        transition: transform 0.3s ease-in-out;
        transform: translateY(${visible ? '0' : '100px'});
      }

      @media (max-width: 768px) {
        .toast {
          right: 50%;
          transform: translate(50%, ${visible ? '0' : '100px'});
          bottom: 30px;
          width: max-content;
          min-width: 200px;
          max-width: calc(100% - 32px);
        }
      }
    </style>
    <div class="toast">${message}</div>
  `;
}

customElements.define('toast-message', component(ToastMessage));
