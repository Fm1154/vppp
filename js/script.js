document.querySelector('.start-button').addEventListener('click', function() {
    const button = this;
    const textElement = document.getElementById('text');
    const audio = document.getElementById('audio');
    const speedControl = document.getElementById('speed');
    const volumeControl = document.getElementById('volume');
    const nextButton = document.getElementById('next-button');
    const skipButton = document.getElementById('skip-button');
    const text = `Je m'appelle Fahim Meziani, j'ai 18 ans et je vis à Nancy, ma ville natale. J'ai des origines algériennes, kabyles plus précisément, du côté de Béjaïa. Mon parcours scolaire a commencé à l'école Clemenceau, où j'ai fait mes années de maternelle et de primaire. Ensuite, j'ai continué au collège Louis Armand, où j'ai eu mon brevet avec mention Très Bien, même si je n'avais pas vraiment révisé, ce qui m'a donné confiance en moi. Au lycée Stanislas, que j'ai intégré sous dérogation à Villers-lès-Nancy, pour suivre la spécialité NSI (Numérique et Sciences Informatiques) parce que j'étais déjà très passionné par l'informatique. J'ai obtenu mon bac général avec une moyenne de 11,69, toujours sans réviser. En plus de l'informatique, je suis également passionné par le foot et le basket, que je pratique régulièrement avec des amis. Côté informatique, j'adore créer des bots, des scripts pour des jeux vidéo, et développer des sites web. Actuellement, je suis en première année à l'IUT Charlemagne en informatique, même si je suis un peu déçu par l'approche très théorique des cours. J'aurais préféré avoir plus de projets concrets pour vraiment mettre en pratique ce que j'apprends. À l'avenir, j'aimerais me tourner vers des domaines comme la cybersécurité ou l'intelligence artificielle, qui me passionnent et dans lesquels je me vois bien évoluer professionnellement.`;

    let index = 0;
    let typingInterval;
    let isSkipping = false;
    const keywords = [
        { word: "algériennes", image: "images/dz.svg", triggered: false },
        { word: "Clemenceau", image: "images/primaire.jpg", triggered: false },
        { word: "Louis Armand", image: "images/college.jpg", triggered: false },
        { word: "Stanislas", image: "images/lycee.jpg", triggered: false },
        { word: "foot", image: "images/foot.jpg", triggered: false },
        { word: "informatique", image: "images/info.jpeg", triggered: false },
        { word: "Charlemagne", image: "images/iut.jpg", triggered: false },
        { word: "intelligence artificielle", image: "images/ia.jpeg", triggered: false }
    ];
    button.style.display = 'none';
    textElement.style.display = 'block';
    speedControl.addEventListener('change', function() {
        audio.playbackRate = parseFloat(this.value);
    });

    volumeControl.addEventListener('input', function() {
        audio.volume = parseFloat(this.value);
    });
    audio.play();
    function changeBackground(imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
    }

    function typeWriter() {
        if (index < text.length && !isSkipping) {
            textElement.textContent += text.charAt(index);
            const currentText = textElement.textContent;
            keywords.forEach(keyword => {
                if (!keyword.triggered && currentText.includes(keyword.word)) {
                    console.log(`Affichage de l'image pour '${keyword.word}'`);
                    changeBackground(keyword.image);
                    keyword.triggered = true; 
                }
            });

            index++;
            typingInterval = setTimeout(typeWriter, 100 / audio.playbackRate);
        } else {
            nextButton.style.display = 'flex';
        }
    }

    typeWriter();

    skipButton.addEventListener('click', function(e) {
        e.preventDefault();
        isSkipping = true;

        audio.pause();
        audio.currentTime = 0;

        textElement.textContent = text;
        clearTimeout(typingInterval);

        document.body.style.backgroundImage = '';

        nextButton.style.display = 'flex';
    });
});
