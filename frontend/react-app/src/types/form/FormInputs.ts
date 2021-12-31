export type SignInFormInputs = {
    email: string;
    password: string;
}

export type SignUpFormInputs = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type UserProfileUpdate = {
    name: string;
    email: string;
}

export type EditPasswordUpdate = {
    password: string;
    passwordConfirmation: string;
}