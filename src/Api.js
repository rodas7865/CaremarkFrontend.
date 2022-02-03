const   BASE_URL = 'https://caremark.herokuapp.com/'

export default {
    
  
    getUsers: async function(body){
        let response = await fetch(BASE_URL+'users/',{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER '+ localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    getUser: async function(id){
        let response = await fetch(BASE_URL+'users/'+id,{
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER '+ localStorage.getItem('token')
            }
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    postUser: async function(body){
        let response = await fetch(BASE_URL+'users/',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER '+ localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    putUser: async function(body){
        let response = await fetch(BASE_URL+'users/',{
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER '+ localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    patchUser: async function(body,id){
        let response = await fetch(BASE_URL+'users/'+id,{
            method:'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER '+ localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    deleteUser: async function(id){
        let response = await fetch(BASE_URL+'users/'+id,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER ' + localStorage.getItem('token')
            }
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    deleteUsers: async function(body){
        let response = await fetch(BASE_URL+'users/',{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER ' + localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
    loginUser: async function(body){
        let response = await fetch(BASE_URL+'users/login',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'BEARER ' + localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = response.headers.get('Authorization')

        console.log(data)
        localStorage.setItem('token',data)
        return data
    },
    registerUser: async function(body){
        let response = await fetch(BASE_URL+'users/register',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'BEARER ' + localStorage.getItem('token')
            },
            body:JSON.stringify(body)
        })
        let data = (response.status===403)?(await response.text()):(await response.json())

        return data
    },
 
        getEscalas: async function(body){
            let response = await fetch(BASE_URL+'escala/',{
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER ' + localStorage.getItem('token')
                },
                body:JSON.stringify(body)
            })
            let data = (response.status===403)?(await response.text()):(await response.json())

            return data
        },
        getEscala: async function(id){
            let response = await fetch(BASE_URL+'escala/'+id,{
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER ' + localStorage.getItem('token')
                }
            })
            let data = (response.status===403)?(await response.text()):(await response.json())

            return data
        },
        postEscala: async function(body){
            let response = await fetch(BASE_URL+'escala/',{
                method:'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER '+ localStorage.getItem('token')
                },
                body:JSON.stringify(body)
            })
            let data = (response.status===403||500)?(await response.text()):(await response.json())

            return data
        },
        putEscala: async function(body){
            let response = await fetch(BASE_URL+'escala/',{
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER '+ localStorage.getItem('token')
                },
                body:JSON.stringify(body)
            })
            let data = (response.status===403)?(await response.text()):(await response.json())

            return data
        },
        patchEscala: async function(body,id){
            let response = await fetch(BASE_URL+'escala/' + id,{
                method:'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER '+ localStorage.getItem('token')
                },
                body:JSON.stringify(body)
            })
            let data = (response.status===403)?(await response.text()):(await response.json())

            return data
        },
        deleteEscala: async function(id){
            let response = await fetch(BASE_URL+'escala/' + id,{
                method:'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER '+ localStorage.getItem('token')
                }
            })
            let data = await response.text()

            return data
        },
        deleteEscalas: async function(body){
            let response = await fetch(BASE_URL+'escala/',{
                method:'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER '+ localStorage.getItem('token')
                },
                body:JSON.stringify(body)
            })
            let data = (response.status===403)?(await response.text()):(await response.json())

            return data
        }
    }
