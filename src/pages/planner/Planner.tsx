import Map from "../../components/Map";
import "./planner.css";

const Planner = () => {
  return (
    <main className="planner-main">
      <Map selectedLocation={null} />
      <aside className="planner-panel">
        <h1 className="planner-title">Route Planner</h1>
      </aside>
    </main>
  );
};

export default Planner;
