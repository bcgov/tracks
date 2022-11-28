import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { Typography, Box } from '@mui/material';


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
					isDragActive ? (
						<Box>
							<Box style={{backgroundColor: 'rgba(134, 142, 150, 0.05)', padding: 25, borderRadius: 5}}>
								<Typography style={{textAlign: 'center'}}>Drag and drop GPX files here, or click to select a file</Typography>
							</Box>
						</Box>
					) : (
						<Box>
							<Box style={{backgroundColor: 'rgba(134, 142, 150, 0.05)', padding: 25, borderRadius: 5}}>
								<Typography style={{textAlign: 'center'}}>Drop a GPX file here, or click to select a file</Typography>
							</Box>
						</Box>
					)
				}
			</div>
		</>
	);
};


export default FileSubmissionDrop;
