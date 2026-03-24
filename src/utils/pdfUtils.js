import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from './dateUtils';

export function downloadRecordsPdf({ records, dateRangeLabel }) {
  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFontSize(16);
  doc.text('Gold & Silver Rate Management System', 14, 16);

  doc.setFontSize(11);
  doc.text(`Selected Range: ${dateRangeLabel}`, 14, 24);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 30);

  autoTable(doc, {
    startY: 36,
    head: [
      [
        'Gold Price',
        'Customer',
        'Weight',
        'Item',
        'Stone Size',
        'Status',
        'Other',
        'Total',
        'Given Date',
        'Delivery Date'
      ]
    ],
    body: records.map((record) => [
      record.goldRate,
      record.customerName,
      record.weight,
      record.itemName,
      record.stoneSize || '-',
      record.status,
      record.other || '-',
      record.totalAmount,
      formatDate(record.givenDate),
      formatDate(record.deliveryDate)
    ])
  });

  doc.save(`records-${Date.now()}.pdf`);
}
