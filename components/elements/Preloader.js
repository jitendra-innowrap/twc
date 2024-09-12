import React from "react";

const Preloader = () => {
    return (
        <>
            <div id="preloader-active container" style={{marginTop:'160px'}}>
                <div className="loading-view">
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </>
    );
};

export default Preloader;
