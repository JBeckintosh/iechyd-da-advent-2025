class CandyCaneAdventCalendar {
    constructor() {
        this.challenges = [
            { day: 1, title: "Sweet Start", content: "Plank for 1 minute!" },
            { day: 2, title: "Candy Cane Cardio", content: "2 laps of the block and 200m on the ski erg" },
            { day: 3, title: "3 random exercises", content: "To be added later" },
            { day: 4, title: "Stripe by Stripe", content: "Punches for 4 minutes" },
            { day: 5, title: "Sweet Flexibility", content: "Run/Walk/Cycle, 5 Golden Kms" },
            { day: 6, title: "Hyrox Class #1", content: "6 Press ups, 6 Burpees, 6 Squat Jumps, 6 Star Jumps" },
            { day: 7, title: "End Of Weak #1", content: "Max Bench for 7 reps" },
            { day: 8, title: "Stripe Strength", content: "Bike ride for 8km" },
            { day: 9, title: "Sweet Balance", content: "9 push ups, each with a 9 second decent" },
            { day: 10, title: "Show Off!", content: "Do the coolest exercise you know, and make it look 10/10" },
            { day: 11, title: "Peppermint Power Walk", content: "11 Lengths of Farmers carries" },
            { day: 12, title: "Stripe Stretch", content: "Lift something silly 12 times" },
            { day: 13, title: "Hyrox Class #2", content: "13 Press ups, 13 Burpees, 13 Squat Jumps, 13 Star Jumps" },
            { day: 14, title: "End Of Weak #2", content: "Another 7 days down, so max Squat for 7 reps" },
            { day: 15, title: "Bop It!", content: "To be added later" },
            { day: 16, title: "Stripe Sprint", content: "Run for 16 seconds, then walk for 16 seconds. Repeat 16 times 🏃‍♂️" },
            { day: 17, title: "Sweet Stability", content: "17 lengths of burpee broad jumps" },
            { day: 18, title: "Candy Cane Climb", content: "18 reps of ground to overhead (use whatever you have on hand)" },
            { day: 19, title: "Title to come", content: "19 pulls ups total, use bands if you need to" },
            { day: 20, title: "Hyrox Class #3", content: "20 press ups, 20 squat jumps, 20 star jumps, and 20 burpees" },
            { day: 21, title: "End Of Weak #3", content: "Another 7 days down, so max Deadlift for 7 reps" },
            { day: 22, title: "Candy Cane Challenge", content: "22 lunges for each leg" },
            { day: 23, title: "Peppermint Recovery", content: "23 Pistol Squats for each leg" },
            { day: 24, title: "Secret Santa!", content: "24 reps of the Secret Santa exercise exchange" }
        ];
        
        this.completedChallenges = JSON.parse(localStorage.getItem('completedChallenges')) || [];
        this.challengeNotes = JSON.parse(localStorage.getItem('challengeNotes')) || {};
        this.currentDay = new Date().getDate();
        this.currentMonth = new Date().getMonth();
        
        this.init();
    }
    
    init() {
        this.generateCalendar();
        this.setupEventListeners();
        this.updateProgress();
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
            const isCompleted = this.completedChallenges.includes(day);
            const isToday = this.isToday(day);
            const isLocked = this.isLocked(day);
            
            const doorElement = this.createCalendarDoor(day, challenge, isCompleted, isToday, isLocked);
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
    
    createCalendarDoor(day, challenge, isCompleted, isToday, isLocked) {
        const door = document.createElement('div');
        door.className = 'calendar-door';
        door.dataset.day = day;
        
        if (isCompleted) door.classList.add('completed');
        if (isToday) door.classList.add('today');
        if (isLocked) door.classList.add('locked');
        
        const dayOfWeek = this.getDayOfWeek(day);
        
        const doorFront = document.createElement('div');
        doorFront.className = 'door-front';
        doorFront.innerHTML = `
            <div class="text-2xl font-bold">${day}</div>
            <div class="day-of-week">${dayOfWeek}</div>
        `;
        
        const doorBack = document.createElement('div');
        doorBack.className = 'door-back';
        doorBack.innerHTML = `
            <div class="text-2xl font-bold">${day}</div>
            <div class="day-of-week">${dayOfWeek}</div>
        `;
        
        door.appendChild(doorFront);
        door.appendChild(doorBack);
        
        if (!isLocked) {
            door.addEventListener('click', () => this.openDoor(day, challenge));
        }
        
        return door;
    }
    
    getDayOfWeek(day) {
        // December 1, 2024 is a Sunday
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const startDay = 0; // Sunday
        const dayIndex = (startDay + day - 1) % 7;
        return days[dayIndex];
    }
    
    isToday(day) {
        return this.currentMonth === 11 && day === this.currentDay; // December is month 11
    }
    
    isLocked(day) {
        return this.currentMonth !== 11 || day > this.currentDay; // Only December, and not future days
    }
    
    openDoor(day, challenge) {
        const modal = document.getElementById('challengeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        const noteSection = document.getElementById('noteSection');
        const noteDisplay = document.getElementById('noteDisplay');
        const noteText = document.getElementById('noteText');
        
        modalTitle.textContent = `Day ${day} (${this.getDayOfWeek(day)})`;
        modalContent.innerHTML = `
            <h4 class="font-bold text-slate-800 mb-3">${challenge.title}</h4>
            <p class="text-gray-700 leading-relaxed">${challenge.content}</p>
        `;
        
        // Show/hide note section based on existing note
        const existingNote = this.challengeNotes[day];
        if (existingNote) {
            noteText.textContent = existingNote;
            noteDisplay.classList.remove('hidden');
            noteSection.classList.add('hidden');
        } else {
            noteDisplay.classList.add('hidden');
            noteSection.classList.add('hidden');
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('modal-enter');
        
        // Store current day for note functionality
        this.currentChallengeDay = day;
    }
    
    setupEventListeners() {
        // Close modal
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        
        // Mark complete
        document.getElementById('markComplete').addEventListener('click', () => this.markChallengeComplete());
        
        // Add note
        document.getElementById('addNote').addEventListener('click', () => this.toggleNoteSection());
        
        // Save note
        document.getElementById('saveNote').addEventListener('click', () => this.saveNote());
        
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
        modal.classList.remove('modal-enter');
        
        // Reset note section
        document.getElementById('noteSection').classList.add('hidden');
        document.getElementById('noteInput').value = '';
    }
    
    markChallengeComplete() {
        if (!this.currentChallengeDay) return;
        
        const day = this.currentChallengeDay;
        
        if (!this.completedChallenges.includes(day)) {
            this.completedChallenges.push(day);
            localStorage.setItem('completedChallenges', JSON.stringify(this.completedChallenges));
            
            // Update the door appearance
            const door = document.querySelector(`[data-day="${day}"]`);
            if (door) {
                door.classList.add('completed');
            }
            
            // Update progress
            this.updateProgress();
            
            // Show success message
            this.showSuccessMessage();
            
            // Close modal
            this.closeModal();
        }
    }
    
    toggleNoteSection() {
        const noteSection = document.getElementById('noteSection');
        noteSection.classList.toggle('hidden');
    }
    
    saveNote() {
        if (!this.currentChallengeDay) return;
        
        const noteInput = document.getElementById('noteInput');
        const note = noteInput.value.trim();
        
        if (note) {
            this.challengeNotes[this.currentChallengeDay] = note;
            localStorage.setItem('challengeNotes', JSON.stringify(this.challengeNotes));
            
            // Show the note
            document.getElementById('noteText').textContent = note;
            document.getElementById('noteDisplay').classList.remove('hidden');
            document.getElementById('noteSection').classList.add('hidden');
            noteInput.value = '';
        }
    }
    
    updateProgress() {
        const completedCount = this.completedChallenges.length;
        const remainingCount = 24 - completedCount;
        const progressPercent = Math.round((completedCount / 24) * 100);
        
        document.getElementById('completedCount').textContent = completedCount;
        document.getElementById('remainingCount').textContent = remainingCount;
        document.getElementById('progressPercent').textContent = `${progressPercent}%`;
        
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${progressPercent}%`;
    }
    
    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('translate-x-full');
        
        setTimeout(() => {
            successMessage.classList.add('translate-x-full');
        }, 3000);
    }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CandyCaneAdventCalendar();
});
