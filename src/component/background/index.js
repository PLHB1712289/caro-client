import React, { useState } from "react";
import ParticlesBg from "particles-bg";

const Background = ({ zIndex }) => {
  const [zIndexx] = useState(zIndex || -50);

  let config = {
    num: [4, 7],
    rps: 0.1,
    radius: [5, 40],
    life: [1.5, 3],
    v: [2, 3],
    tha: [-40, 40],
    alpha: [0.6, 0],
    scale: [0.1, 0.4],
    position: "all",
    color: ["random", "#ff0000"],
    cross: "dead",
    random: 15,
  };

  if (Math.random() > 0.85) {
    config = Object.assign(config, {
      onParticleUpdate: (ctx, particle) => {
        ctx.beginPath();
        ctx.rect(
          particle.p.x,
          particle.p.y,
          particle.radius * 2,
          particle.radius * 2
        );
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.closePath();
      },
    });
  }

  // const arrayBgDynamic = [
  //   <ParticlesBg type="cobweb" bg={true} />,
  //   <ParticlesBg type="polygon" bg={true} />,
  //   <ParticlesBg type="custom" config={config} bg={true} />,
  // ];

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: zIndexx,
          backgroundColor: "rgba(2,13,24,0.9)",
        }}
      ></div>
      <ParticlesBg type="custom" config={config} bg={true} />
    </>
  );
};
/* {arrayBgDynamic[Math.floor(Math.random() * 10, 0) % 3]} */

//cobweb
//polygon

export default Background;
