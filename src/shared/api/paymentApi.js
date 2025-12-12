import { getAccessToken } from '@shared/utils/auth.js';

export async function createNewPayment(data = {}) {
  const token = getAccessToken();

  const res = await fetch('/api/v1/payment/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error('Payment creation failed: ' + err);
  }

  const { redirectUrl, postData } = await res.json();

  if (!redirectUrl) throw new Error('No redirect URL from backend');

  if (postData && Object.keys(postData).length > 0) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = redirectUrl;
    Object.entries(postData).forEach(([k, v]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = k;
      input.value = v;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
  } else {
    window.location.href = redirectUrl;
  }
}
