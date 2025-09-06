class AdventCalendar {
    constructor() {
        this.randomExercises = [
            "Push-ups", "Squats", "Burpees", "Lunges", "Mountain Climbers", "Jumping Jacks",
            "High Knees", "Lying Leg Raises", "Bicycle Crunches", "Russian Twists",
            "Tricep Dips", "Pike Push-ups", "Bear Crawls", "Crab Walks"
        ];

        this.bopItExercises = [
            "Burpee", "Press Up", "Squat", "Sit Up", "Star Jump"
        ];
        
        this.randomReps = [
            3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45
        ];
        
        // Bop It! game properties
        this.bopItGame = {
            isRunning: false,
            currentExercise: null,
            exerciseCount: 0,
            timer: null,
            currentInterval: 5000, // Start with 5 seconds
            minInterval: 1000, // Minimum 1 seconds
            intervalDecrease: 250, // Decrease by 250ms each time
            maxExercises: 24 // Maximum number of exercises
        };
        
        this.challenges = [
            { day: 1, title: "Silent Plank, Holy Plank!", content: "Plank for 1 minute!" },
            { day: 2, title: "Ski-sons Greetings", content: "2 laps of the block and 200m on the ski erg" },
            { day: 3, title: "3 Exercises In Your Stocking", content: "exerciseButtons" },
            { day: 4, title: "Deck The Halls (with your fists)", content: "Punches for 4 minutes" },
            { day: 5, title: "5 Golden Kms", content: "Run/Walk/Cycle, 5 Golden Kms" },
            { day: 6, title: "Hyrox Class #1: Jingle Bell, Jingle Bell, Jingle Bell Rox", content: "6 Press ups, 6 Burpees, 6 Lunges, 6 Squat Jumps, 6 Star Jumps" },
            { day: 7, title: "End Of Weak #1: Bench-ing Through The Snow", content: "Max Bench for 7 reps" },
            { day: 8, title: "Tour De Christmas", content: "Bike ride for 8km" },
            { day: 9, title: "Press The Halls", content: "9 push ups, each with a 9 second decent" },
            { day: 10, title: "Show Off!", content: "Do the coolest exercise you know, and make it look 10/10" },
            { day: 11, title: "The Festive Farmers Mood", content: "11 Lengths of Farmers carries" },
            { day: 12, title: "The Sillier, The Merrier", content: "Lift something silly 12 times" },
            { day: 13, title: "Hyrox Class #2: Jingle Bell, Jingle Bell, Jingle Bell Rox", content: "13 Press ups, 13 Burpees, 13 Lunges, 13 Squat Jumps, 13 Star Jumps" },
            { day: 14, title: "End Of Weak #2: Squat like there's snow tomorrow", content: "Another 7 days down, so max Squat for 7 reps" },
            { day: 15, title: "Bop It!", content: "bopItGame" },
            { day: 16, title: "A run that keeps on giving", content: "Run for 16 seconds, then walk for 16 seconds. Repeat 16 times 🏃‍♂️" },
            { day: 17, title: "Tis The Burpees To Be Jolly", content: "17 lengths of burpee broad jumps" },
            { day: 18, title: "In High Spirits", content: "18 reps of ground to overhead (use whatever you have on hand)" },
            { day: 19, title: "Santa Claus Is Pulling Up To Town", content: "19 pulls ups total, use bands if you need to" },
            { day: 20, title: "Hyrox Class #3: Jingle Bell, Jingle Bell, Jingle Bell Rox", content: "20 press ups, 20 squat jumps, 20 Lunges, 20 star jumps, and 20 burpees" },
            { day: 21, title: "End Of Weak #3: Deadlifts in a winter wonderland", content: "Another 7 days down, so max Deadlift for 7 reps" },
            { day: 22, title: "All I want for Christmas is glutes", content: "22 lunges for each leg" },
            { day: 23, title: "Come Bearing Gifts And Arms", content: "23 Pistol Squats for each leg" },
            { day: 24, title: "Secret Santa!", content: "24 reps of the Secret Santa exercise exchange" }
        ];
        
        this.currentDay = new Date().getDate();
        this.currentMonth = new Date().getMonth();
        
        this.init();
    }
    
    init() {
        this.generateCalendar();
        this.setupEventListeners();
    }
    
    generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;
        
        calendarGrid.innerHTML = '';
        
        // December 1, 2024 is a Sunday
        let startDay = 0; // Sunday = 0
        
        // Add empty cells for days before December 1st
        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-door empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add calendar doors for December 1-24
        for (let day = 1; day <= 24; day++) {
            const challenge = this.challenges.find(c => c.day === day);
            const isToday = this.isToday(day);
            const isLocked = this.isLocked(day);
            
            const doorElement = this.createCalendarDoor(day, challenge, isToday, isLocked);
            calendarGrid.appendChild(doorElement);
        }
        
        // Add empty cells to complete the grid (if needed)
        const totalCells = startDay + 24;
        const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;
        
        for (let i = 0; i < remainingCells; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-door empty';
            calendarGrid.appendChild(emptyCell);
        }
    }
    
    createCalendarDoor(day, challenge, isToday, isLocked) {
        const door = document.createElement('div');
        door.className = 'calendar-door';
        door.dataset.day = day;
        
        if (isToday) door.classList.add('today');
        if (isLocked) door.classList.add('locked');
        
        const doorFront = document.createElement('div');
        doorFront.className = 'door-front';
        doorFront.innerHTML = `
            <div class="text-2xl font-bold">${day}</div>
        `;
        
        const doorBack = document.createElement('div');
        doorBack.className = 'door-back';
        doorBack.innerHTML = `
            <div class="text-2xl font-bold">${day}</div>
        `;
        
        door.appendChild(doorFront);
        door.appendChild(doorBack);
        
        if (!isLocked) {
            door.addEventListener('click', () => this.openDoor(day, challenge));
        }
        
        return door;
    }
    
    getDayOfWeek(day) {
        // December 1, 2024 is a Monday
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const startDay = 0; // Monday
        const dayIndex = (startDay + day - 1) % 7;
        return days[dayIndex];
    }
    
    isToday(day) {
        return this.currentMonth === 11 && day === this.currentDay; // December is month 11
    }
    
    isLocked(day) {
        return false;
        return this.currentMonth !== 11 || day > this.currentDay; // Only December, and not future days
    }
    
    openDoor(day, challenge) {
        const modal = document.getElementById('challengeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        modalTitle.textContent = `Day ${day}`;
        
        if (day === 3) {
            modalContent.innerHTML = `
                <h4 class="font-bold text-slate-800 mb-6">${challenge.title}</h4>
                <div class="space-y-4">
                    <button class="exercise-btn w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200" data-exercise="1">
                        Exercise #1
                    </button>
                    <button class="exercise-btn w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200" data-exercise="2">
                        Exercise #2
                    </button>
                    <button class="exercise-btn w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200" data-exercise="3">
                        Exercise #3
                    </button>
                </div>
                <div id="exerciseResult" class="mt-6 p-4 bg-gray-100 rounded-lg hidden">
                    <h5 class="font-bold text-slate-800 mb-2">Your Exercise:</h5>
                    <p class="text-lg text-gray-700" id="exerciseText"></p>
                </div>
            `;
            
            // Add event listeners to exercise buttons
            this.setupExerciseButtons();
        } else if (day === 15) {
            modalContent.innerHTML = `
                <h4 class="font-bold text-slate-800 mb-6">${challenge.title}</h4>
                <div class="text-center">
                    <div id="bopItInstructions" class="mb-6 p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300">
                        If you aren't familiar with the Bop It game, it asks your to do a task which you have to finish before the timer runs out.
                        This is an exercise version of that game
                        You may want to turn the volume all the way up
                    </div>
                </div>
                <div class="text-center">
                    <div id="bopItDisplay" class="mb-6 p-6 bg-gradient-to-r from-red-100 to-red-200 rounded-lg border-2 border-red-300">
                        <h5 class="text-xl font-bold text-slate-800 mb-2">Get Ready!</h5>
                        <p class="text-lg text-gray-700" id="bopItExercise">Click Start to begin</p>
                        <div id="bopItCountdown" class="text-3xl font-bold text-red-600 mt-4 hidden">3</div>
                    </div>
                    <div class="space-y-3">
                        <button id="bopItStart" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                            Bop It!
                        </button>
                        <button id="bopItStop" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 hidden">
                            Stop Game
                        </button>
                        <button id="bopItReset" class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
                            Reset
                        </button>
                    </div>
                    <div class="mt-4 text-sm text-gray-600">
                        <p>Exercise #<span id="exerciseNumber">0</span> of <span id="maxExercises">20</span></p>
                        <p>Next exercise in: <span id="timeRemaining">-</span> seconds</p>
                    </div>
                </div>
            `;
            
            // Add event listeners to Bop It! buttons
            this.setupBopItButtons();
        } else {
            modalContent.innerHTML = `
                <h4 class="font-bold text-slate-800 mb-3">${challenge.title}</h4>
                <p class="text-gray-700 leading-relaxed">${challenge.content}</p>
            `;
        }
        
        modal.classList.remove('hidden');
    }
    
    setupExerciseButtons() {
        const exerciseButtons = document.querySelectorAll('.exercise-btn');
        exerciseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const exerciseNumber = e.target.dataset.exercise;
                this.generateRandomExercise(exerciseNumber);
            });
        });
    }
    
    generateRandomExercise(exerciseNumber) {
        const randomExercise = this.randomExercises[Math.floor(Math.random() * this.randomExercises.length)];
        const randomReps = this.randomReps[Math.floor(Math.random() * this.randomReps.length)];
        
        const exerciseResult = document.getElementById('exerciseResult');
        const exerciseText = document.getElementById('exerciseText');
        
        exerciseText.textContent = `${randomExercise} - ${randomReps} reps`;
        exerciseResult.classList.remove('hidden');
        
        // Scroll to the result
        exerciseResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    setupBopItButtons() {
        const startBtn = document.getElementById('bopItStart');
        const stopBtn = document.getElementById('bopItStop');
        const resetBtn = document.getElementById('bopItReset');
        
        startBtn.addEventListener('click', () => this.startBopItGame());
        stopBtn.addEventListener('click', () => this.stopBopItGame());
        resetBtn.addEventListener('click', () => this.resetBopItGame());
    }
    
    startBopItGame() {
        if (this.bopItGame.isRunning) return;
        
        this.bopItGame.isRunning = true;
        this.bopItGame.exerciseCount = 0;
        this.bopItGame.currentInterval = 5000; // Reset to 5 seconds
        
        // Update UI
        document.getElementById('bopItStart').classList.add('hidden');
        document.getElementById('bopItStop').classList.remove('hidden');
        document.getElementById('maxExercises').textContent = this.bopItGame.maxExercises;
        
        // Start countdown
        this.startBopItCountdown();
    }
    
    startBopItCountdown() {
        const countdownElement = document.getElementById('bopItCountdown');
        const exerciseElement = document.getElementById('bopItExercise');
        
        countdownElement.classList.remove('hidden');
        exerciseElement.textContent = 'Get Ready!';
        
        let count = 3;
        countdownElement.textContent = count;
        
        const countdownTimer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownElement.textContent = count;
            } else {
                clearInterval(countdownTimer);
                countdownElement.classList.add('hidden');
                this.nextBopItExercise();
            }
        }, 1000);
    }
    
    nextBopItExercise() {
        if (!this.bopItGame.isRunning) return;
        
        this.bopItGame.exerciseCount++;
        this.bopItGame.currentExercise = this.bopItExercises[Math.floor(Math.random() * this.bopItExercises.length)];
        
        // Update display
        const exerciseElement = document.getElementById('bopItExercise');
        const exerciseNumber = document.getElementById('exerciseNumber');
        const timeRemaining = document.getElementById('timeRemaining');
        
        exerciseElement.textContent = this.bopItGame.currentExercise;
        exerciseNumber.textContent = this.bopItGame.exerciseCount;
        
        // Speak the exercise
        this.speakExercise(this.bopItGame.currentExercise);
        
        // Check if game should end
        if (this.bopItGame.exerciseCount >= this.bopItGame.maxExercises) {
            this.endBopItGame();
            return;
        }
        
        // Schedule next exercise
        this.bopItGame.timer = setTimeout(() => {
            this.nextBopItExercise();
        }, this.bopItGame.currentInterval);
        
        // Update time remaining display
        this.updateTimeRemaining();
        
        // Decrease interval for next time (but not below minimum)
        this.bopItGame.currentInterval = Math.max(
            this.bopItGame.minInterval,
            this.bopItGame.currentInterval - this.bopItGame.intervalDecrease
        );
    }
    
    updateTimeRemaining() {
        const timeRemaining = document.getElementById('timeRemaining');
        const totalTime = this.bopItGame.currentInterval / 1000;
        let remaining = totalTime;
        
        timeRemaining.textContent = remaining.toFixed(1);
        
        const updateTimer = setInterval(() => {
            remaining -= 0.1;
            if (remaining <= 0) {
                clearInterval(updateTimer);
                timeRemaining.textContent = '-';
            } else {
                timeRemaining.textContent = remaining.toFixed(1);
            }
        }, 100);
    }
    
    speakExercise(exercise) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(exercise);
            utterance.rate = 4.0;
            utterance.pitch = 1.0;
            utterance.volume = 2.0;
            speechSynthesis.speak(utterance);
        }
    }
    
    stopBopItGame() {
        this.bopItGame.isRunning = false;
        if (this.bopItGame.timer) {
            clearTimeout(this.bopItGame.timer);
            this.bopItGame.timer = null;
        }
        
        // Update UI
        document.getElementById('bopItStart').classList.remove('hidden');
        document.getElementById('bopItStop').classList.add('hidden');
        document.getElementById('bopItExercise').textContent = 'Game Stopped';
        document.getElementById('timeRemaining').textContent = '-';
    }
    
    resetBopItGame() {
        this.stopBopItGame();
        this.bopItGame.exerciseCount = 0;
        this.bopItGame.currentInterval = 5000;
        this.bopItGame.currentExercise = null;
        
        // Update UI
        document.getElementById('bopItExercise').textContent = 'Click Start to begin';
        document.getElementById('exerciseNumber').textContent = '0';
        document.getElementById('timeRemaining').textContent = '-';
    }
    
    endBopItGame() {
        this.bopItGame.isRunning = false;
        if (this.bopItGame.timer) {
            clearTimeout(this.bopItGame.timer);
            this.bopItGame.timer = null;
        }
        
        // Update UI
        document.getElementById('bopItStart').classList.remove('hidden');
        document.getElementById('bopItStop').classList.add('hidden');
        document.getElementById('bopItExercise').textContent = '🎉 Congratulations! You completed all exercises! 🎉';
        document.getElementById('timeRemaining').textContent = 'Complete!';
        
        // Speak completion message
        this.speakExercise('Congratulations! You completed all exercises!');
    }
    
    setupEventListeners() {
        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        
        // Close modal when clicking outside
        document.getElementById('challengeModal').addEventListener('click', (e) => {
            if (e.target.id === 'challengeModal') {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('challengeModal');
        modal.classList.add('hidden');

        this.stopBopItGame();
    }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AdventCalendar();
});
