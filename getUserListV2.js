import http from 'k6/http';
import { check } from 'k6';
import { Smoke } from "./options.js";

export let options = Smoke;

export default function () {
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

    // Check if the login was successful (status code 200)
    check(loginRes, {
        'login status was 200': (r) => r.status === 200,
    });

    // Extract the token from the login response
    let token = JSON.parse(loginRes.body).token;

    if (token) {
        // Set the token as a Bearer token for the subsequent request
        params.headers['Authorization'] = `Bearer ${token}`;

        // Make the request to the /auth/users endpoint using the token for authentication
        let usersUrl = 'https://dummyjson.com/auth/users';
        let usersRes = http.get(usersUrl, params);

        // Check if the users request was successful
        check(usersRes, {
            'users status was 200': (r) => r.status === 200,
        });
    }
}
