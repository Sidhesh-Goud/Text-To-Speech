const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const speakButton = document.getElementById('speak-btn');

// Initialize speech synthesis API
const synth = window.speechSynthesis;

// Populate voices
function populateVoiceList() {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

// Speak function
function speak() {
    if (synth.speaking) {
        console.error('SpeechSynthesis is already speaking');
        return;
    }

    if (textInput.value !== '') {
        const utterThis = new SpeechSynthesisUtterance(textInput.value);
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('value');

        utterThis.voice = synth.getVoices().find((voice) => voice.name === selectedVoice);
        utterThis.onend = () => console.log('SpeechSynthesisUtterance.onend');
        utterThis.onerror = (event) => console.error('SpeechSynthesisUtterance.onerror', event);

        synth.speak(utterThis);
    }
}

// Event listener for the speak button
speakButton.addEventListener('click', speak);
