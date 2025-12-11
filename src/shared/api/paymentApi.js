export function createNewPayment() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/api/v1/payment/new';
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
}