import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Pause, PlayArrow, Save } from "@material-ui/icons";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { GET_SONGS } from "../graphql/subscriptions";
import { songContext } from "../App";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const SongList = () => {
  const { data, loading, error } = useSubscription(GET_SONGS);

  //   const song = {
  //     title: "LUNE",
  //     artist: "MOON",
  //     thumbnail:
  //       "https://media.istockphoto.com/photos/motherboard-picture-id179391027",
  //   };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching songs</div>;
  }

  console.log(data, error);

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center",
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140,
  },
}));

function Song({ song }) {
  const classes = useStyles();
  const { id } = song;
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
  const { state, dispatch } = useContext(songContext);

  const { title, artist, thumbnail } = song;

  useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [id, state.song.id, state.isPlaying]);

  const handleTogglePlay = () => {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  };

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: "Song" },
      },
    });
  };

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTogglePlay} size="small" color="primary">
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size="small"
              color="secondary"
            >
              <Save color="secondary" />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default SongList;
