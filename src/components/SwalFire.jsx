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

export const SwalFireTextInput = (confirmButtonText) => {
  return Swal.fire({
    title: "Are you sure?",
    html: "<span>You won't be able to revert this!</span></br><span>Write <strong>delete</strong> to delete your account!</span>",
    icon: "warning",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
      autofocus: true,
    },
    showCancelButton: true,
    confirmButtonColor: "#7fff00",
    cancelButtonColor: "#d33",
    confirmButtonText: `<span class=" !font-bold !-bg--verde !-text--navbarBackground !w-full !h-full ">${confirmButtonText}</span>`,
    cancelButtonText: `<span class="  !font-bold !-text--navbarBackground">Cancel</span>`,
    //todo não consegui colocar borda no input, só sei fazer se não for com tailwind
    // customClass: {
    //   input: "swal2-input border-black",
    // },
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      if (login !== "delete") {
        // return alert("Palavra incorreta");
        return Swal.showValidationMessage("Palavra incorreta");
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });
};

// fetch(`//api.github.com/users/${login}`)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//     Swal.showValidationMessage(`Request failed: ${error}`);
//   });
