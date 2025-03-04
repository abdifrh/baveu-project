
import { Message } from './aimlApi';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Ajouter la déclaration du plugin autotable pour TypeScript
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generatePDF = async (messages: Message[], sessionName: string) => {
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  
  // Ajouter un titre
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 153);
  doc.text(`Conversation juridique : ${sessionName}`, 14, 22);
  
  // Ajouter la date
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  const dateStr = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());
  doc.text(`Document généré le ${dateStr}`, 14, 30);
  
  // Ajouter un texte d'introduction
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(
    'Document contenant l\'historique de conversation avec Mr BAVEU, assistant juridique spécialisé dans l\'industrie musicale.',
    14, 40
  );
  
  // Préparer les données pour le tableau
  const tableBody = messages.map(message => {
    const role = message.role === 'user' ? 'Vous' : 'Mr BAVEU';
    const time = new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(message.createdAt);
    
    return [
      role,
      time,
      message.content
    ];
  });
  
  // Créer le tableau avec les messages
  doc.autoTable({
    startY: 50,
    head: [['Rôle', 'Heure', 'Message']],
    body: tableBody,
    headStyles: {
      fillColor: [0, 82, 204],
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [240, 245, 255]
    },
    bodyStyles: {
      lineWidth: 0.1,
      lineColor: [220, 220, 220]
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 20 },
      2: { cellWidth: 'auto' }
    },
    styles: {
      overflow: 'linebreak',
      fontSize: 9
    },
    margin: { top: 50 }
  });
  
  // Ajouter un pied de page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      'BAVEU - Conseils juridiques pour l\'industrie musicale - Document à titre informatif uniquement.',
      14,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      `Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.width - 25,
      doc.internal.pageSize.height - 10
    );
  }
  
  // Télécharger le PDF
  doc.save(`conversation-musicale-${new Date().toISOString().slice(0, 10)}.pdf`);
};
