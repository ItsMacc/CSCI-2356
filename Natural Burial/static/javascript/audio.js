/*
    The purpose of this JavaScript is to add audios to the respective audio
    icons and play the audio when button is clicked.
    Authors:
            Aakarshan Khosla [group leader] (A00474829)
            Bhabin Chudal (A00464169)
            Aarav Sen Mehta (A00467075)
            Sadikshya Oli (A00457938)
            
*/

// Selects all the microphone icon from DOM model.
let microphones = document.querySelectorAll(".microphone");
let currentAudio = null;


// Iterates through each microphone that gets triggered onclick and plays audio.
for (let microphone of microphones) {
    microphone.addEventListener("click", () => {
        let audio_class_name = microphone.classList[4];
        let audioPath = `../static/audio/${audio_class_name}.mp3`;


        // This ensures no audio can be played at the same time.
        if (currentAudio) {
            currentAudio.pause();
        }

        let instance_audio = new Audio(audioPath);
        instance_audio.play();
        currentAudio = instance_audio;
    });
}

const form = document.getElementById("burial-form");

//Playing an audio to tell the user the form has been submitted
form.addEventListener("submit", function (event) {
    // This ensures no audio can be played at the same time.
    if (currentAudio) {
        currentAudio.pause();
    }

    const audio = new Audio("../static/audio/submit.mp3");
    audio.play();
    currentAudio = audio;
});
