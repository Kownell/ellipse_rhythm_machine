import { useEffect, useState } from "react";

const EllipseAndLine = () => {
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    setDots([...dots, { x, y }]);
  };

  /*
    Magic Number
  */

  // 中心座標（接点）
  const centerX = 150;
  const centerY = 200;

  // 直線のプロパティ
  const lineLength = 300;

  // 楕円のプロパティ
  const ellipseRadiusX = 50;
  const ellipseRadiusY = 80;

  // 現在の回転角度
  const [rotation, setRotation] = useState(0);

  /*
    描画用変数
  */

  // 直線の始点と終点座
  const lineX1 = centerX - lineLength / 2;
  const lineX2 = centerX + lineLength / 2;

  // アニメーションを実行する関数
  const animateEllipse = () => {
    setRotation((prevRotation) => prevRotation + 0.5);
  };

  // 毎フレームごとにアニメーションを実行
  useEffect(() => {
    const animationId = requestAnimationFrame(animateEllipse);
    return () => cancelAnimationFrame(animationId);
  }, [rotation]);

  //円の中心と線との距離
  const theta = (rotation * Math.PI) / 180;
  const distance = Math.sqrt(
    (Math.tan(theta) ** 2 * ellipseRadiusX ** 2 + ellipseRadiusY ** 2) /
      (Math.tan(theta) ** 2 + 1)
  );

  return (
    <>
      <svg onClick={handleClick} width={300} height={300}>
        <line
          x1={lineX1}
          y1={centerY}
          x2={lineX2}
          y2={centerY}
          stroke="black"
          strokeWidth="2"
        />
        <ellipse
          cx={centerX}
          cy={centerY - distance}
          rx={ellipseRadiusX}
          ry={ellipseRadiusY}
          fill="white"
          stroke="black"
          strokeWidth="2"
          transform={`rotate(${rotation} ${centerX} ${centerY - distance})`}
        />
        {dots.map((dot, index) => (
          <circle key={index} cx={dot.x} cy={dot.y} r="2" fill="red" />
        ))}
      </svg>
    </>
  );
};

const IndexPage = () => {
  return (
    <div>
      <EllipseAndLine />
    </div>
  );
};

export default IndexPage;
