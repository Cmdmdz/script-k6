import http from "k6/http";
import { sleep } from "k6";
import { Smoke } from "./options.js";

export let options = Smoke;

export default function () {
    // GET request
    let res = http.get("https://dummyjson.com/products");
    console.log(res.body);

    sleep(1); // sleep for 1 second

}
