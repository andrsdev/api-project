
async function request(url) {
    try{
        const response = await fetch(url);
        if (response.status !== 200) {
            return { 
                error:  "Couldn't make the request.",
                status: response.status
            };
        }
    
        const data = await response.json();
        return data;
    } catch (error){
        console.error(error);
    }
    
}

export default request;
