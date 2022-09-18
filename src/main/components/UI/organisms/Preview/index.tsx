import * as React from "react";
import { useHook } from "./index.hook";
import styles from "./index.module.css";



export const Preview = () => {
    const {uploadRef, displayRef, handleDrag, handleDrop, handleClick, handleChange, appState} = useHook();
  
    // resize image to fit automatically
    // user chooses the dimension they want for the image (aut-fix with out default format, original_image dimensions, updated image dimensions)
    
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