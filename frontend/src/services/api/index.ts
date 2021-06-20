import { postFetch } from "../../utils/fetch";
import Models from "src/models";

const API = {
    register: (body: Models.Form) => {
        return postFetch(
            "http://localhost:5000/users/register",
            "",
            body
        );
    },
    verify: (body: Models.Step1) => {
        return postFetch(
            "http://localhost:5000/users/verifyemail",
            "",
            body
        );
    }
};

export default API;