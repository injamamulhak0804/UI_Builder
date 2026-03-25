import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import Rectangle from "../../component/Canva/Rectangle";

function GridLayer({
  width,
  height,
  gridSize = 10,
  majorEvery = 5,
  minorColor = "rgba(0,0,0,0.04)",
  majorColor = "rgba(0,0,0,0.06)",
}) {
  const lines = useMemo(() => {
    const out = [];
    if (!width || !height || gridSize <= 0) return out;

    const vCount = Math.ceil(width / gridSize);
    const hCount = Math.ceil(height / gridSize);

    for (let i = 0; i <= vCount; i += 1) {
      const x = i * gridSize;
      const isMajor = majorEvery > 0 && i % majorEvery === 0;
      out.push(
        <Line
          key={`v-${i}`}
          points={[x, 0, x, height]}
          stroke={isMajor ? majorColor : minorColor}
          strokeWidth={1}
          perfectDrawEnabled={false}
        />,
      );
    }

    for (let i = 0; i <= hCount; i += 1) {
      const y = i * gridSize;
      const isMajor = majorEvery > 0 && i % majorEvery === 0;
      out.push(
        <Line
          key={`h-${i}`}
          points={[0, y, width, y]}
          stroke={isMajor ? majorColor : minorColor}
          strokeWidth={1}
          perfectDrawEnabled={false}
        />,
      );
    }

    return out;
  }, [width, height, gridSize, majorEvery, minorColor, majorColor]);

  return (
    <Layer listening={false} hitGraphEnabled={false}>
      {lines}
    </Layer>
  );
}

function CreateCanavaPage({
  color,
  rectangles,
  setRectangles,
  selectedCom,
  SetSelectedCom,
  checkDeselect,
  selectedId,
  selectShape,
  stageRef,
}) {
  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({
    width: 0,
    height: 0,
  });

  const [newRect, setNewRect] = useState(null);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const height = entries[0].contentRect.height;
      setStageSize({
        width,
        height: height,
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e) => {
    // Only draw if clicking empty area
    if (e.target !== e.target.getStage()) return;
    SetSelectedCom(null);
    selectShape(null);

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setNewRect({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      color,
      id: crypto.randomUUID(),
    });
  };

  const handlePointerMove = () => {
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    setNewRect((prev) => {
      if (!prev) return prev;
      const width = pos.x - prev.x;
      const height = pos.y - prev.y;

      return {
        x: width < 0 ? pos.x : prev.x,
        y: height < 0 ? pos.y : prev.y,
        width: Math.abs(width),
        height: Math.abs(height),
        color: prev.color,
        id: prev.id,
        stroke: "transparent",
        strokeWidth: 0,
      };
    });
  };

  const handlePointerUp = () => {
    if (newRect && newRect.width > 2 && newRect.height > 2) {
      setRectangles((prev) => [...prev, newRect]);
      SetSelectedCom(newRect.id);
      selectShape(newRect.id);
    }
    setNewRect(null);
  };

  return (
    <>
      <div ref={containerRef} className="h-full min-w-0 bg-[#f5f5f5]">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={(e) => {
            checkDeselect(e);
            handlePointerDown(e);
          }}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={(e) => {
            checkDeselect(e);
            handlePointerDown(e);
          }}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <GridLayer width={stageSize.width} height={stageSize.height} />
          <Layer>
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    SetSelectedCom(rect.id);
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}

            {newRect && (
              <Rect
                {...newRect}
                fill="rgba(119, 130, 237, 0.4)"
                stroke="rgba(119, 130, 237, 1)"
                strokeWidth={1}
              />
            )}
          </Layer>
        </Stage>
      </div>
    </>
  );
}

export default CreateCanavaPage;
