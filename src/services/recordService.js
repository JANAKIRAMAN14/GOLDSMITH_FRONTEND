import { apiRequest } from './apiClient';

function mapRecord(record) {
  return {
    id: record._id,
    goldRate: record.goldRate,
    customerName: record.customerName,
    weight: record.weight,
    itemName: record.itemName,
    stoneSize: record.stoneSize || '',
    status: record.status,
    other: record.other || '',
    itemImage: record.itemImageUrl || '',
    totalAmount: record.totalAmount,
    givenDate: record.givenDate ? new Date(record.givenDate).toISOString().slice(0, 10) : '',
    deliveryDate: record.deliveryDate ? new Date(record.deliveryDate).toISOString().slice(0, 10) : ''
  };
}

export async function getAllRecords() {
  const data = await apiRequest('/api/records');
  return (data.records || []).map(mapRecord);
}

export async function createRecord(record) {
  const form = new FormData();

  form.append('goldRate', String(Number(record.goldRate) || 0));
  form.append('customerName', record.customerName || '');
  form.append('itemName', record.itemName || '');
  form.append('weight', String(Number(record.weight) || 0));
  form.append('stoneSize', record.stoneSize || '');
  form.append('status', record.status || 'Pending');
  form.append('other', record.other || '');
  form.append('totalAmount', String(Number(record.totalAmount) || 0));
  form.append('givenDate', record.givenDate || '');
  form.append('deliveryDate', record.deliveryDate || '');

  if (record.itemImageFile) {
    form.append('itemImage', record.itemImageFile);
  }

  const data = await apiRequest('/api/records', {
    method: 'POST',
    body: form
  });

  return mapRecord(data.record);
}

export async function updateRecord(record) {
  const payload = {
    customerName: record.customerName,
    itemName: record.itemName,
    weight: Number(record.weight),
    stoneSize: record.stoneSize || '',
    status: record.status,
    other: record.other || '',
    givenDate: record.givenDate,
    deliveryDate: record.deliveryDate
  };

  const data = await apiRequest(`/api/records/${record.id}`, {
    method: 'PATCH',
    body: payload
  });

  let mapped = mapRecord(data.record);

  if (record.itemImageFile) {
    const form = new FormData();
    form.append('itemImage', record.itemImageFile);

    const imageData = await apiRequest(`/api/records/${record.id}/image`, {
      method: 'PATCH',
      body: form
    });

    mapped = mapRecord(imageData.record);
  }

  return mapped;
}

export async function deleteRecord(recordId) {
  await apiRequest(`/api/records/${recordId}`, {
    method: 'DELETE'
  });
}

export async function toggleRecordStatus(recordId) {
  const data = await apiRequest(`/api/records/${recordId}/status`, {
    method: 'PATCH'
  });
  return mapRecord(data.record);
}
