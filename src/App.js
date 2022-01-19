import React, { createContext, useContext, useReducer } from "react";
import AddSong from "./components/AddSong";
import Header from "./components/Header";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";
import songReducer from "./reducer";

export const songContext = createContext({
  song: {
    id: "2ad72c9d-75e0-49ba-a4c1-d6689ebf0892",
    title: "BUBBLETEA (prod. Duit) (Official Video)",
    artist: "Quebonafide feat. Daria Zawiałow",
    thumbnail: "http://img.youtube.com/vi/IFAF3NYM_KI/0.jpg",
    duration: "263",
    url: "https://www.youtube.com/watch?v=IFAF3NYM_KI",
  },
  isPlaying: false,
});

function App() {
  const initialSongState = useContext(songContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  const greaterThanSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <songContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: greaterThanSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 0,
                  top: 70,
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </songContext.Provider>
  );
}

export default App;
