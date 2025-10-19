class TypewriterEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            pauseTime: 2000,
            loop: true,
            ...options
        };
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

const texts = [
    "discret",
    "控えめな",
    "حصيف",
    "विवेकपूर्ण"
];

// Démarrer la musique dès que possible
let audioStarted = false;

function startAudio() {
    if (!audioStarted) {
        const audio = document.getElementById('background-music');
        if (audio) {
            audio.volume = 0.3;
            audio.muted = false;
            audio.play().then(() => {
                console.log('Musique démarrée');
                audioStarted = true;
            }).catch(e => {
                console.log('Erreur:', e);
            });
        }
    }
}

// Essayer de démarrer la musique immédiatement
startAudio();

// Ajouter un élément caché pour l'onglet Network
function addNetworkElement() {
    // Créer la popup Discord
    const discordPopup = document.createElement('div');
    discordPopup.id = 'discord-info';
    discordPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        color: #00ff00;
        padding: 30px;
        border: 2px solid #00ff00;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 18px;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 0 30px #00ff00;
        display: none;
        min-width: 300px;
    `;
    discordPopup.innerHTML = `
        <h3 style="margin-bottom: 15px; color: #00ff00;">🔍 Discord Info</h3>
        <p style="margin-bottom: 20px;">VotreNomDiscord#1234</p>
        <button onclick="this.parentElement.style.display='none'" style="
            background: #00ff00;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
        ">Fermer</button>
    `;
    document.body.appendChild(discordPopup);
    
    // Faire plusieurs requêtes qui apparaîtront dans Network
    setTimeout(() => {
        // Requête Discord principale
        fetch('https://discord.com/api/v9/users/@me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer discord-token-placeholder',
                'Content-Type': 'application/json'
            }
        }).catch(() => {
            // Cette requête va échouer mais apparaîtra dans Network
        });
        
        // Requête alternative pour être sûr qu'elle apparaisse
        fetch('https://discord.com/api/v9/gateway', {
            method: 'GET'
        }).catch(() => {});
        
        // Requête avec un nom personnalisé
        fetch('https://discord.com/api/v9/users/JE-MEN-FOUS-DE-VOUS', {
            method: 'GET',
            headers: {
                'X-Discord-Info': 'true'
            }
        }).catch(() => {});
    }, 2000);
    
    // Créer un élément invisible cliquable pour déclencher la popup
    const hiddenTrigger = document.createElement('div');
    hiddenTrigger.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: transparent;
        cursor: pointer;
        display: none;
    `;
    hiddenTrigger.onclick = function() {
        const discordInfo = document.getElementById('discord-info');
        if (discordInfo) {
            discordInfo.style.display = 'block';
        }
        this.style.display = 'none';
    };
    document.body.appendChild(hiddenTrigger);
    
    // Afficher le trigger après 3 secondes
    setTimeout(() => {
        hiddenTrigger.style.display = 'block';
        // Le cacher après 5 secondes
        setTimeout(() => {
            hiddenTrigger.style.display = 'none';
        }, 5000);
    }, 3000);
    
    // Intercepter les clics sur les éléments Network (approche alternative)
    document.addEventListener('click', function(e) {
        // Si on clique sur un élément qui ressemble à une requête Discord
        if (e.target.textContent && e.target.textContent.includes('discord.com')) {
            const discordInfo = document.getElementById('discord-info');
            if (discordInfo) {
                discordInfo.style.display = 'block';
            }
        }
    });
}

// Lancer la fonction après le chargement
setTimeout(addNetworkElement, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-text');
    const typewriter = new TypewriterEffect(typingElement, texts);
    typewriter.start();
    
    // Essayer de démarrer la musique après le chargement
    setTimeout(startAudio, 100);
    
    // Essayer de démarrer la musique au premier mouvement de souris
    document.addEventListener('mousemove', startAudio, { once: true });
    
    // Essayer de démarrer la musique au premier clic
    document.addEventListener('click', startAudio, { once: true });
    
    // Essayer de démarrer la musique au premier appui de touche
    document.addEventListener('keydown', startAudio, { once: true });
});
