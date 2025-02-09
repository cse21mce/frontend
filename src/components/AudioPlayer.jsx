'use client';
import { Pause, Play } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

const AudioPlayer = ({ audio }) => {
    // State for managing audio play/pause and progress
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // Handle play/pause
    const handlePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Update the current time as the audio plays
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    // Set the duration of the audio when it's loaded
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    // Seek to a specific time when the slider is changed
    const handleSeek = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    // Add event listeners for time update and loaded metadata
    useEffect(() => {
        const audioElement = audioRef.current;
        audioElement.addEventListener('timeupdate', handleTimeUpdate);
        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    return (
        <div className='rounded-xl p-4 flex items-center gap-4'>
            {/* Play/Pause Button */}
            <div className="flex items-center gap-2  ml-auto">
                <Button
                    size="icon"
                    onClick={handlePlayPause}
                    className="rounded-full shadow-md bg-primary text-white"
                >
                    {isPlaying ? <Pause className='w-4 h-4' /> : <Play className='w-4 h-4' />}
                </Button>
            </div>

            {/* Progress Slider */}
            {/* <div className="w-full flex items-center gap-2">
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-primary/20 accent-primary rounded-md cursor-pointer"
                    step="0.1"
                />
                <span className="text-sm font-medium text-gray-700">
                    {(duration - currentTime).toFixed(1)}s
                </span>
            </div> */}

            {/* Audio element */}
            <audio ref={audioRef} src={audio} />
        </div>
    );
};

export default AudioPlayer;
