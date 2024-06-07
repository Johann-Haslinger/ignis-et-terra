import { Canvas } from "@react-three/fiber";
import { PropsWithChildren } from "react";
import { NoToneMapping } from "three";
import { CANVAS_SCALE } from "../../../../base/constants";

const FullScreenCanvas = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <Canvas
      gl={{ antialias: true, toneMapping: NoToneMapping }}
      linear
      shadows={"soft"}
      style={{
        backgroundColor: "#d6d6d6",
        width: "100%",
        height: "100%",
      }}
    >
      <group scale={[CANVAS_SCALE, CANVAS_SCALE, 1]}>{children}</group>
      <perspectiveCamera position={[0, 0, 2]} />
    </Canvas>
  );
};

export default FullScreenCanvas;
