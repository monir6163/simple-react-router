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
    const [imageName, setImageName] = useState([]);
    useEffect(() => {
        const check = imageName.includes(file?.name);
        if (check) {
            alert("File already exists");
            setFile(null);
            deleteImage(url);
            return;
        } else {
            const uploadFile = () => {
                const storageRef = ref(storage, `profile/${file?.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
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
                                // console.log(downloadUrl);
                                setUrl((prev) => [...prev, downloadUrl]);
                            }
                        );
                    }
                );
            };

            file && uploadFile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file, imageName]);

    //firbase image get

    useEffect(() => {
        const imagesListRef = ref(storage, "profile/");
        // console.log(imagesListRef);
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                // console.log(item);
                getDownloadURL(item).then((url) => {
                    const https = ref(storage, url);
                    setImageName((prev) => [...prev, https?.name]);
                    setUrl((prev) => [...prev, url]);
                });
            });
        });
    }, []);
    // firebase image delete
    console.log(url);
    const deleteImage = async (url) => {
        const storageRef = ref(storage, url);
        if (storageRef) {
            await deleteObject(storageRef)
                .then(() => {
                    setUrl((prev) => prev.filter((item) => item !== url[0]));
                    alert("Image deleted successfully");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert("Image not found");
        }
    };

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
