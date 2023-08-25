import http from 'k6/http';
import { check, sleep } from 'k6';
import { Smoke } from "./options.js";

export let options = Smoke;

export function setup() {
    let loginUrl = 'https://dummyjson.com/auth/login';
    let payload = JSON.stringify({
        "username": "kminchelle",
        "password": "0lelplR"
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Perform the login request
    let loginRes = http.post(loginUrl, payload, params);

    // Extract the token from the login response
    let token = JSON.parse(loginRes.body).token;

    return { token: token };  // Return the token so it can be used in the main test
}

export default function (data) {
    let usersUrl = 'https://dummyjson.com/auth/users';

    // Set the token as a Bearer token
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`,
        },
    };

    // Make the request to the /auth/users endpoint using the token for authentication
    let usersRes = http.get(usersUrl, params);

    // Check if the users request was successful
    check(usersRes, {
        'users status was 200': (r) => r.status === 200,
    });

    sleep(2);
}
