let microphones = document.querySelectorAll(".microphone");
let currentAudio = null;

for (let microphone of microphones) {
    microphone.addEventListener("click", () => {
        let audio_class_name = microphone.classList[4];
        let audioPath = `../static/audio/${audio_class_name}.mp3`;
        
        if (currentAudio) {
            currentAudio.pause();
        }
        
        let instance_audio = new Audio(audioPath);
        instance_audio.play();
        currentAudio = instance_audio;
    });
}