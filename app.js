let alarmAudio = null; // Global variable to store the audio object

document.getElementById('start-timer').addEventListener('click', function () {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds > 0) {
        addTimer(totalTimeInSeconds);
    } else {
        alert('Please enter a valid time.');
    }
});

function addTimer(duration) {
    const timerContainer = document.getElementById('timers-container');
    const timerBox = document.createElement('div');
    timerBox.className = 'timer-box';

    const timeLeft = document.createElement('div');
    timeLeft.className = 'timer-text'; // Added class for styling
    timeLeft.textContent = formatTime(duration);
    timerBox.appendChild(timeLeft);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        clearInterval(timerInterval);
        timerContainer.removeChild(timerBox);
        if (timerContainer.children.length === 0) {
            document.getElementById('no-timers-message').style.display = 'block';
        }
    });
    timerBox.appendChild(deleteButton);

    const stopButton = document.createElement('button');
    stopButton.className = 'stop-button';
    stopButton.textContent = 'Stop';
    stopButton.style.display = 'none'; // Hide stop button initially
    stopButton.addEventListener('click', function () {
        clearInterval(timerInterval);
        timerContainer.removeChild(timerBox);
        if (timerContainer.children.length === 0) {
            document.getElementById('no-timers-message').style.display = 'block';
        }
        if (alarmAudio) {
            alarmAudio.pause(); // Stop the audio
            alarmAudio.currentTime = 0; // Reset the audio to the start
        }
    });
    timerBox.appendChild(stopButton);

    timerContainer.appendChild(timerBox);
    document.getElementById('no-timers-message').style.display = 'none';

    let timerInterval = setInterval(function () {
        if (duration > 0) {
            duration--;
            timeLeft.textContent =`Time Left: ${formatTime(duration)}` ;
        } else {
            clearInterval(timerInterval);
            timeLeft.textContent = 'Timer is up!';
            timerBox.classList.add('finished');
            deleteButton.style.display = 'none'; // Hide delete button
            stopButton.style.display = 'block'; // Show stop button
            playSound();
        }
    }, 1000);
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins}:${secs}`;
}

function playSound() {
    alarmAudio = new Audio('asset/alarm.mp3'); // Initialize the audio object
    alarmAudio.play(); // Play the sound
}
