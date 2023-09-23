const input = document.querySelector(".input__field");
const inputIcon = document.querySelector(".input__icon");

inputIcon.addEventListener("click", (e) => {

    e.preventDefault();

    inputIcon.setAttribute(
        'src',
        input.getAttribute('type') === 'password' ?
            '../../imgs/login-cadastro/eye.svg'
            : '../../imgs/login-cadastro/eye-off.svg'
    );

    input.setAttribute(
        'type',
        input.getAttribute('type') === 'password' ?
            'text'
            :
            'password'
    );
});


