import { useRef, useEffect, useState, useCallback } from "react";
import useLatest from "./useLatest";

export const polyfillErr =
  "💡 use-web-animations: please install polyfill to use this hook. See https://github.com/wellyshen/use-web-animations##use-polyfill";
export const eventErr = `💡 use-web-animations: the browser doesn't support "onReady" event, please use "onUpdate" to monitor the animation's state instead. See https://github.com/wellyshen/use-web-animations#basic-usage`;

const useWebAnimations = ({
  ref: refOpt,
  id,
  playbackRate,
  autoPlay,
  keyframes,
  animationOptions,
  onReady,
  onUpdate,
  onFinish,
} = {}) => {
  const [playState, setPlayState] = useState();
  const hasUnmountedRef = useRef(false);
  const animRef = useRef();
  const prevPendingRef = useRef();
  const prevPlayStateRef = useRef();
  const keyframesRef = useRef(keyframes);
  const animationOptionsRef = useRef(animationOptions);
  const onReadyRef = useLatest(onReady);
  const onUpdateRef = useLatest(onUpdate);
  const onFinishRef = useLatest(onFinish);
  const refVar = useRef(null);
  const ref = refOpt || refVar;

  const getAnimation = useCallback(() => animRef.current, []);

  const animate = useCallback(
    (args) => {
      if (!ref.current || !args.keyframes) return;
      if (!ref.current.animate) {
        console.error(polyfillErr);
        return;
      }

      animRef.current = ref.current.animate(
        args.keyframes,
        args.animationOptions
      );
      const { current: anim } = animRef;

      if (args.autoPlay === false) anim.pause();
      if (args.id) anim.id = args.id;
      if (args.playbackRate) anim.playbackRate = args.playbackRate;

      if (onReadyRef.current) {
        if (anim.ready) {
          anim.ready.then((animation) => {
            // @ts-ignore
            onReadyRef.current({
              playState: animation.playState,
              animate,
              animation,
            });
          });
        } else {
          console.error(eventErr);
        }
      }

      if (onFinishRef.current) {
        anim.onfinish = (e) => {
          const animation = e.target;

          if (!hasUnmountedRef.current) {
            // @ts-ignore
            onFinishRef.current({
              playState: animation.playState,
              animate,
              animation,
            });
          }
        };
      }

      prevPlayStateRef.current = undefined;
    },
    [onFinishRef, onReadyRef, ref]
  );

  useEffect(() => {
    if (keyframesRef.current)
      animate({
        id,
        playbackRate,
        autoPlay,
        keyframes: keyframesRef.current,
        animationOptions: animationOptionsRef.current,
      });
  }, [animate, autoPlay, id, playbackRate]);

  useEffect(() => {
    let rafId;

    const update = () => {
      const animation = getAnimation();

      if (animation) {
        const { pending, playState: curPlayState } = animation;

        if (prevPlayStateRef.current !== curPlayState)
          setPlayState(curPlayState);

        if (
          onUpdateRef.current &&
          (prevPendingRef.current !== pending ||
            prevPlayStateRef.current !== curPlayState ||
            curPlayState === "running")
        )
          onUpdateRef.current({ playState: curPlayState, animate, animation });

        prevPendingRef.current = pending;
        prevPlayStateRef.current = curPlayState;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);

      hasUnmountedRef.current = true;
      getAnimation()?.finish();
      getAnimation()?.cancel();
    };
  }, [animate, getAnimation, onUpdateRef]);

  return { ref, playState, getAnimation, animate };
};

export default useWebAnimations;
