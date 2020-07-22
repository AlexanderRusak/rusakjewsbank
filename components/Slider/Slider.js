import React from "react";
import Slider from "react-slick";
import classes from "./Slider.module.css";
import { Slide } from "./Slide/Slide";

export default class SlickSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const sliders = this.props.countSliders.title.map((slide, key) => {
      return (
        <Slide
          title={slide}
          information={this.props.countSliders.information[key]}
          link={this.props.countSliders.link[key]}
          count={this.props.countSliders.title.length}
        />
      );
    });
    return (
      <div className={classes.SlickSlider}>
        <Slider {...settings}>{sliders}</Slider>
      </div>
    );
  }
}
