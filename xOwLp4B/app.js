// Screen Navigation
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Goal Creation Functions
function setupGoalTypeButtons() {
    const goalTypeButtons = document.querySelectorAll('.goal-type-btn');
    goalTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            goalTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    const goalDeadlineButtons = document.querySelectorAll('.goal-deadline-btn');
    goalDeadlineButtons.forEach(button => {
        button.addEventListener('click', () => {
            goalDeadlineButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Task Completion
function setupTaskItems() {
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(task => {
        task.addEventListener('click', () => {
            const taskId = task.getAttribute('data-task-id');
            const taskTitle = task.querySelector('.task-title').textContent;
            document.getElementById('completed-task-title').textContent = taskTitle;
            
            // Update related KR in modal
            const krName = task.querySelector('.task-kr').textContent;
            document.getElementById('updated-kr').textContent = krName;
            
            showModal('task-complete-modal');
        });
    });
}

// Feeling Selection
function setupFeelingButtons() {
    const feelingButtons = document.querySelectorAll('.feeling-btn');
    feelingButtons.forEach(button => {
        button.addEventListener('click', () => {
            feelingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Data Transfer Between Screens
function transferGoalData() {
    const goalTitle = document.getElementById('goal-title').value || '提升编程技能';
    const goalDescription = document.getElementById('goal-description').value || '我想提高我的JavaScript技能，能够独立完成前端项目，使我在工作中更有竞争力。';
    
    const activeGoalType = document.querySelector('.goal-type-btn.active');
    const goalType = activeGoalType ? activeGoalType.getAttribute('data-type') : 'personal';
    
    const activeDeadline = document.querySelector('.goal-deadline-btn.active');
    const deadline = activeDeadline ? activeDeadline.getAttribute('data-deadline') : 'short';
    
    // Update analysis screen
    document.getElementById('analysis-goal-title').textContent = goalTitle;
    document.getElementById('analysis-goal-description').textContent = goalDescription;
    
    // Set goal type badge
    const goalTypeBadge = document.getElementById('analysis-goal-type');
    
    switch(goalType) {
        case 'personal':
            goalTypeBadge.textContent = '个人成长';
            break;
        case 'work':
            goalTypeBadge.textContent = '工作职业';
            break;
        case 'health':
            goalTypeBadge.textContent = '健康健身';
            break;
        case 'learn':
            goalTypeBadge.textContent = '学习知识';
            break;
        default:
            goalTypeBadge.textContent = '个人成长';
    }
    
    // Set deadline text
    const deadlineText = document.getElementById('analysis-goal-deadline');
    
    switch(deadline) {
        case 'short':
            deadlineText.textContent = '短期 (1-4周)';
            break;
        case 'medium':
            deadlineText.textContent = '中期 (1-3月)';
            break;
        case 'long':
            deadlineText.textContent = '长期 (3月以上)';
            break;
        default:
            deadlineText.textContent = '短期 (1-4周)';
    }
    
    // Also update dashboard
    document.getElementById('dashboard-goal-title').textContent = goalTitle;
}

// Fake AI Analysis with Loading Effect
function simulateAIAnalysis() {
    // Simulate AI thinking time
    setTimeout(() => {
        showScreen('okr-analysis');
    }, 1500);
}

// Dashboard KR Click Handler
function setupDashboardKRs() {
    const krItems = document.querySelectorAll('#dashboard-kr-container .key-result-item');
    krItems.forEach(kr => {
        kr.addEventListener('click', () => {
            const krId = kr.getAttribute('data-kr-id');
            
            // Check if it's 50% complete to show reward
            if (krId === "1") {
                showModal('reward-modal');
            } else {
                // Show task complete for demonstration
                document.getElementById('completed-task-title').textContent = kr.querySelector('span').textContent;
                document.getElementById('updated-kr').textContent = kr.querySelector('span').textContent;
                showModal('task-complete-modal');
            }
        });
    });
}

// Main Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Setup buttons and interactions
    setupGoalTypeButtons();
    setupTaskItems();
    setupFeelingButtons();
    setupDashboardKRs();
    
    // Navigation event listeners
    document.getElementById('start-button').addEventListener('click', () => {
        showScreen('goal-creation');
    });
    
    document.getElementById('back-to-home').addEventListener('click', () => {
        showScreen('onboarding');
    });
    
    document.getElementById('create-goal-btn').addEventListener('click', () => {
        transferGoalData();
        simulateAIAnalysis();
    });
    
    document.getElementById('back-to-goal-creation').addEventListener('click', () => {
        showScreen('goal-creation');
    });
    
    document.getElementById('save-goal-btn').addEventListener('click', () => {
        showScreen('dashboard');
    });
    
    document.getElementById('add-goal-btn').addEventListener('click', () => {
        showScreen('goal-creation');
    });
    
    // Modal close buttons
    document.getElementById('close-modal-btn').addEventListener('click', () => {
        hideModal('task-complete-modal');
    });
    
    document.getElementById('continue-btn').addEventListener('click', () => {
        hideModal('task-complete-modal');
    });
    
    document.getElementById('claim-reward-btn').addEventListener('click', () => {
        hideModal('reward-modal');
    });
    
    document.getElementById('share-reward-btn').addEventListener('click', () => {
        hideModal('reward-modal');
    });
    
    // Collect rewards data
    document.querySelectorAll('.reward-input').forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.closest('.reward-item').querySelector('.text-sm').textContent.includes('50%')) {
                document.getElementById('next-reward-text').textContent = e.target.value || '周末看一场电影';
                document.getElementById('reward-title').textContent = e.target.value || '周末看一场电影';
            }
        });
    });
});
