var AudioFile = /** @class */ (function () {
    function AudioFile() {
    }
    AudioFile.prototype.play = function () {
        console.log("Playing audio file...");
    };
    return AudioFile;
}());
var VideoFile = /** @class */ (function () {
    function VideoFile() {
    }
    VideoFile.prototype.play = function () {
        console.log("Playing video file...");
    };
    return VideoFile;
}());
var PDFFile = /** @class */ (function () {
    function PDFFile() {
    }
    PDFFile.prototype.play = function () {
        console.log("Displaying PDF document...");
    };
    return PDFFile;
}());
var MediaPlayer = /** @class */ (function () {
    function MediaPlayer() {
    }
    MediaPlayer.prototype.playMedia = function (file) {
        file.play();
    };
    return MediaPlayer;
}());
var player = new MediaPlayer();
var audio = new AudioFile();
var video = new VideoFile();
var pdf = new PDFFile();
player.playMedia(audio);
player.playMedia(video);
player.playMedia(pdf);
