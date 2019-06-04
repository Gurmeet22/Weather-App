console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const locationButton = document.getElementById('location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            }
        })
    })
})

locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    navigator.geolocation.getCurrentPosition((position) => {
        fetch('/weather1?lat=' + position.coords.latitude + '&long=' + position.coords.longitude).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error;
                }
                else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                }
            })
        })
    })
})




