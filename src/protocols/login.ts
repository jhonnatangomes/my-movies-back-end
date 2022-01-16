interface Login {
    email: string;
    password: string;
}

interface SignUp extends Login {
    name: string;
}

export { SignUp, Login };
