import type { FC } from "react";
import Dropzone, { type Accept } from "react-dropzone";

interface DropzoneWrapperProps {
  title?: string;
  multiple?: boolean;
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Accept;
  children?: React.ReactNode;
}
const uploadIcon = (
  <svg
    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 16"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
    />
  </svg>
);

const DropzoneWrapper: FC<DropzoneWrapperProps> = ({
  multiple,
  onDrop,
  accept,
  children,
  title,
}) => {
  return (
    <div>
      <Dropzone accept={accept} multiple={multiple} onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section className="dropzone">
            {title && <h3 className="mb-4">{title}</h3>}
            <div
              className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {uploadIcon}
              <div className="text-center text-sm text-gray-400">
                Drag 'n' drop some files here, or click to select files
              </div>
            </div>
            {!isDragActive && <div>{children}</div>}
          </section>
        )}
      </Dropzone>
    </div>
  );
};
export default DropzoneWrapper;
