import { useLayoutEffect, useRef, useState } from "react";
import { Layer, Rect, Stage } from "react-konva";
import Rectangle from "../../component/Canva/Rectangle";

function CreateCanavaPage({
  color,
  rectangles,
  setRectangles,
  selectedCom,
  SetSelectedCom,
  checkDeselect,
  selectedId,
  selectShape,
}) {
  const containerRef = useRef(null);
  const [stageSize, setStageSize] = useState({
    width: 0,
    height: 0,
  });
  const stageRef = useRef(null);

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
