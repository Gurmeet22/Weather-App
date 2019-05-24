console.log('Client side javascript file is loaded!')

fetch('/weather?address=Jamshedpur').then((response) => {
    response.json().then((data) => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    })
}).catch(error => {
    console.log(error)
})