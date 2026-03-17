import Map from "../../components/Map";
import SearchInput from "../../components/SearchInput";
import "./home.css";

export const Home = () => {
  return (
    <main className="home-main">
      <h1 className="home-title">Find your destination</h1>
      <SearchInput />
      <div className="home-map">
        <Map />
      </div>
    </main>
  );
};
