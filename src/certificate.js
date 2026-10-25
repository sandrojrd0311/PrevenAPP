import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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

/* HTML simple del certificado (A4 horizontal) */
export function buildCertificateHtml({ nombre, cedula, courseTitle, courseCode, nota, fecha, intento }) {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8" />
<style>
  @page { size: A4 landscape; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Helvetica, Arial, sans-serif; color: #101B2E; }
  .page { width: 100%; height: 100vh; padding: 28px; }
  .frame { height: 100%; border: 6px solid #0B5CAD; padding: 6px; }
  .inner { height: 100%; border: 1.5px solid #00A8CC; padding: 30px 50px; text-align: center;
           display: flex; flex-direction: column; justify-content: space-between; }
  .brand { font-size: 14px; letter-spacing: 4px; font-weight: 800; color: #0B5CAD; }
  h1 { margin: 6px 0 0; font-size: 40px; letter-spacing: 6px; }
  .sub { font-size: 14px; color: #3D4B66; }
  .name { font-size: 34px; font-weight: 800; border-bottom: 2px solid #0B5CAD; display: inline-block; padding: 0 24px 4px; }
  .id { font-size: 13px; color: #3D4B66; margin-top: 6px; }
  .course { font-size: 24px; font-weight: 800; color: #0B5CAD; }
  .meta { font-size: 13px; color: #3D4B66; }
  .sign { display: flex; justify-content: space-around; margin-top: 8px; }
  .sign div { width: 240px; border-top: 1.5px solid #101B2E; padding-top: 6px; font-size: 12px; }
</style></head><body>
<div class="page"><div class="frame"><div class="inner">
  <div>
    <div class="brand">PREVENAPP · SISTEMA SST</div>
    <h1>CERTIFICADO</h1>
    <div class="sub">de aprobación de evaluación</div>
  </div>
  <div>
    <div class="sub">Se certifica que</div>
    <div style="margin-top:10px"><span class="name">${esc(nombre)}</span></div>
    <div class="id">C.C. ${esc(cedula)}</div>
  </div>
  <div>
    <div class="sub">aprobó la evaluación del curso</div>
    <div class="course">${esc(courseTitle)}${courseCode ? ' (' + esc(courseCode) + ')' : ''}</div>
    <div class="meta" style="margin-top:8px">
      Calificación: <b>${esc(nota)} %</b> · Intento N.º ${esc(intento)} · ${esc(fechaLarga(fecha))}
    </div>
  </div>
  <div class="sign"><div>Coordinación SST</div><div>PrevenApp · Centro INCA</div></div>
</div></div></div>
</body></html>`;
}

/* Versión NATIVA (Android/iOS). La versión web está en certificate.web.js */
export async function downloadCertificate(data) {
  const html = buildCertificateHtml(data);

  const { uri } = await Print.printToFileAsync({ html, width: 842, height: 595 });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      UTI: 'com.adobe.pdf',
      dialogTitle: 'Certificado PrevenApp',
    });
  } else {
    throw new Error('Este dispositivo no permite compartir archivos.');
  }
}
