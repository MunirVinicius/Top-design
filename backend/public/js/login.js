const form = document.getElementById('form-login')

form.addEventListener('submit', loginUser)

async function loginUser(event){
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const result = await fetch('/userLogin', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res)=>res.json())
}