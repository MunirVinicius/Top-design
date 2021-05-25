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
    }).then(async (response)=>{
        const res = await response.json()
        if(!res.data){
            return console.log(res.error)
        }
        const login = await fetch ('/admin',{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'authorization': `${res.data}`
            },
        }).then((response)=>{
            // return window.location.href = 'http://localhost:3000/admin'
        })
    })
}