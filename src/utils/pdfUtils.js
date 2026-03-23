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
        'Customer',
        'Item',
        'Gold Rate',
        'Weight (g)',
        'Total',
        'Status',
        'Given Date',
        'Delivery Date'
      ]
    ],
    body: records.map((record) => [
      record.customerName,
      record.itemName,
      record.goldRate,
      record.weight,
      record.totalAmount,
      record.status,
      formatDate(record.givenDate),
      formatDate(record.deliveryDate)
    ])
  });

  doc.save(`records-${Date.now()}.pdf`);
}
