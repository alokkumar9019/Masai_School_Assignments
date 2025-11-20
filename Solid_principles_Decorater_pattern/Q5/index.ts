interface MediaFile {
    play(): void;
}

class AudioFile implements MediaFile {
    play(): void {
        console.log("Playing audio file...");
    }
}

class VideoFile implements MediaFile {
    play(): void {
        console.log("Playing video file...");
    }
}

class PDFFile implements MediaFile {
    play(): void {
        console.log("Displaying PDF document...");
    }
}

class MediaPlayer {
    playMedia(file: MediaFile): void {
        file.play();
    }
}

const player = new MediaPlayer();

const audio = new AudioFile();
const video = new VideoFile();
const pdf = new PDFFile();

player.playMedia(audio);
player.playMedia(video);
player.playMedia(pdf);
