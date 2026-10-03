import { jsPDF } from 'jspdf';
import { NewsArticle } from '../types/news.js';

/**
 * Cleanly wraps text to fit within page margins
 */
function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  for (let i = 0; i < lines.length; i++) {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
    doc.text(lines[i], x, y);
    y += lineHeight;
  }
  return y;
}

/**
 * Export a single news article to a formatted PDF
 */
export function exportArticleToPdf(article: NewsArticle) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // Header Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, cursorY, contentWidth, 14, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('NORDESTE HOJE | DOSSIÊ INFORMATIVO DIÁRIO', margin + 6, cursorY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(new Date().toLocaleDateString('pt-BR'), pageWidth - margin - 25, cursorY + 9);
  cursorY += 22;

  // Category & Metadata
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(194, 65, 12); // orange-700 / terracotta
  const metaText = `${article.categoryLabel.toUpperCase()}  •  ${article.state} (${article.city || 'Regional'})  •  ${article.publishedAt}`;
  doc.text(metaText, margin, cursorY);
  cursorY += 7;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  cursorY = addWrappedText(doc, article.title, margin, cursorY, contentWidth, 7);
  cursorY += 4;

  // Executive Summary Box
  doc.setFillColor(241, 245, 249); // slate-100
  const summaryLines = doc.splitTextToSize(article.summary, contentWidth - 10);
  const summaryBoxHeight = summaryLines.length * 5 + 8;
  doc.roundedRect(margin, cursorY, contentWidth, summaryBoxHeight, 2, 2, 'F');
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  addWrappedText(doc, article.summary, margin + 5, cursorY + 6, contentWidth - 10, 5);
  cursorY += summaryBoxHeight + 8;

  // Key Points / Destaques
  if (article.keyPoints && article.keyPoints.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('Destaques & Indicadores Chave:', margin, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 41, 59);

    article.keyPoints.forEach((point) => {
      if (cursorY > 270) {
        doc.addPage();
        cursorY = 20;
      }
      doc.setFillColor(234, 88, 12); // orange-600 bullet
      doc.circle(margin + 2, cursorY - 1, 1, 'F');
      cursorY = addWrappedText(doc, point, margin + 6, cursorY, contentWidth - 8, 5);
      cursorY += 2;
    });
    cursorY += 5;
  }

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 7;

  // Article Full Content
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);

  const paragraphs = article.content.split('\n\n');
  paragraphs.forEach((p) => {
    if (p.trim()) {
      cursorY = addWrappedText(doc, p.trim(), margin, cursorY, contentWidth, 5.5);
      cursorY += 4;
    }
  });

  // Source & Citation Box at Bottom
  if (cursorY > 250) {
    doc.addPage();
    cursorY = 20;
  } else {
    cursorY += 4;
  }

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, cursorY, contentWidth, 18, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('FONTE & VERIFICAÇÃO GOOGLE SEARCH GROUNDING:', margin + 4, cursorY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text(`Fonte: ${article.source} | Tags: ${article.tags.join(', ')}`, margin + 4, cursorY + 11);
  doc.setTextColor(37, 99, 235);
  doc.text(`Acesse a matéria original: ${article.sourceUrl.substring(0, 80)}...`, margin + 4, cursorY + 15);

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Nordeste Hoje - Notícias & Economia • Página ${i} de ${totalPages}`,
      margin,
      288
    );
  }

  const safeTitle = article.title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .slice(0, 35);
  doc.save(`noticia-nordeste-${safeTitle}.pdf`);
}

/**
 * Export a compiled briefing dossier of multiple selected/filtered news articles
 */
export function exportDossierToPdf(articles: NewsArticle[], title: string = 'Dossiê Diário do Nordeste') {
  if (articles.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 20;

  // Cover / Header Banner
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, cursorY, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('NORDESTE HOJE - RELATÓRIO EXECUTIVO DIÁRIO', margin + 6, cursorY + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`${title} • Compilado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`, margin + 6, cursorY + 18);
  cursorY += 32;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(194, 65, 12);
  doc.text(`TOTAL DE NOTÍCIAS SELECIONADAS: ${articles.length}`, margin, cursorY);
  cursorY += 8;

  articles.forEach((art, index) => {
    if (cursorY > 230) {
      doc.addPage();
      cursorY = 20;
    }

    // Number & Category Badge
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, cursorY, contentWidth, 8, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${index + 1}. [${art.categoryLabel.toUpperCase()}] - ${art.state} (${art.city || 'Regional'}) - ${art.publishedAt}`, margin + 3, cursorY + 5.5);
    cursorY += 12;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    cursorY = addWrappedText(doc, art.title, margin, cursorY, contentWidth, 5.5);
    cursorY += 3;

    // Summary
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    cursorY = addWrappedText(doc, art.summary, margin, cursorY, contentWidth, 4.8);
    cursorY += 3;

    // Key bullets
    if (art.keyPoints && art.keyPoints.length > 0) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      art.keyPoints.slice(0, 2).forEach((kp) => {
        doc.text(`• ${kp}`, margin + 3, cursorY);
        cursorY += 4.5;
      });
    }

    // Source
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`Fonte: ${art.source} | Link: ${art.sourceUrl.substring(0, 60)}...`, margin, cursorY);
    cursorY += 8;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 8;
  });

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Nordeste Hoje • Dossiê Executivo de Notícias • Página ${i} de ${totalPages}`,
      margin,
      288
    );
  }

  doc.save(`dossie-noticias-nordeste-${new Date().toISOString().split('T')[0]}.pdf`);
}
