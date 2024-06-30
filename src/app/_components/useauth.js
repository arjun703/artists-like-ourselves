// useAuth.js
'use client'
import jwt from 'jsonwebtoken';


function getCookie(name) {

    if(typeof document === 'undefined'){
        return false;
    }

    if(!document){
        return false;
    }
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}


function getUserNameFromToken() {
    const myCookie = getCookie('token');
    if(!myCookie) return false 

    const parts = myCookie.split('.');
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    if(payload && payload.email !== undefined){
      return  payload.email
    }else{
      return false
    }

}

export default getUserNameFromToken;
