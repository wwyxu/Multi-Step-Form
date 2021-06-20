declare namespace Models {
    interface Step1{
        name: string;
        email: string;
    }

    interface Step2{
        password1: string;
        password2: string;
    }

    interface Form extends Step1, Step2 {
    }
};

export default Models;