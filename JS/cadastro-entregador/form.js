const yes = document.querySelectorAll('.yes')
const no = document.querySelectorAll('.no')
const form = document.querySelectorAll('.form')
const container = document.querySelector('.popup-wrapper')

yes.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        /* if (isChecked(i)) { */
            e.preventDefault()
            removeClass()
            console.log(i);
            form[i + 1].classList.add('active')
            container.scrollLeft = (form[i].clientWidth * (i + 1)) + 7
        /* } */
    })
})
    
no.forEach((item, i) => {
    item.addEventListener('click', (e) => {
        e.preventDefault()
        removeClass()
        form[i].classList.add('active')
        container.scrollLeft = -(form[i].clientWidth + 7)
    })
})
    
const removeClass = () => {
    form.forEach(item => {
        item.classList.remove('active')
    })
}

const isChecked = (i) => {
    let valid = true
    Array.from(form[i].elements).forEach(field => {
        if (field.validity.valid == false) {
            valid = false
        }
    })
    return valid
}