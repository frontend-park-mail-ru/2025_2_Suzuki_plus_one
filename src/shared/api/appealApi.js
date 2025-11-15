import { fetchWithErrorsHandling } from '@shared/utils/errorHandler.js';

export async function fetchAllAppeals() {
    return await fetchWithErrorsHandling(`/api/v1/appeal/all`, {
        method: 'GET',
    });
}

export async function fetchMyAppeals() {
    return {
    "appeals": [
        {
        "tag": "bug",
        "name": "I have a problem...",
        "status": "open",
        "created_at": "11:11 01.01.2024"
        }
    ]
    }

    return await fetchWithErrorsHandling(`/api/v1/appeal/my`, {
        method: 'GET',
    });
}

export async function createNewAppeal(data) {
    console.log()
    return fetchWithErrorsHandling('/api/v1/appeal/new', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function fetchAppealById(appeal_id) {
    return [{
  "tag": "bug",
  "name": "I have a problem...",
  "status": "open",
  "created_at": "11:11 01.01.2024"
}]
    return await fetchWithErrorsHandling(`/api/v1/appeal/{appeal_id}`, {
        method: 'GET',
    });
}

export async function markAppealAsResolved(data) {
    return fetchWithErrorsHandling('/api/v1/appeal/{appeal_id}/resolve', {
        method: 'PUT',
        // body: JSON.stringify(data),
    });
}

export async function AddMessageToAppeal(appeal_id, data) {
    return fetchWithErrorsHandling('/api/v1/appeal/{appeal_id}/message', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getMessageOfAppeal(appeal_id) {

    return {
  "messages": [
    {
      "is_response": false,
      "message": "Thank you for your feedback!",
      "timestamp": "11:15 01.01.2024"
    },

    {
      "is_response": true,
      "message": "Thank you for your feedback!",
      "timestamp": "11:15 01.01.2024"
    }
  ]
}

    return fetchWithErrorsHandling('/api/v1/appeal/{appeal_id}/message', {
        method: 'GET',
    });
}
