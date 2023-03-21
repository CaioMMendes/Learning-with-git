export function dataURItoFile(dataURI, fileName) {
  if (dataURI == "") {
  } else {
    const byteString = atob(dataURI.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {
      type: "image/png",
    });
    return new File([blob], fileName, {
      type: "image/png",
    });
  }
}
