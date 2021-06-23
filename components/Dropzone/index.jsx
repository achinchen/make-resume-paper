import styles from '../styles/Home.module.scss';
import Dropzone from 'react-dropzone';

export default function Drop() {
  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  };

  return (
    <Dropzone onDrop={onDrop} accept="application/json">
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <div
          {...getRootProps()}
          className={`${styles.dropzone} ${
            isDragActive && !isDragReject ? styles.active : ''
          }`}
        >
          <input {...getInputProps()} />
          {`🗂    `}
          {!isDragActive && `Click here or drop a file to upload!`}
          {isDragActive && !isDragReject && `Drop it like it's hot!`}
          {isDragReject && `File type not accepted, sorry!`}
        </div>
      )}
    </Dropzone>
  );
}
