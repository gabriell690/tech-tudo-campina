import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface Props {
  onSelect: (files: File[]) => void;
}

export default function ImageUploader({
  onSelect,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onSelect(acceptedFiles.slice(0, 10));
    },
    [onSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 10,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2
        border-dashed
        rounded-3xl
        p-12
        transition
        cursor-pointer
        text-center
        ${
          isDragActive
            ? "border-orange-500 bg-orange-50"
            : "border-slate-300 hover:border-orange-400"
        }
      `}
    >
      <input {...getInputProps()} />

      <UploadCloud
        size={56}
        className="mx-auto text-orange-500"
      />

      <h3 className="mt-5 text-xl font-semibold">
        Arraste imagens aqui
      </h3>

      <p className="text-slate-500 mt-2">
        ou clique para selecionar
      </p>

      <p className="text-sm text-slate-400 mt-4">
        PNG • JPG • WEBP
      </p>

      <p className="text-sm text-slate-400">
        Até 10 imagens
      </p>
    </div>
  );
}