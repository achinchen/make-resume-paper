export const SUPPORTED_TYPES = {
  json: 'application/json',
  html: 'text/html',
  pdf: 'application/pdf'
};

export default async function promptDownload(content, type) {
  const downloadUrl = window.URL.createObjectURL(
    new Blob([content], { type: SUPPORTED_TYPES[type] })
  );
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.target = '_blank';
  a.download = `resume.${type}`;
  document.body.appendChild(a);

  a.click();
  setTimeout(function () {
    URL.revokeObjectURL(downloadUrl);
  }, 100);
}
