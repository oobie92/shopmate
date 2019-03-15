
export const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if(!response.ok) {
            if(response.status === 401){
                //pendient
            }

            if(response.status === 404){
                return Promise.resolve([])
            }

            const error = (data && data.message) || response.statusText 
            return Promise.reject(error)
        }

        return data
    })

}