import React from "react";
import Swal from "sweetalert2";

const SwalFire = (title, icon) => {
  Swal.fire({
    // customClass: `${styles.swal}`,
    icon: icon,
    title: title,
    width: 450,
    text: "",
    timer: 2000,
    showCancelButton: false,
    showConfirmButton: false,
  });
  return;
};

export default SwalFire;
