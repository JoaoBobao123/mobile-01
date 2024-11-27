const BASE_URL = 'http://localhost:5237/api/Tasks'

export const getRequest = async () => {
    try {

        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`GET request failed with status ${response.status}`);
        }

        const textData = await response.text();
        const data = JSON.parse(textData);
        console.log(data)
        return data;
        
    } catch (error) {
        console.error(error)
        throw error;

        //TRATATIVA DO ERRO
        
    }
}