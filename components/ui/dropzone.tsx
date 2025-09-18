"use client";

import React, {useCallback} from "react";
import Image from "next/image";
import {useDropzone} from "react-dropzone";
import {convertFileToUrl} from "@/lib/utils";

export type DropzoneProps = {
  id?: string;
  files: File[];
  onChange: (acceptedFiles: File[]) => void;
};

export function Dropzone(props: DropzoneProps) {
  const {onChange} = props;
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange],
  );
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="file-upload"
    >
      <input
        id={props.id}
        {...getInputProps()}
      />
      {!props.files?.length && (
        <React.Fragment>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span>
              or drag and drop
            </p>
            <p>SVG, PNG, JPG or Gif (max 800⨉400)</p>
          </div>
        </React.Fragment>
      )}
      {props.files?.map((file) => (
        <Image
          key={file.name}
          src={convertFileToUrl(file)}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ))}
    </div>
  );
}
