
import html2canvas from "html2canvas";

export const downloadReceipt = async (receiptElement: HTMLElement | null, orderId: string, gameType: string = "PUBG Mobile") => {
  if (!receiptElement) return;
  
  try {
    // Create a canvas from the receipt element
    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
    });
    
    // Convert canvas to image and download
    const imgData = canvas.toDataURL("image/png");
    
    // Create a link element to download the image
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `Midasbuy_${gameType.replace(/\s+/g, '')}_Receipt_${orderId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generating receipt image:", error);
    alert("Failed to download receipt. Please try again.");
  }
};
