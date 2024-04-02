import { useState } from "react";
import TabOptions from "../utils/TabOptions";
import MoviesList from "./MoviesList";
import Menu from "./Menu";

const tabOptions = [
  TabOptions.HOME,
  TabOptions.MOVIES_IN_THEATERS,
  TabOptions.COMING_SOON,
  TabOptions.TOP_RATED_INDIAN,
  TabOptions.TOP_RATED_MOVIES,
  TabOptions.FAVORITES,
];

function Home() {
  const [tab, setTab] = useState<TabOptions>(TabOptions.HOME);

  return (
    <div>
      <div className="menu-tabs">
        {tabOptions.map((tabOption) => (
          <button
            key={tabOption}
            className={`tab-options ${
              tabOption === tab ? "tab-option-active" : ""
            }`}
            onClick={() => setTab(tabOption)}
          >
            {tabOption}
          </button>
        ))}
      </div>
      <div className="content-container">
        {tab === TabOptions.HOME && <Menu />}
        {tab === TabOptions.MOVIES_IN_THEATERS && (
          <MoviesList tabName="movies-in-theaters" />
        )}
        {tab === TabOptions.COMING_SOON && (
          <MoviesList tabName="movies-coming" />
        )}
        {tab === TabOptions.TOP_RATED_INDIAN && (
          <MoviesList tabName="top-rated-india" />
        )}
        {tab === TabOptions.TOP_RATED_MOVIES && (
          <MoviesList tabName="top-rated-movies" />
        )}
        {tab === TabOptions.FAVORITES && <MoviesList tabName="favorite" />}
      </div>
    </div>
  );
}

export default Home;
