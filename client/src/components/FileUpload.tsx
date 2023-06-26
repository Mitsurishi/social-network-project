import React, { FC, useRef } from 'react';

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
        }
        if (e.target.files?.length === 0 && setFile) {
            setFile(null);
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