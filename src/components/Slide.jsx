import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "../css/componentsStyles/Slide.module.css";

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  function Arrow(props) {
    const disabeld = props.disabled ? `${styles.arrowDisabled}` : "";
    return (
      <svg
        onClick={props.onClick}
        className={`${styles.arrow} ${
          props.left ? styles.arrowLeft : styles.arrowRight
        } ${disabeld}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  return (
    <div className={styles.slide}>
      <div className={styles.navigationWrapper}>
        <div ref={sliderRef} className="keen-slider">
          <div className={`keen-slider__slide ${styles.numberSlide1}`}>1</div>
          <div className={`keen-slider__slide ${styles.numberSlide2}`}>2</div>
          <div className={`keen-slider__slide ${styles.numberSlide3}`}>3</div>
          <div className={`keen-slider__slide ${styles.numberSlide4}`}>4</div>
          <div className={`keen-slider__slide ${styles.numberSlide5}`}>5</div>
          <div className={`keen-slider__slide ${styles.numberSlide6}`}>6</div>
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className={styles.dots}>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`${styles.dot}  ${
                  currentSlide === idx ? styles.active : ""
                }   `}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slide;
