function RightSideBar({
  color,
  setColor,
  setRectangles,
  rectangles,
  selectedCom,
}) {
  const handleChange = (event) => {
    let res = rectangles.find((li) => li.id === selectedCom);
    console.log("🚀 ~ handleChange ~ res:", res.id, res.color);
    let color = event.target.value;
    setColor(color);
    let filter = rectangles.map((data) =>
      data.id == selectedCom ? { ...data, color } : data,
    );
    setRectangles(filter);
  };

  return (
    <div className="col-span-1 h-screen border-l-2 border-border py-20 flex flex-col justify-between">
      <div>
        <div>
          <div className="border-b border-border w-full">
            <p className="capitalize font-medium text-sm p-2">fill</p>
          </div>
          <div className="flex items-center justify-start px-2">
            <input
              type="color"
              value={color}
              className="w-6 h-[1.6rem] border-none outline-0"
              onChange={handleChange}
            />
            <p className="text-sm">{color}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="p-2 w-full border-b-2 border-border">
          <p className="text-md font-medium">Export</p>
        </div>
        <div className="mx-auto w-fit">
          <button className="px-10 mt-2 cursor-pointer rounded-sm text-white py-1 bg-blue-400 font-semibold">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
