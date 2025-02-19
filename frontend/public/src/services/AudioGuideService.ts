import { Sound } from 'react-native-sound';
import { API_BASE_URL } from '../config';

interface AudioResponse {
  audioUrl: string;
}

export class AudioGuideService {
  private currentSound: Sound | null = null;

  async loadAudioGuide(spotId: string, language: string = 'zh'): Promise<Sound> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/audio-guides/${spotId}?lang=${language}`
      );
      const { audioUrl }: AudioResponse = await response.json();
      
      return new Promise<Sound>((resolve, reject) => {
        const sound = new Sound(audioUrl, '', (error) => {
          if (error) {
            reject(error);
            return;
          }
          this.currentSound = sound;
          resolve(sound);
        });
      });
    } catch (error) {
      console.error('加载音频失败:', error);
      throw error;
    }
  }

  play(): void {
    this.currentSound?.play((success) => {
      if (!success) {
        console.log('播放完成时发生错误');
      }
    });
  }

  pause(): void {
    this.currentSound?.pause();
  }

  stop(): void {
    this.currentSound?.stop();
  }

  release(): void {
    this.currentSound?.release();
    this.currentSound = null;
  }
} 