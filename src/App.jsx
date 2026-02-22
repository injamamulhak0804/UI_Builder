import { useState } from "react";
import Sidebar from "./component/ui/Sidebar";
import CreateCanavaPage from "./pages/createCanava/CreateCanavaPage";
import RightSideBar from "./component/ui/RightSideBar";

function App() {
  const [active, setActive] = useState("canava");
  const [color, setColor] = useState("#FFC0CB");
  const [rectangles, setRectangles] = useState([]);
  const [selectedCom, SetSelectedCom] = useState(null);

  // console.log("Rec: ", rectangles);

  return (
    <>
      <div className="grid grid-cols-12 w-full h-full overflow-y-hidden">
        <div className="col-span-1">
          <Sidebar active={active} setActive={setActive} />
        </div>
        {active == "canava" && (
          <CreateCanavaPage
            color={color}
            rectangles={rectangles}
            setRectangles={setRectangles}
            selectedCom={selectedCom}
            SetSelectedCom={SetSelectedCom}
          />
        )}
        <RightSideBar
          color={color}
          setRectangles={setRectangles}
          rectangles={rectangles}
          setColor={setColor}
          selectedCom={selectedCom}
        />
      </div>
    </>
  );
}
{
  /* { id: "canava", icon: "C", label: "Create Canva", top: true },
  { id: "data", icon: icons.database, label: "Data", top: true },
  { id: "users", icon: icons.user, label: "Users", top: true },
  { id: "schedule", icon: icons.calendar, label: "Schedule", top: true },
  { id: "actions", icon: icons.bolt, label: "Actions", top: true },
  { id: "alerts", icon: icons.bell, label: "Alerts", top: true }, */
}
export default App;
