import Swal from 'sweetalert2'



// Configuring global toast notifications using Swal.mixin
export const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
  