import HeatMap from "./Maps/HeatMap";
import FlyLineMap from "./Maps/FlyLineMap";
import HeatPointMap from "./Maps/HeatPointMap";

function App() {
  return (
    <>
      <div className="flex w-screen h-screen">
        <div>
          <HeatPointMap center={{ lng: 120.1551, lat: 30.2741 }} zoom={13} />
        </div>
      </div>
    </>
  );
}

export default App;
