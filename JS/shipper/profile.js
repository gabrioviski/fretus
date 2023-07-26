const textarea = document.querySelector('textarea')
const count = document.querySelector('.count')
textarea.addEventListener('input', resize)
count.innerText = `${textarea.value.length}/200`
function resize(e) {
    textarea.style = `height: 48px;`
    let height = textarea.scrollHeight
    let value = textarea.value
    textarea.style = `height: ${height}px;`
    count.innerText = `${value.length}/200`
    count.style = 'color: #333;'
    if (value.length >= 200) {
        textarea.value = textarea.value.substring(0, 200)
        count.style = 'color: red;'
        return
    }
}