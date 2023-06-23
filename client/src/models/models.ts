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

    friends: number[];

    createdAt: Date;

    updatedAt: Date;

}

export interface IPost {

    id: number;

    userId: number;

    firstName: string;

    lastName: string;

    userPicturePath: string;

    content?: string;

    postPicturePath?: string;

    likes: number[];

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