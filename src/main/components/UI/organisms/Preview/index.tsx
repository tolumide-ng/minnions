import * as React from "react";
import styles from "./index.module.css";

export const Preview = () => {
    const uploadRef = React.useRef<HTMLInputElement>(null);
    const displayRef = React.useRef<HTMLImageElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(uploadRef.current) {
            uploadRef.current.click();
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const file = dt.files[0];

        const img = displayRef.current;

        if (img) {
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(img.src);
            }
        }
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

            <div className={styles.prevUpload}>
                <label className={styles.prevLabel} htmlFor="meme">Drag and drop your image here</label>
                <input ref={uploadRef} className={styles.prevInput} type="file" id="meme" name="meme" accept="image/*" />
                <button className={styles.prevButton} type="button" onClick={handleClick}>Choose File</button>
            </div>
        </section>
    )
}