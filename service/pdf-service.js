const PDFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback, data) {
  const doc = new PDFDocument({ bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);
 console.log('heloooooooooooooooooooooooooooooooooooooooooooooooooooooooo',data);
  doc.fontSize(20).text();
  var t=JSON.stringify(data)
  doc
    .fontSize(12)
    .text(
        t
    );
  doc.end();
}

module.exports = { buildPDF };
