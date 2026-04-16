import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  AlignmentType,
  HeadingLevel,
  ImageRun
} from 'docx';
import { saveAs } from 'file-saver';

/**
 * Sanitizes a filename to ensure it is safe for all operating systems
 */
const sanitizeFilename = (name) => {
  return name.replace(/[/\\?%*:|"<>]/g, '-').replace(/\s+/g, '_').trim();
};

/**
 * Generates a high-quality MULTI-PAGE PDF from the DOM element
 */
export const exportToPDF = async (containerId, baseFilename = 'Verification_Report.pdf') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const pages = container.querySelectorAll('.export-page');
  if (pages.length === 0) return;

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 1.5, // Balanced quality/memory
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.85); // JPEG is smaller than PNG
      
      if (i > 0) pdf.addPage();
      
      // Calculate height to maintain aspect ratio on A4
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = imgProps.width / imgProps.height;
      const heightInPdf = pdfWidth / ratio;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, heightInPdf);
    }

    const cleanName = sanitizeFilename(baseFilename.replace('.pdf', '')) + '.pdf';
    pdf.save(cleanName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. The document might be too large for your browser memory.');
  }
};

/**
 * Generates a Word Document (.docx) preserving structure
 */
export const exportToWord = async (data) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // --- PAGE 1 & HEADER ---
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: (data.caName || "PARVEZ AND NARAYANA").toUpperCase(), bold: true, size: 28 }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "CHARTERED ACCOUNTANTS", bold: true, size: 18, color: "666666" }),
          ],
        }),
        new Paragraph({ text: data.janRef || "JAN-XXXX", bold: true }),
        new Paragraph({ text: "" }),
        
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "DUE DILIGENCE REPORT", bold: true, size: 24, underline: {} }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "EVALUATION SHEET", bold: true, size: 16 }),
          ],
        }),
        new Paragraph({ text: "" }),

        // Metadata Table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Date of Receipt", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.dateOfReceipt || "-" })] }),
                new TableCell({ children: [new Paragraph({ text: "Date of Report", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.dateOfReport || "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "RLMS Number", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.rlmsNumber || "-" })] }),
                new TableCell({ children: [new Paragraph({ text: "Reference Number", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.referenceNumber || "-" })] }),
              ],
            }),
          ],
        }),
        new Paragraph({ text: "" }),

        // Applicant Details
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "RESIDENCE VERIFICATION REPORT - APPLICANT", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Applicant Name", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.applicantName || "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Address", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.address || "-" })] }),
              ],
            }),
          ],
        }),
        new Paragraph({ text: "" }),

        // Observations Table
        new Paragraph({ text: "VERIFIER'S OBSERVATIONS", bold: true, underline: {} }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Locality", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.observations.locality || "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Accessibility", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.observations.accessibility || "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Motorable", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.observations.motorable || "-" })] }),
                new TableCell({ children: [new Paragraph({ text: "Address Confirmed", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.observations.addressConfirmed || "-" })] }),
              ],
            }),
          ],
        }),
        new Paragraph({ text: "" }),

        // --- PAGE 2: RESIDENCE DETAILS & FINDINGS ---
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "RESIDENCE PHYSICAL VERIFICATION", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Stairs", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.residenceDetail.noOfStairs || "0" })] }),
                new TableCell({ children: [new Paragraph({ text: "Watchman", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.residenceDetail.watchman || "-" })] }),
                new TableCell({ children: [new Paragraph({ text: "Lift", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.residenceDetail.lift || "-" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Person Contacted", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.residenceDetail.personContacted || "-", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: "Relationship", bold: true })] }),
                new TableCell({ children: [new Paragraph({ text: data.residenceDetail.relationship || "-" })] }),
              ],
            }),
          ],
        }),
        new Paragraph({ text: "" }),
        
        new Paragraph({ text: "FIELD EXECUTIVE'S COMMENTS (RESIDENCE):", bold: true }),
        new Paragraph({ text: `• House Type: ${data.fieldExecutiveComments.houseType}` }),
        new Paragraph({ text: `• Ownership: ${data.fieldExecutiveComments.ownership}` }),
        new Paragraph({ text: `• Duration of Stay: ${data.fieldExecutiveComments.durationOfStay}` }),
        new Paragraph({ text: `• Confirmed By: ${data.fieldExecutiveComments.residenceConfirmedBy}` }),
        new Paragraph({ text: data.fieldExecutiveComments.text, italic: true }),
        new Paragraph({ text: "" }),

        // --- PAGE 3: BUSINESS VERIFICATION ---
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "BUSINESS VERIFICATION REPORT", bold: true })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Name of Premise", bold: true })] }), new TableCell({ children: [new Paragraph({ text: data.businessDetails.premiseName || "-" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Nature of Business", bold: true })] }), new TableCell({ children: [new Paragraph({ text: data.businessDetails.natureOfBusiness || "-" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Designation", bold: true })] }), new TableCell({ children: [new Paragraph({ text: data.businessDetails.designation || "-" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Business Since", bold: true })] }), new TableCell({ children: [new Paragraph({ text: data.businessDetails.businessSince || "-" })] })] }),
            new TableRow({ children: [new TableCell({ children: [new Paragraph({ text: "Premise Status", bold: true })] }), new TableCell({ children: [new Paragraph({ text: data.businessDetails.ownershipType || "-" })] })] }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: "BUSINESS EXECUTIVE COMMENTS:", bold: true }),
        new Paragraph({ text: data.businessDetails.text, italic: true }),
        new Paragraph({ text: "" }),

        // Final Summary
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: `FINAL REPORT STATUS: ${data.finalStatus}`, bold: true, size: 28, color: data.finalStatus === 'POSITIVE' ? '22c55e' : 'ef4444' }),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({
           alignment: AlignmentType.RIGHT,
           children: [
             new TextRun({ text: "__________________________", bold: true }),
             new TextRun({ text: "\nAuthorized Signatory", size: 16 }),
           ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const baseName = sanitizeFilename(data.applicantName || 'Pending');
  const fileName = `Verification_Report_${baseName}.docx`;
  saveAs(blob, fileName);
};
