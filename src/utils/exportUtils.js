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
 * Generates a Word Document (.docx) matching the visual preview by capturing pages as images
 */
export const exportToWord = async (data, containerId = 'report-template') => {
  const container = document.getElementById(containerId);
  if (!container) {
    alert("Could not find the document container to export.");
    return;
  }

  const pages = container.querySelectorAll('.export-page');
  if (pages.length === 0) {
    alert("No pages found to export.");
    return;
  }

  try {
    const sections = [];

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 1.5, // Balanced quality/memory
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      const arrayBuffer = await fetch(imgData).then(res => res.arrayBuffer());
      
      const ratio = canvas.height / canvas.width;
      const wordWidth = 794;
      const wordHeight = Math.round(wordWidth * ratio);

      sections.push({
        properties: {
          page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
        },
        children: [
          new Paragraph({
            children: [
              new ImageRun({
                data: arrayBuffer,
                transformation: { width: wordWidth, height: wordHeight }
              })
            ]
          })
        ]
      });
    }

    const doc = new Document({ sections });
    const blob = await Packer.toBlob(doc);
    const baseName = sanitizeFilename(data.applicantName || 'Pending');
    const fileName = `Verification_Report_${baseName}.docx`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Error generating Word document:', error);
    alert('Failed to generate Word document. The document might be too large for your browser memory.');
  }
};
