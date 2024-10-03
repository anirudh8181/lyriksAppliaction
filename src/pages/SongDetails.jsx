import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazam';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Fetch related songs and song details
  const { data: relatedSongs, isFetching: isFetchingRelatedSongs, error: relatedSongsError } = useGetSongRelatedQuery(songid);
  const { data: songData, isFetching: isFetchingSongDetails, error: songDetailsError } = useGetSongDetailsQuery(songid);

  // Loader for fetching state
  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details..." />;

  // Error handling for song details
  if (songDetailsError) {
    console.error("Error fetching song details:", songDetailsError);
    return <Error message={`Error fetching song details: ${songDetailsError.message || 'Unknown error'}`} />;
  }
  
  // Error handling for related songs
  if (relatedSongsError) {
    console.error("Error fetching related songs:", relatedSongsError);
    return <Error message={`Error fetching related songs: ${relatedSongsError.message || 'Unknown error'}`} />;
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongs, i }));
    dispatch(playPause(true));
  };

  // Check for lyrics in the songData
  const lyricsSection = songData?.sections?.find(section => section.type === 'LYRICS');
  const lyrics = lyricsSection ? lyricsSection.text : null;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyrics ? (
            lyrics.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={relatedSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
