import * as React from "react";
import styles from "./index.module.css";

interface State {
    image: string | ArrayBuffer | File | null;
}

export const Preview = () => {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const displayRef = React.useRef<HTMLImageElement>(null);

    const [appState, setAppState] = React.useState<State>({
        image: null,
    });

    React.useEffect(() => {
        console.log("STATE UPDATE", appState.image)
    }, [appState.image])

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
    
    return (
        <section className={styles.preview}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <figure className={styles.prevFig}>
                <img className={styles.prevImage} ref={displayRef} src="" alt="The uploaded image" />
                <figcaption  className={styles.prevCaption}>

                </figcaption>
            </figure>

            {!appState.image ?
                <div className={styles.prevUpload}>
                    <label className={styles.prevLabel} htmlFor="meme">Drag and drop your image here</label>
                    <input ref={uploadRef} className={styles.prevInput} type="file" id="meme" name="meme" accept="image/*" onChange={handleChange} />
                    <button className={styles.prevButton} type="button" onClick={handleClick}>Choose File</button>
                </div> 
                : null
            }
        </section>
    )
}