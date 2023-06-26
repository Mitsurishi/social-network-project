import { FC, PropsWithChildren } from "react"
import { Navbar } from "./Navbar"
import { LeftSideBar } from "./LeftSideBar"

export const PageWrapper: FC<PropsWithChildren> = (props) => {
    return (
        <>
            <Navbar />
            <div className='bg-gray-900 pt-[60px] min-h-screen'>
                <div className='py-4'>
                    <div className='container mx-auto'>
                        <LeftSideBar />
                    </div>
                    <div className='container flex pl-[164px] mx-auto text-white'>
                        <div className='w-full'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
