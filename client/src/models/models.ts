export interface ServerResponce<T> {
    total_count: number
    incomplete_results: boolean
    items: T[]
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