const form = document.getElementById('form-register')

form.addEventListener('submit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const username = document.getElementById('username').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const result = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    }).then((res)=>res.json())


}