import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';


const FileSubmissionDrop = ({setFiles}) => {

	const onDrop = useCallback(acceptedFiles => {
		setFiles(acceptedFiles);
	}, []);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, multiple: false})

	return (
		<>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{
					isDragActive ?
						<p>Drop GPX files here</p> :
						<p>Drag and drop GPX files here, or click to select a file</p>
				}
			</div>
		</>
	);
};


export default FileSubmissionDrop;
