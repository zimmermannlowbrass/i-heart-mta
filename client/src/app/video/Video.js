import React from "react";
import video from "./Demo.mp4";

function Video() {
    return (
        <video loop={true} muted={true} autoPlay={true} width="700" height="700"  >
            <source src={video} type="video/mp4"/>
        </video>
    )
}

export default Video;