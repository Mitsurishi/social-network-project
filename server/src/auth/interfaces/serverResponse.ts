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