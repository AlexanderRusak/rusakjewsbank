import React from "react";
import classes from "./Home.module.css";
import SlickSlider from "../../components/Slider/Slider";
import { sliders } from "../../sliderInformation";

export const Home = () => {
  

  return (
    <div className={classes.Home}>
      <SlickSlider countSliders={sliders} />

    </div>
  );
};
