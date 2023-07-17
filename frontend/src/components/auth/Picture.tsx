"use client";

import { useRef, useState } from "react";

type Props = {
  readablePicture: string;
  setPicture: any;
  setReadablePicture: React.Dispatch<React.SetStateAction<string>>;
};

export default function Picture({
  readablePicture,
  setPicture,
  setReadablePicture,
}: Props) {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pic: File = e.target.files![0];
    if (
      pic.type !== "image/png" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024) {
      // 1024 * 1024 => 1 mb
      setError(`${pic.name} size is too large, maximum 1mb allowed`);
      return;
    } else {
      setError("");
      setPicture(pic);
      //reading the picture
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target?.result as string);
      };
    }
  };

  const handleRemovePic = () => {
    setPicture("");
    setReadablePicture("");
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <img
            src={readablePicture}
            alt="picture"
            className="w-20 h-20 object-cover rounded-full"
          />
          <div
            className="w-20 mt-2 py-1 dark:bg-dark_bg_3 text-xs rounded-md flex justify-center items-center cursor-pointer"
            onClick={handleRemovePic}
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex justify-center items-center cursor-pointer"
          onClick={() => {
            if (inputRef.current) inputRef.current.click();
          }}
        >
          Upload picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handlePicture}
      />
      {/* error */}
      {error && (
        <div className="mt-2">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
