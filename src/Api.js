const   BASE_URL = 'https://caremark.herokuapp.com'

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
        let data = await response.json()

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
        let data = await response.json()

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
        let data = await response.json()

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
        let data = await response.json()

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
        let data = await response.json()

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
        let data = await response.json()

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
        let data = await response.json()

        return data
    },
    loginUser: async function(body){
        let response = await fetch(BASE_URL+'users/login',{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        })
        let data = await response.header('authorization')

        localStorage.setItem('authorization',data)
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
        let data = await response.json()

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
            let data = await response.json()

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
            let data = await response.json()

            return data
        },
        postEscala: async function(body){
            let response = await fetch(BASE_URL+'escala/',{
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': 'BEARER '+ localStorage.getItem('token')
                },
                body:JSON.stringify(body)
            })
            let data = await response.json()

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
            let data = await response.json()

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
            let data = await response.json()

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
            let data = await response.json()

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
            let data = await response.json()

            return data
        }
    }
