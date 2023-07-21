import Sound from 'react-native-sound'
Sound.setCategory('Playback');

export var ding = new Sound('tick.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // if loaded successfully
    console.log(
        'duration in seconds: ' +
        ding.getDuration() +
        'number of channels: ' +
        ding.getNumberOfChannels(),
    );
});

export const playSound = () => {
    ding.play(success => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
    });
}