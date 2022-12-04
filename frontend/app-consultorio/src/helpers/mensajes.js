import Swal from 'sweetalert2';

const mensaje = (icon, titulo) => {
    Swal.fire({
        icon: icon,
        title: titulo,
        showConfirmButton: true
    });
}

export default mensaje;