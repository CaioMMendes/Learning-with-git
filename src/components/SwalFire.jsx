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
    scrollbarPadding: false,
    showConfirmButton: false,
  });
  return;
};

export const SwalFireConfirm = (confirmButtonText) => {
  // const confirmButtonClasses = "!px-4 !py-2 !bg-slate-500 !text-black !rounded-md";
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#7fff00",
    cancelButtonColor: "#d33",
    confirmButtonText: `<span class=" !font-bold !-bg--verde !-text--navbarBackground !w-full !h-full ">${confirmButtonText}</span>`,
    cancelButtonText: `<span class=" !font-bold !-text--navbarBackground">Cancel</span>`,
    scrollbarPadding: false,
  });
};
// .swalFireConfirm {
//   color: #242424 !important;
//   background-color: var(--verde) !important;
//   font-weight: bold;
//   border: 1px solid #242424 !important;
// }
