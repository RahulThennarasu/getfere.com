export const DOWNLOAD_URL =
  "https://github.com/RahulThennarasu/getfere.com/releases/download/v0.1.0/fere.dmg";

export function triggerMacDownload() {
  window.location.assign(DOWNLOAD_URL);
}
