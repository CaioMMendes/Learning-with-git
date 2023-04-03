import React from "react";
import Swal from "sweetalert2";

const SwalFire = (title, icon, timer, showConfirmButton) => {
  Swal.fire({
    // customClass: `${styles.swal}`,
    icon: icon,
    title: title,
    width: 450,
    text: "",
    timer: timer,
    showCancelButton: showConfirmButton,
    showConfirmButton: false,
  });
  return;
};

export default SwalFire;
