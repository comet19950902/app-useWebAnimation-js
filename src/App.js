import logo from './logo.svg';
import './App.css';
import AniTest from './animations/Animations';

import useWebAnimations from "./hook";
import * as animations from "./hook/animations";

function App() {
  const { flash } = animations;
  const { ref } = useWebAnimations({
    keyframes: flash.keyframes,
    animationOptions: { ...flash.animationOptions, fill: "auto" }
  });

  return (
    <div className="App">
      <img src={logo} className="App-logo2" alt="logo" ref={ref} />
      <img src={logo} className="App-logo" alt="logo" />
      <AniTest />
    </div>
  );
}

export default App;
