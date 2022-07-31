import {
    deleteObject,
    getDownloadURL,
    listAll,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../firebase";
import "./About.css";
import Loader from "./loader.gif";

const About = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [url, setUrl] = useState([]);
    // console.log(file);
    // console.log(progress);
    // console.log(url);
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
                            setUrl((prev) => [...prev, downloadUrl]);
                        }
                    );
                }
            );
        };

        file && uploadFile();
    }, [file]);

    //firbase image get

    useEffect(() => {
        const imagesListRef = ref(storage, "profile/");
        // console.log(imagesListRef);
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                // console.log(item);
                getDownloadURL(item).then((url) => {
                    // console.log(url);
                    setUrl((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    // firebase image delete
    const deleteImage = async (url) => {
        const storageRef = ref(storage, url);

        await deleteObject(storageRef)
            .then(() => {
                setUrl((prev) => prev.filter((item) => item !== url));
                alert("Image deleted successfully");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        deleteImage();
    }, []);
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
            <br></br>
            {url.length === 0 ? (
                <div>
                    <img
                        style={{ width: "64px", height: "64px" }}
                        src={Loader}
                        alt=""
                    />
                </div>
            ) : (
                <div className="about">
                    {url.map((urls) => {
                        return (
                            <>
                                <div key={urls}>
                                    <img src={urls} alt="" />
                                    <div>
                                        <button
                                            onClick={() => deleteImage(urls)}
                                            className="btn btn-add"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default About;
