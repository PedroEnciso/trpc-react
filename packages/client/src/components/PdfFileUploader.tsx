import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadResources } from "src/http/uploadResources";
import type { NewResource } from "src/types";

function PdfFileUploader() {
  const [files, setFiles] = useState<NewResource[]>([]);

  const { isLoading, mutate } = useMutation({
    mutationFn: uploadResources,
  });

  const createDisplayName = (fileName: string) => {
    const split = fileName.split(".");
    return split[0];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (!target.files) return;

    const fileArray = Array.from(target.files);
    const fileObjects = fileArray.map((file) => ({
      displayName: createDisplayName(file.name),
      file: file,
    }));
    setFiles(fileObjects);
  };

  const handleRemoveFile = (name: string) => {
    setFiles((prevState) => {
      return prevState.filter((file) => file.file.name !== name);
    });
  };

  const handleFileNameUpdate = (fileName: string, newDisplayName: string) => {
    setFiles((prevState) => {
      return prevState.map((file) => {
        if (file.file.name === fileName) {
          return {
            ...file,
            displayName: newDisplayName,
          };
        } else {
          return file;
        }
      });
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(files);
  };

  return (
    <>
      <form className="px-8 py-8 max-w-4xl" onSubmit={(e) => handleSubmit(e)}>
        <h2>Upload files</h2>
        <div className="flex flex-col gap-4 mt-2">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file.file.name}
                className="flex px-4 py-2 bg-slate-100 rounded-md items-center gap-8"
              >
                <p>{file.file.name}</p>
                <input
                  type="text"
                  defaultValue={file.displayName}
                  onChange={(e) =>
                    handleFileNameUpdate(file.file.name, e.target.value)
                  }
                  className="px-2 py-1 w-96"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.file.name)}
                  className="py-1 px-3 text-sm rounded bg-red-500 text-white"
                >
                  remove
                </button>
              </div>
            ))
          ) : (
            <label className="underline cursor-pointer">
              Select files
              <input
                onChange={(e) => handleChange(e)}
                type="file"
                name="pdfFiles"
                accept="application/pdf"
                multiple
                disabled={files.length > 0}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="mt-8">
          <button
            disabled={files.length === 0 || isLoading}
            className="py-1 px-3 text-sm rounded bg-blue-500 text-white disabled:bg-blue-100"
          >
            {isLoading ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}

export default PdfFileUploader;
