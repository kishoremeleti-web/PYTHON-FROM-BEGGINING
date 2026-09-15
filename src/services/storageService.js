/**
 * Persistence & Progress Service
 * Clean abstraction over storage so backend / auth can be plugged in later
 * without rewriting frontend components.
 */

const STORAGE_KEY = "pythonquest_student_progress_v1";

const DEFAULT_STATE = {
  studentName: "Alex",
  currentTopicId: 1,
  completedTopicIds: [],
  totalXp: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  // Detailed tracking per topic
  topicData: {
    // 1: { lessonRead: true, passedQuestions: ["t1_q1", ...], challengePassed: true, xpEarned: 110 }
  }
};

export const storageService = {
  /**
   * Load current student state from localStorage or initialize with defaults.
   */
  loadProgress: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(raw);
      
      // Update streak if needed based on date
      const today = new Date().toISOString().slice(0, 10);
      if (parsed.lastActiveDate !== today) {
        const lastDate = new Date(parsed.lastActiveDate);
        const currentDate = new Date(today);
        const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          parsed.streakDays = (parsed.streakDays || 1) + 1;
        } else if (diffDays > 1) {
          parsed.streakDays = 1; // streak reset if skipped more than 1 day
        }
        parsed.lastActiveDate = today;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }

      return { ...DEFAULT_STATE, ...parsed };
    } catch (e) {
      console.warn("Error reading localStorage, using default state", e);
      return { ...DEFAULT_STATE };
    }
  },

  /**
   * Save student state.
   */
  saveProgress: (state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Error saving state to localStorage", e);
    }
  },

  /**
   * Reset all progress (useful for college shared machines or fresh start).
   */
  resetProgress: (newName = "Student") => {
    const fresh = {
      ...DEFAULT_STATE,
      studentName: newName,
      lastActiveDate: new Date().toISOString().slice(0, 10)
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (e) {
      console.error("Error resetting state", e);
    }
    return fresh;
  },

  /**
   * Update student name.
   */
  setStudentName: (name) => {
    const current = storageService.loadProgress();
    current.studentName = name.trim() || "Student";
    storageService.saveProgress(current);
    return current;
  }
};
