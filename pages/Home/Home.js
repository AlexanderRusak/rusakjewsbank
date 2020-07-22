import React from "react";
import classes from "./Home.module.css";
import SlickSlider from "../../components/Slider/Slider";

export const Home = () => {
  const sliders = {
    title: [1, 2, 3],
    information: [
      "this information about first slider",
      "this information about second slider",
      "this information about third slider",
    ],
    link: [null, "https.github.com", null],
  };

  return (
    <div className={classes.Home}>
      <SlickSlider countSliders={sliders} />
    </div>
  );
};
