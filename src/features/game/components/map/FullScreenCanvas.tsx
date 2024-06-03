import { Canvas } from "@react-three/fiber";
import { PropsWithChildren } from "react";
import { NoToneMapping } from "three";

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
      {children}
      <perspectiveCamera position={[0, 0, 2]} />
    </Canvas>
  );
};

export default FullScreenCanvas;
