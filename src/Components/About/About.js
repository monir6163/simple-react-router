import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../firebase";

const About = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    console.log(file);
    console.log(progress);
    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, `profile/${file?.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setProgress(progress);
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadUrl) => {
                            alert("Image upload to firebase successfully");
                            console.log(downloadUrl);
                        }
                    );
                }
            );
        };

        file && uploadFile();
    }, [file]);

    return (
        <div>
            <h3>this about page </h3>
            <div>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="col-12 py-3 text-center">
                    <button
                        className="btn btn-add"
                        type="submit"
                        disabled={progress !== null && progress < 100}
                    >
                        {/* {id ? "Update" : "Submit"} */}
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
