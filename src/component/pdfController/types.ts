import React from "react";

export type PdfControllerProps = {
  fileUploaded: boolean;
  children: React.ReactNode;
  showError?: boolean;
  title: string;
  buttonText: string;
  errorMessage?: string;
  loading?: boolean;
  fileHandler: (file: File) => void;
  goToPreviousFile?: () => void;
}