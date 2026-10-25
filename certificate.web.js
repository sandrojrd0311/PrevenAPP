/* Versión WEB del certificado: genera un PDF real y lo descarga directo.
   (window.print() no funciona bien en navegadores de celular.) */
import { jsPDF } from 'jspdf';

const fechaLarga = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (_) {
    return String(iso);
  }
};

export async function downloadCertificate({
  nombre,
  cedula,
  courseTitle,
  courseCode,
  nota,
  fecha,
  intento,
}) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297;
  const cx = W / 2;
  const blue = [11, 92, 173];
  const ink = [16, 27, 46];
  const sub = [61, 75, 102];

  // Marcos
  doc.setDrawColor(...blue);
  doc.setLineWidth(1.8);
  doc.rect(10, 10, 277, 190);
  doc.setDrawColor(0, 168, 204);
  doc.setLineWidth(0.4);
  doc.rect(14, 14, 269, 182);

  const center = (txt, y, size, style = 'normal', color = ink) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.text(txt, cx, y, { align: 'center' });
  };

  center('PREVENAPP · SISTEMA SST', 34, 13, 'bold', blue);
  center('CERTIFICADO', 52, 38, 'bold');
  center('de aprobación de evaluación', 62, 13, 'normal', sub);

  center('Se certifica que', 82, 13, 'normal', sub);

  // Nombre (se reduce si es muy largo)
  let size = 30;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(size);
  while (doc.getTextWidth(String(nombre)) > 230 && size > 14) {
    size -= 2;
    doc.setFontSize(size);
  }
  center(String(nombre), 98, size, 'bold');
  doc.setDrawColor(...blue);
  doc.setLineWidth(0.6);
  doc.line(cx - 90, 102, cx + 90, 102);
  center(`C.C. ${cedula}`, 110, 12, 'normal', sub);

  center('aprobó la evaluación del curso', 128, 13, 'normal', sub);
  const curso = courseCode ? `${courseTitle} (${courseCode})` : String(courseTitle);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  const lines = doc.splitTextToSize(curso, 230);
  doc.setTextColor(...blue);
  doc.text(lines, cx, 140, { align: 'center' });

  center(
    `Calificación: ${nota} %  ·  Intento N.º ${intento}  ·  ${fechaLarga(fecha)}`,
    140 + lines.length * 8 + 6,
    12,
    'normal',
    sub
  );

  // Firmas
  doc.setDrawColor(...ink);
  doc.setLineWidth(0.4);
  doc.line(45, 180, 115, 180);
  doc.line(182, 180, 252, 180);
  doc.setFontSize(10);
  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'normal');
  doc.text('Coordinación SST', 80, 185, { align: 'center' });
  doc.text('PrevenApp · Centro INCA', 217, 185, { align: 'center' });

  const safe = String(nombre).replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 40);
  doc.save(`Certificado_${safe}.pdf`);
}
