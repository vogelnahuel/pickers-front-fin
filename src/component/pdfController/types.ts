import React from "react";

export type PdfControllerProps = {
  fileLoaded: boolean;
  children: React.ReactNode;
  fileHandler: (file: File) => void;
  showError?: boolean;
  title: string;
  buttonText: string;
  errorMessage?: string;
}