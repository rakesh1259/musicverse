// Player.js
import React from 'react';
import { Button } from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons';

const Player = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious, onShuffle }) => {
  return (
    <div className="music-player header w-full fixed bottom-0 left-0 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentSong && (
            <>
              <img
                className="w-12 h-12 rounded-full"
                src={currentSong.album_img || '/1.gif'}
                alt={currentSong.artist_name}
              />
              <img
                className="w-12 h-12 rounded-full"
                src={currentSong.artist_pic}
                alt={currentSong.artist_name}
              />
              <div>
                <h4 className="text-lg font-semibold">{currentSong.title}</h4>
                <p>{currentSong.artist_name}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 scale-125 mr-10">
          <Button icon={<LeftCircleOutlined />} onClick={onPrevious} />
          {isPlaying ? (
            <Button icon={<PauseCircleOutlined />} onClick={onPlayPause} />
          ) : (
            <Button icon={<PlayCircleOutlined />} onClick={onPlayPause} />
          )}
          <Button icon={<RightCircleOutlined />} onClick={onNext} />
          <Button icon={<SwapOutlined />} onClick={onShuffle} />
        </div>
      </div>
    </div>
  );
};

export default Player;
