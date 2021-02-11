import React, {useEffect} from "react";

/**
 * Renders the loader component with animation.
 * @constructor
 */
const Loader: React.FC = () => {
  const [browswerIsChrome, setBrowserIsChrome] = React.useState<boolean>(true);

  useEffect(() => {
    // if ((process as any).browser && navigator) {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) {
      setBrowserIsChrome(false);
    }
    // }
  }, []);

  return (
    <section id="infinite-loader">
      {/* Google Chrome*/}
      <div className="infinityChrome" style={{display: browswerIsChrome ? "block" : "none"}}>
        <div/>
        <div/>
        <div/>
      </div>

      {/* Safari and others*/}
      <div className="infinity" style={{display: browswerIsChrome ? "none" : "block"}}>
        <div>
          <span/>
        </div>
        <div>
          <span/>
        </div>
        <div>
          <span/>
        </div>
      </div>

      {/* Stuff*/}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{"display": "none"}}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </section>
  );
};

export default Loader;
