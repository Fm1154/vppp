document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const nextButton = document.getElementById('next-button');
    const canvas = document.getElementById('lineCanvas');
    const ctx = canvas.getContext('2d');
    const schoolNames = [
        "Maternelle Clemenceau",
        "Primaire Clemenceau",
        "Collège Louis Armand",
        "Lycée Stanislas",
        "IUT Charlemagne"
    ];
    const audio = document.getElementById('background-music');
    let currentStep = 0;
    let musicPlayed = false;  

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawLine(x1, y1, x2, y2) {
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function showNextStep() {
        if (currentStep < steps.length - 1) {
            if (!musicPlayed) {
                audio.play();  
                musicPlayed = true; 
            }

            const currentImg = steps[currentStep];
            const nextImg = steps[currentStep + 1];

            const rect1 = currentImg.getBoundingClientRect();
            const rect2 = nextImg.getBoundingClientRect();
            drawLine(
                rect1.left + rect1.width / 2,
                rect1.top + rect1.height / 2,
                rect2.left + rect2.width / 2,
                rect2.top + rect2.height / 2
            );

            nextImg.style.opacity = 1;
            const schoolName = document.createElement('div');
            schoolName.textContent = schoolNames[currentStep + 1];
            schoolName.style.position = 'absolute';
            schoolName.style.left = `${rect2.left}px`;
            schoolName.style.top = `${rect2.top - 40}px`; 
            schoolName.style.color = '#FFF';
            schoolName.style.fontSize = '18px';
            schoolName.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.7)';
            schoolName.style.zIndex = '3'; 
            document.body.appendChild(schoolName);

            currentStep++;
        } else {
            nextButton.style.display = 'none';
            window.location.href = 'moi.html';
        }
    }

    const firstSchoolName = document.createElement('div');
    firstSchoolName.textContent = schoolNames[0];
    firstSchoolName.style.position = 'absolute';
    firstSchoolName.style.left = `${steps[0].getBoundingClientRect().left}px`;
    firstSchoolName.style.top = `${steps[0].getBoundingClientRect().top - 40}px`; 
    firstSchoolName.style.color = '#FFF';
    firstSchoolName.style.fontSize = '18px';
    firstSchoolName.style.textShadow = '0 0 5px rgba(0, 0, 0, 0.7)';
    firstSchoolName.style.zIndex = '1'; 
    document.body.appendChild(firstSchoolName);

    steps[0].style.opacity = 1;
    nextButton.addEventListener('click', showNextStep);
    audio.volume = 0.1;  

});
