export interface ServerResponce {

    payload: Payload;

    tokens: Tokens;

}

export interface Payload {

    id: number;

    email: string;

    firstName: string;

    lastName: string;

}

export interface Tokens {

    access_token: string;

    refresh_token: string;

}

export interface IUser {

    id: number;

    email: string;

    password: string;

    isActivated: boolean;

    activationLink: string;

    firstName: string;

    lastName: string;

    age: string;

    occupation: string;

    profilePicturePath: string;

}

export interface IRegistration {

    email: string;

    password: string;

    firstName: string;

    lastName: string;

    age: string;

    occupation: string;

    file: File;

}

export interface ILogin {

    email: string;

    password: string;

}