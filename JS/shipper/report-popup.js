const reportCall = document.querySelectorAll('.report-call')
const reportPopup = document.querySelector('.popup.report')
const closeReport = document.querySelector('.popup.report .close')
const inputs = document.querySelectorAll('.report .field')
const inputFile = document.querySelectorAll('input[type="file"]')
const labelFile = document.querySelectorAll('.file-field .msg')
const reportSubmit = document.querySelector('.report .cta')

reportCall.forEach(item => {
    item.addEventListener('click', () => {
        reportPopup.classList.add('show')
    })
})

closeReport.addEventListener('click', () => {
    reportPopup.classList.remove('show')
    labelFile[0].textContent = 'Foto do Ocorrido'
    // closeReport.remove()
})

reportSubmit.addEventListener('click', (e) => {
    if (isValid()) { 
        e.preventDefault()
    }
})

inputFile.forEach((input, i) => {
    input.addEventListener('change', () => {
        if (input.files[0]) {
            labelFile[i].textContent = `${input.files[0].name}`
        } else {
            labelFile[i].textContent = `Nenhum arquivo enviado!`
        }
    })
})

const isValid = () => {
    let valid = true
    inputs.forEach(item => {
        if (item.validity.valid == false) {
            valid = false
        }
    })
    return valid
}