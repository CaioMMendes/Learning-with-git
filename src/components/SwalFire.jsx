import React from "react";
import Swal from "sweetalert2";

export const SwalFire = (title, icon, timer, showConfirmButton) => {
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

export const SwalFireConfirm = (confirmButtonText, mensagem1, mensagem2) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(mensagem1, mensagem2, "success");
    }
  });
};
