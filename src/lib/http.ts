const BASE_URL = "http://localhost:3000";
const http = {
    get: (url:string, query:string) =>{
        return fetch(`${BASE_URL}${query}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}