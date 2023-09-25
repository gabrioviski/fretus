const input = document.querySelectorAll(".input__field");
const inputIcon = document.querySelectorAll(".input__icon");


inputIcon.forEach(item => {
    item.addEventListener("click", (e) => {
    
        e.preventDefault();
    
        item.setAttribute(
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
})


