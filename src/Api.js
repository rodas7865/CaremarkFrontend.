const BASE_URL = 'https://caremark.herokuapp.com/'

export async function loginUser(body) {
    
    let response = await fetch(BASE_URL+'users/login',{
        
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
        
    })
    console.log("estou aqui")
    let data = await response.header('authorization')

    localStorage.setItem('authorization',data)
    return data
}

