import { postFetch } from "../../utils/fetch";
import Models from "src/models";
import { baseUrl } from "src/consts";

const type = "users";

const API = {
    register: (body: Models.Form) => {
        return postFetch(
            `${baseUrl}/${type}/register`,
            "",
            body
        );
    },
    verify: (body: Models.Step1) => {
        return postFetch(
            `${baseUrl}/${type}/verifyemail`,
            "",
            body
        );
    }
};

export default API;