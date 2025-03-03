
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadReceipt = async (receiptElement: HTMLElement | null, orderId: string) => {
  if (!receiptElement) return;
  
  try {
    // Create a canvas from the receipt element
    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
    });
    
    // Initialize the PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    // Calculate the width and height to maintain aspect ratio
    const imgWidth = 210; // A4 width in mm (210mm)
    const pageHeight = 297; // A4 height in mm (297mm)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Add the image to the PDF
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    
    // Save the PDF
    pdf.save(`PUBGM_Receipt_${orderId}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to download receipt. Please try again.");
  }
};
