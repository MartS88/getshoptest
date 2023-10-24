import React, { useEffect, useRef } from 'react';

const MyVideoComponent = () => {
    const videoId = 'M7FIvfx5J10';

    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        if (iframeRef.current){
            iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }

    }, [videoId]);

    return (
        <div>
            <iframe
                title="YouTube Video"
                width="1280"
                height="720"
                ref={iframeRef}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default MyVideoComponent;





//
// import React from 'react';
//
// const MyVideoComponent = () => {
//
//
//
//
//     const videoId = 'M7FIvfx5J10';
//
//     const opts = {
//         height: '720',
//         width: '1280',
//         playerVars: {
//
//             autoplay: 1,
//         },
//     };
//
//     return (
//         <div>
//             <iframe
//
//                 title="YouTube Video"
//                 width="1280"
//                 height="720"
//                 src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//             />
//         </div>
//     );
// };
//
// export default MyVideoComponent;
