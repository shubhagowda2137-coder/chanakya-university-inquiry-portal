// Chanakya University – shared utilities
const CU = {
  API_BASE: '/api',

  async get(endpoint, params = {}) {
    const url = new URL(this.API_BASE + endpoint, window.location.origin);
    Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
  },

  formatCurrency(amount) {
    return '₹' + parseFloat(amount).toLocaleString('en-IN');
  },

  availClass(count) {
    if (count > 10) return 'avail-good';
    if (count > 0)  return 'avail-low';
    return 'avail-none';
  },

  showToast(message, type = 'success') {
    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white border-0 bg-${type === 'success' ? 'success' : 'danger'}`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>`;
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(container);
    }
    container.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }
};
