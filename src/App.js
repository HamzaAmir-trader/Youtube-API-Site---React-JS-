import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import youtube from './api/youtube';
import { SearchBar, VideoList, VideoDetail } from './components';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const onVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  // useEffect(() => {
  //   handleSubmit('pdf generation with react and node')
  // }, [])

  const handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyA2tyrK1n00ASJFrOwR11mYNF01quTymnk',
        q: searchTerm
      }
    });

    console.log(response);

    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  }


  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onSelectVideo={onVideoSelect} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App