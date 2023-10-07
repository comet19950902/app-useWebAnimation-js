import logo from './logo.svg';
import './App.css';
import AniTest from './animations/Animations';

import useWebAnimations from "./hook";
import * as animations from "./hook/animations";

function App() {
  const { bounce } = animations;
  const { ref, getAnimation, animate } = useWebAnimations({
    keyframes: bounce.keyframes,
    animationOptions: { ...bounce.animationOptions, fill: "auto" },
  });

  const play = () => {
    getAnimation()?.play();
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo2" alt="logo" ref={ref} />
      <img src={logo} className="App-logo" alt="logo" />
      <AniTest />
    </div>
  );
}

export default App;
