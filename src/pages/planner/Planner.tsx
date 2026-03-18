import { useAppContext } from "../../context/AppContext";

const Planner = () => {
  const { waypoints } = useAppContext();
  console.log(waypoints);
  return <div>Planner</div>;
};

export default Planner;
