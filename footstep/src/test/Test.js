import React from "react";
import BodyBanner from "../components/Banner/BodyBanner";
import TopBanner from "../components/Banner/TopBanner";
import Header from "../components/Header/Header";

function Test() {
    return (
        <div>
            <Header />
            <TopBanner />
            <div style={{ height: 50 }}></div>
            <BodyBanner />
        </div>
    );
}

export default Test;
