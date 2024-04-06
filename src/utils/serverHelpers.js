import { backendUrl } from "./config";

export const makeUnautenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAutenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
};

export const makeAuthenticatedGETRequest = async(route,body)=>{
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}

function getToken() {
    const cookies = document.cookie.split(';'); // Split all cookies into an array
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('='); // Split cookie into name and value
        if (name === 'token') { // Assuming the token cookie is named 'token'
            return value; // Return the value of the token cookie
        }
    }
    return null; // Return null if token cookie is not found
}