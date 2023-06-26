import { AuthForm } from "../components/AuthForm"

export const AuthPage = () => {

    return (
        <section className='flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <div className='h-full flex justify-center items-center'>
                <AuthForm />
            </div>
        </section>
    )

}
