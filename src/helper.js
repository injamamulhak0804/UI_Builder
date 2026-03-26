export function hex6ForColorInput(value, fallback) {
  if (typeof value === "string" && /^#[0-9A-Fa-f]{6}$/i.test(value.trim())) {
    return value.trim();
  }
  return fallback;
}

export const addShape = (type, color, setRectangles) => {
  const id = crypto.randomUUID();

  const base = {
    id,
    x: 120,
    y: 120,
    color,
    fill: color,
    stroke: "transparent",
    strokeWidth: 0,
  };

  if (type === "circle") {
    setRectangles((prev) => [
      ...prev,
      {
        ...base,
        width: 110,
        height: 110,
        radius: 55,
        type: "circle",
      },
    ]);
    return;
  }

  if (type === "rect") {
    setRectangles((prev) => [
      ...prev,
      { ...base, width: 120, height: 90, cornerRadius: 0 },
    ]);
    return;
  }

  if (type === "square") {
    setRectangles((prev) => [...prev, { ...base, width: 100, height: 100 }]);
    return;
  }

  if (type === "pill") {
    setRectangles((prev) => [
      ...prev,
      { ...base, width: 140, height: 56, cornerRadius: 9999 },
    ]);
  }
};

export async function downloadPDF(stageRef, options = {}) {
  const stage = stageRef?.current;
  if (!stage) return;

  const { fileName = "canvas.pdf", pixelRatio = 2, margin = 0 } = options;

  // Lazy import to keep initial bundle smaller
  const { jsPDF } = await import("jspdf");

  const width = stage.width();
  const height = stage.height();

  const dataUrl = stage.toDataURL({
    pixelRatio,
    mimeType: "image/png",
  });

  const orientation = width >= height ? "landscape" : "portrait";
  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [width + margin * 2, height + margin * 2],
    compress: true,
  });

  pdf.addImage(dataUrl, "PNG", margin, margin, width, height);
  pdf.save(fileName);
}
