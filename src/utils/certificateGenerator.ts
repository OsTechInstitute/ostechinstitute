import jsPDF from "jspdf";

interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
}

export const generateCertificate = (data: CertificateData): string => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Border
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setDrawColor(147, 197, 253);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Title
  doc.setFontSize(40);
  doc.setTextColor(59, 130, 246);
  doc.text("Certificate of Completion", pageWidth / 2, 50, { align: "center" });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("This is to certify that", pageWidth / 2, 70, { align: "center" });

  // Student name
  doc.setFontSize(32);
  doc.setTextColor(30, 30, 30);
  doc.text(data.studentName, pageWidth / 2, 90, { align: "center" });

  // Course info
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text("has successfully completed the course", pageWidth / 2, 110, { align: "center" });

  // Course name
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  doc.text(data.courseName, pageWidth / 2, 130, { align: "center" });

  // Date
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Completion Date: ${data.completionDate}`, pageWidth / 2, 150, { align: "center" });

  // Instructor signature line
  doc.setLineWidth(0.5);
  doc.setDrawColor(100, 100, 100);
  doc.line(pageWidth / 2 - 40, 175, pageWidth / 2 + 40, 175);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(data.instructorName, pageWidth / 2, 182, { align: "center" });
  doc.setFontSize(10);
  doc.text("Course Instructor", pageWidth / 2, 188, { align: "center" });

  // Convert to blob URL
  const pdfBlob = doc.output("blob");
  return URL.createObjectURL(pdfBlob);
};
