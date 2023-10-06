import { useRef } from "react";

export const useWebAnimations = (options) => {
  const ref = useRef(null);
  let animation = null;

  const animate = ({ keyframes, ...rest }) => {
    if (animation) {
      animation.cancel();
    }

    animation = ref.current.animate(keyframes, rest);
  };

  const getAnimation = () => {
    return animation;
  };

  return {
    ref,
    playState: animation ? animation.playState : undefined,
    getAnimation,
    animate,
  };
};

export const bounce = {};
export const flash = {};
export const pulse = {};
export const rubberBand = {};
export const shakeX = {};
export const shakeY = {};
export const headShake = {};
export const swing = {};
export const tada = {};
export const wobble = {};
export const jello = {};
export const heartBeat = {};
export const backInDown = {};
export const backInLeft = {};
export const backInRight = {};
export const backInUp = {};
export const backOutDown = {};
export const backOutLeft = {};
export const backOutRight = {};
export const backOutUp = {};
export const bounceIn = {};
export const bounceInDown = {};
export const bounceInLeft = {};
export const bounceInRight = {};
export const bounceInUp = {};
export const bounceOut = {};
export const bounceOutDown = {};
export const bounceOutLeft = {};
export const bounceOutRight = {};
export const bounceOutUp = {};
export const fadeIn = {};
export const fadeInDown = {};
export const fadeInDownBig = {};
export const fadeInLeft = {};
export const fadeInLeftBig = {};
export const fadeInRight = {};
export const fadeInRightBig = {};
export const fadeInUp = {};
export const fadeInUpBig = {};
export const fadeInTopLeft = {};
export const fadeInTopRight = {};
export const fadeInBottomLeft = {};
export const fadeInBottomRight = {};
export const fadeOut = {};
export const fadeOutDown = {};
export const fadeOutDownBig = {};
export const fadeOutLeft = {};
export const fadeOutLeftBig = {};
export const fadeOutRight = {};
export const fadeOutRightBig = {};
export const fadeOutUp = {};
export const fadeOutUpBig = {};
export const fadeOutTopLeft = {};
export const fadeOutTopRight = {};
export const fadeOutBottomLeft = {};
export const fadeOutBottomRight = {};
export const flip = {};
export const flipInX = {};
export const flipInY = {};
export const flipOutX = {};
export const flipOutY = {};
export const lightSpeedInRight = {};
export const lightSpeedInLeft = {};
export const lightSpeedOutRight = {};
export const lightSpeedOutLeft = {};
export const rotateIn = {};
export const rotateInDownLeft = {};
export const rotateInDownRight = {};
export const rotateInUpLeft = {};
export const rotateInUpRight = {};
export const rotateOut = {};
export const rotateOutDownLeft = {};
export const rotateOutDownRight = {};
export const rotateOutUpLeft = {};
export const rotateOutUpRight = {};
export const hinge = {};
export const jackInTheBox = {};
export const rollIn = {};
export const rollOut = {};
export const zoomIn = {};
export const zoomInDown = {};
export const zoomInLeft = {};
export const zoomInRight = {};
export const zoomInUp = {};
export const zoomOut = {};
export const zoomOutDown = {};
export const zoomOutLeft = {};
export const zoomOutRight = {};
export const zoomOutUp = {};
export const slideInDown = {};
export const slideInLeft = {};
export const slideInRight = {};
export const slideInUp = {};
export const slideOutDown = {};
export const slideOutLeft = {};
export const slideOutRight = {};
export const slideOutUp = {};