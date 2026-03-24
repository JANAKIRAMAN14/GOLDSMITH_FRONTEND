import { useEffect, useState } from 'react';
import { DEFAULT_STATUS, STATUS_OPTIONS } from '../../constants/defaults';

function RecordForm({
  initialValues,
  defaultGoldRate,
  lockGoldRate = false,
  onSubmit,
  onCancel,
  submitLabel = 'Save Record'
}) {
  const [formData, setFormData] = useState({
    id: initialValues?.id || null,
    goldRate: initialValues?.goldRate ?? defaultGoldRate ?? '',
    customerName: initialValues?.customerName || '',
    weight: initialValues?.weight || '',
    itemName: initialValues?.itemName || '',
    stoneSize: initialValues?.stoneSize || '',
    status: initialValues?.status || DEFAULT_STATUS,
    other: initialValues?.other || '',
    itemImage: initialValues?.itemImage || '',
    itemImageFile: null,
    totalAmount: initialValues?.totalAmount || 0,
    givenDate: initialValues?.givenDate || new Date().toISOString().slice(0, 10),
    deliveryDate: initialValues?.deliveryDate || ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialValues && Number(defaultGoldRate) > 0) {
      setFormData((prev) => ({ ...prev, goldRate: Number(defaultGoldRate) }));
    }
  }, [defaultGoldRate, initialValues]);

  useEffect(() => {
    const goldRate = Number(formData.goldRate) || 0;
    const weight = Number(formData.weight) || 0;
    const totalAmount = Number((goldRate * weight).toFixed(2));
    setFormData((prev) => ({ ...prev, totalAmount }));
  }, [formData.goldRate, formData.weight]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      itemImage: previewUrl,
      itemImageFile: file
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (Number(formData.goldRate) <= 0) nextErrors.goldRate = 'Gold rate must be greater than zero.';
    if (!formData.customerName.trim()) nextErrors.customerName = 'Customer name is required.';
    if (Number(formData.weight) <= 0) nextErrors.weight = 'Weight must be greater than zero.';
    if (!formData.itemName.trim()) nextErrors.itemName = 'Item name is required.';
    if (!formData.givenDate) nextErrors.givenDate = 'Given date is required.';
    if (!formData.deliveryDate) nextErrors.deliveryDate = 'Delivery date is required.';
    if (formData.deliveryDate && formData.givenDate && formData.deliveryDate < formData.givenDate) {
      nextErrors.deliveryDate = 'Delivery date cannot be before given date.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      goldRate: Number(formData.goldRate),
      weight: Number(formData.weight),
      totalAmount: Number(formData.totalAmount),
      status: formData.status || DEFAULT_STATUS
    });
  };

  const inputStyles =
    'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-500';

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Gold Price (Rs / g)</label>
          <input
            type="number"
            name="goldRate"
            value={formData.goldRate}
            onChange={handleChange}
            disabled={lockGoldRate}
            className={`${inputStyles} ${lockGoldRate ? 'cursor-not-allowed bg-slate-100' : ''}`}
          />
          {errors.goldRate ? <p className="mt-1 text-xs text-red-600">{errors.goldRate}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Customer Name</label>
          <input
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={inputStyles}
            placeholder="Enter customer name"
          />
          {errors.customerName ? <p className="mt-1 text-xs text-red-600">{errors.customerName}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Given Weight (grams)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className={inputStyles}
          />
          {errors.weight ? <p className="mt-1 text-xs text-red-600">{errors.weight}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Item Name</label>
          <input
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className={inputStyles}
            placeholder="e.g. Ring, Chain"
          />
          {errors.itemName ? <p className="mt-1 text-xs text-red-600">{errors.itemName}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Stone Size</label>
          <input
            name="stoneSize"
            value={formData.stoneSize}
            onChange={handleChange}
            className={inputStyles}
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={inputStyles}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Other</label>
          <textarea
            name="other"
            value={formData.other}
            onChange={handleChange}
            rows={3}
            className={inputStyles}
            placeholder="Additional notes"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Total Amount</label>
          <input
            name="totalAmount"
            value={formData.totalAmount}
            disabled
            className={`${inputStyles} cursor-not-allowed bg-slate-100`}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Given Date</label>
          <input
            type="date"
            name="givenDate"
            value={formData.givenDate}
            onChange={handleChange}
            className={inputStyles}
          />
          {errors.givenDate ? <p className="mt-1 text-xs text-red-600">{errors.givenDate}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className={inputStyles}
          />
          {errors.deliveryDate ? <p className="mt-1 text-xs text-red-600">{errors.deliveryDate}</p> : null}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Item Image Upload</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className={inputStyles} />
        {formData.itemImage ? (
          <img
            src={formData.itemImage}
            alt="Item preview"
            className="mt-3 h-24 w-24 rounded-xl border border-slate-200 object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          {submitLabel}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default RecordForm;
