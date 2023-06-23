import React, { FC, useRef } from 'react';
import { toast } from 'react-toastify';

interface FileUploadProps {

    setFile?: Function;

    accept: string;

    children: React.ReactNode;

}

const FileUpload: FC<FileUploadProps> = ({ setFile, accept, children }) => {

    const ref = useRef<HTMLInputElement>(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && setFile) {
            setFile(e.target.files[0]);
            toast.success('Picture set successfully. If you want to change it, click on button again.')
        }
    }
    return (
        <div onClick={() => ref.current?.click()}>
            <input
                type='file'
                accept={accept}
                className='hidden'
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );

};

export default FileUpload;