// 页面切换逻辑
document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('onboarding').classList.remove('active');
    document.getElementById('goal-creation').classList.add('active');
});

document.getElementById('back-to-home').addEventListener('click', () => {
    document.getElementById('goal-creation').classList.remove('active');
    document.getElementById('onboarding').classList.add('active');
});

// 表单提交处理
document.getElementById('create-goal-btn').addEventListener('click', () => {
    const goalTitle = document.getElementById('goal-title').value;
    const goalDescription = document.getElementById('goal-description').value;
    const goalType = document.querySelector('.goal-type-btn.active').dataset.type;
    const goalDeadline = document.querySelector('.goal-deadline-btn.active').dataset.deadline;
    
    // 更新分析页面数据
    document.getElementById('analysis-goal-title').textContent = goalTitle;
    document.getElementById('analysis-goal-description').textContent = goalDescription;
    document.getElementById('analysis-goal-type').textContent = 
        goalType === 'personal' ? '个人成长' : 
        goalType === 'work' ? '工作职业' : 
        goalType === 'health' ? '健康健身' : '学习知识';
    document.getElementById('analysis-goal-deadline').textContent = 
        goalDeadline === 'short' ? '短期 (1-4周)' : 
        goalDeadline === 'medium' ? '中期 (1-3月)' : '长期 (3月以上)';
    
    // 切换到分析页面
    document.getElementById('goal-creation').classList.remove('active');
    document.getElementById('okr-analysis').classList.add('active');
});

// 目标类型按钮切换
const goalTypeButtons = document.querySelectorAll('.goal-type-btn');
goalTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        goalTypeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// 目标期限按钮切换
const goalDeadlineButtons = document.querySelectorAll('.goal-deadline-btn');
goalDeadlineButtons.forEach(button => {
    button.addEventListener('click', () => {
        goalDeadlineButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});