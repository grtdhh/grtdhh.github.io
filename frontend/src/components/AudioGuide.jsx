import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Progress, Space, Typography, Image } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, StepForwardOutlined, StepBackwardOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AudioGuide = () => {
    const [currentCave, setCurrentCave] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const caves = [
        {
            id: 45,
            name: '第45窟',
            period: '北魏',
            audioUrl: '/audio/cave45.mp3',
            imageUrl: '/images/cave45.jpg',
            description: '北魏时期开凿的洞窟，建于公元5世纪末至6世纪初...',
            highlights: [
                '覆斗形顶',
                '本生故事壁画',
                '北魏风格人物造型'
            ]
        },
        // 添加更多洞窟数据...
    ];

    const handlePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleNext = () => {
        if (currentCave < caves.length - 1) {
            setCurrentCave(prev => prev + 1);
            setProgress(0);
            setIsPlaying(false);
        }
    };

    const handlePrev = () => {
        if (currentCave > 0) {
            setCurrentCave(prev => prev - 1);
            setProgress(0);
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        
        const updateProgress = () => {
            const value = (audio.currentTime / audio.duration) * 100;
            setProgress(value);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, [currentCave]);

    return (
        <div className="audio-guide">
            <Card>
                <Image
                    src={caves[currentCave].imageUrl}
                    alt={caves[currentCave].name}
                    style={{ width: '100%', height: 300, objectFit: 'cover' }}
                />
                
                <Title level={2}>{caves[currentCave].name} - {caves[currentCave].period}</Title>
                
                <audio ref={audioRef} src={caves[currentCave].audioUrl} />
                
                <Progress percent={progress} showInfo={false} />
                
                <Space size="large" style={{ marginTop: 16 }}>
                    <Button 
                        icon={<StepBackwardOutlined />} 
                        onClick={handlePrev}
                        disabled={currentCave === 0}
                    />
                    <Button 
                        icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                        onClick={handlePlayPause}
                        type="primary"
                    />
                    <Button 
                        icon={<StepForwardOutlined />} 
                        onClick={handleNext}
                        disabled={currentCave === caves.length - 1}
                    />
                </Space>

                <Paragraph style={{ marginTop: 24 }}>
                    {caves[currentCave].description}
                </Paragraph>

                <Title level={4}>亮点解说</Title>
                <ul>
                    {caves[currentCave].highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

export default AudioGuide; 