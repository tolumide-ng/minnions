import * as React from "react";

interface State {
    image: string | ArrayBuffer | File | null;
}

export const useHook = () => {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const displayRef = React.useRef<HTMLImageElement>(null);

    const [appState, setAppState] = React.useState<State>({
        image: null,
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(uploadRef.current) {
            uploadRef.current.click();
        }
    }

    const handlePreview = (file: File) => {

    }

    const handleFile = (file: File) => {
        const img = displayRef.current;

        const reader = new FileReader();
        // validate size if necessary
        reader.addEventListener("load", () => {
            setAppState((state) => ({...state, image: reader.result }));

            img!.src = URL.createObjectURL(file);

            img!.onload = () => {
                URL.revokeObjectURL(img!.src);
            }
        })
        reader.readAsDataURL(file);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        e.preventDefault();

        handleFile(e.target.files![0]);
    }
  
    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();

        handleFile(e.dataTransfer.files[0]);
    }

    const handleDrag = (e: React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
    }

    return {
        uploadRef,
        displayRef,
        appState,
        handleChange,
        handleDrop,
        handleDrag,
        handleClick,
    }

}