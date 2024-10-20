export  async function pOSTRequest(formData, endPoint){
    try {
        const response = await fetch(endPoint, {
          method: 'POST',
          body: formData,
        });

        const responseJson =  await response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error) {
        return {success: false, msg: response.msg};
    }
   
}

export  async function uPDATErequest(formData, endPoint){
    try {
        const response = await fetch(endPoint, {
          method: 'PUT',
          body: formData,
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error) {
        return {success: false, msg: response.msg};
    }

}

export  async function dELETErequest(formData, endPoint){
    const token = localStorage.getItem('token')
    try {
        const response = await fetch(endPoint, {
          method: 'DELETE',
          headers: {
            'Authorization': `${token}`
            },
          body: formData,
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            return {success: false, msg: 'Response not OK'};
        }

    } catch (error) {
        return {success: false, msg: response.msg};
    }
}

export  async function getRequest(endPoint){

    try {
        const response = await fetch(endPoint, {
            method: 'GET',
        });

        const responseJson = response.json()

        if (response.ok) {
            return responseJson
        } else {
            throw new Error('Response not OK')
        }

    } catch (error) {
        throw new Error(error.message)
    }
}