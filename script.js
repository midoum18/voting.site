// حفظ حالة التصويت باستخدام localStorage
let hasVoted = localStorage.getItem('hasVoted');

// إذا كان الطالب قد صوت بالفعل، لا يمكنه التصويت مجددًا
if (hasVoted === 'true') {
    document.getElementById('login-section').style.display = 'none'; // إخفاء صفحة تسجيل الدخول
    document.getElementById('voting-section').style.display = 'none'; // إخفاء صفحة التصويت
    document.getElementById('results-section').style.display = 'block'; // إظهار نتائج التصويت
} else {
    document.getElementById('login-section').style.display = 'block'; // إظهار صفحة تسجيل الدخول
    document.getElementById('results-section').style.display = 'none'; // إخفاء نتائج التصويت
}

// تسجيل الدخول باستخدام رقم بطاقة الطالب وكلمة المرور
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    let studentId = document.getElementById('student-id').value;
    let password = document.getElementById('password').value;

    // التحقق من صحة كلمة المرور ورقم بطاقة الطالب
    if (studentId && password === 'NOREPINEPHRINE') {
        // إخفاء صفحة تسجيل الدخول
        document.getElementById('login-section').style.display = 'none';
        // إظهار صفحة التصويت
        document.getElementById('voting-section').style.display = 'block';
    } else {
        alert('رقم بطاقة الطالب أو كلمة المرور غير صحيحة!');
    }
});

// التصويت وتحديث النتائج
document.getElementById('voting-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let studentName = document.getElementById('student-name').value;
    let studentCard = document.getElementById('student-card').files[0];
    let vote = document.querySelector('input[name="vote"]:checked');

    if (studentName && studentCard && vote) {
        let voteValue = vote.value;

        // حفظ التصويت في localStorage لتأكيد عدم التصويت مرة أخرى
        localStorage.setItem('hasVoted', 'true');
        
        // إخفاء صفحة التصويت وعرض النتائج
        document.getElementById('voting-section').style.display = 'none';
        document.getElementById('results-section').style.display = 'block';

        // تحديث نتائج التصويت
        updateVoteResults(voteValue);
    } else {
        alert('من فضلك أكمل كافة الحقول');
    }
});

// تحديث نتائج التصويت
function updateVoteResults(voteValue) {
    let yesVotes = parseInt(localStorage.getItem('yesVotes') || '0');
    let noVotes = parseInt(localStorage.getItem('noVotes') || '0');

    // تحديث التصويت بناءً على اختيار الطالب
    if (voteValue === 'yes') {
        yesVotes++;
        localStorage.setItem('yesVotes', yesVotes);
    } else if (voteValue === 'no') {
        noVotes++;
        localStorage.setItem('noVotes', noVotes);
    }

    // حساب النسب
    let totalVotes = yesVotes + noVotes;
    let yesPercentage = totalVotes === 0 ? 0 : (yesVotes / totalVotes) * 100;
    let noPercentage = totalVotes === 0 ? 0 : (noVotes / totalVotes) * 100;

    // تحديث الإحصائيات في الصفحة
    document.getElementById('yes-votes').innerText = yesVotes;
    document.getElementById('no-votes').innerText = noVotes;
    document.getElementById('yes-votes-percentage').innerText = yesPercentage.toFixed(2) + '%';
    document.getElementById('no-votes-percentage').innerText = noPercentage.toFixed(2) + '%';
}
