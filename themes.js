/**
 * themes.js — Cambia los logos de Oviedo RP según theme.json
 * Edita theme.json y pon el nombre de la estación/festividad:
 *   "verano" | "primavera" | "otoño" | "halloween" | "navidad" | "invierno"
 * Si no existe o es inválido, se usa logo.png por defecto.
 */
(function () {
  const DEFAULT = "logo.png";
  const VALID = ["verano", "primavera", "otoño", "halloween", "navidad", "invierno"];

  function setLogos(src) {
    document.querySelectorAll("img[data-logo]").forEach(function (img) {
      img.src = src;
    });
  }

  // Valor por defecto inmediato para evitar flash
  setLogos(DEFAULT);

  fetch("theme.json", { cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error("theme.json no encontrado");
      return r.json();
    })
    .then(function (data) {
      var theme = (data && data.theme) ? String(data.theme).toLowerCase().trim() : "";
      if (VALID.indexOf(theme) !== -1) {
        setLogos("logo-" + theme + ".png");
      } else {
        setLogos(DEFAULT);
      }
    })
    .catch(function () {
      setLogos(DEFAULT);
    });
})();
