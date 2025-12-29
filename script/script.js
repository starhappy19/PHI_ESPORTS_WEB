// Assurer que le contenu n'est pas caché derrière la bannière fixe
(function () {
	function adjustPadding() {
		var banner = document.querySelector('.banniere');
		var content = document.querySelector('.page-content') || document.body;
		if (!banner) return;
		var h = banner.getBoundingClientRect().height;
		// appliquer le padding à la zone de contenu pour que le contenu de la page commence en dessous de la bannière
		content.style.paddingTop = h + 'px';
	}

	function onScroll() {
		var banner = document.querySelector('.banniere');
		if (!banner) return;
		if (window.scrollY > 6) banner.classList.add('scrolled'); else banner.classList.remove('scrolled');

		// Effet parallaxe pour la vidéo héros
		var video = document.querySelector('.hero-video');
		if (video) {
			var parallaxY = window.scrollY * 0.8; // ajuster la vitesse si nécessaire
			video.style.transform = 'translate(-50%, -50%) translateY(' + parallaxY + 'px)';
		}
		if (video && window.innerWidth > 768) {
  			var parallaxY = window.scrollY * 0.8;
  			video.style.transform =
    			'translate(-50%, -50%) translateY(' + parallaxY + 'px)';
}
	}

	window.addEventListener('load', function () {
		adjustPadding();
		onScroll();
		adjustHeroHeight();
	});
	document.addEventListener('DOMContentLoaded', function () {
	  adjustHeroHeight();
	});
	window.addEventListener('resize', adjustPadding);
	window.addEventListener('resize', adjustHeroHeight);
	window.addEventListener('scroll', onScroll);
})();

	// Animer le logo BS lorsqu'il entre dans la fenêtre d'affichage (ou au chargement comme solution de secours)
	(function() {
		function revealBsLogo() {
			var logo = document.getElementById('bslogo');
			if (!logo) return;

			// Si IntersectionObserver est supporté, l'utiliser pour déclencher l'animation quand visible
			if ('IntersectionObserver' in window) {
				var obs = new IntersectionObserver(function(entries, observer) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							logo.classList.add('bslogo--enter');
							observer.disconnect();
						}
					});
				}, { threshold: 0.2 });
				obs.observe(logo);
			} else {
				// solution de secours : animer au chargement après un court délai
				window.addEventListener('load', function() { setTimeout(function() { logo.classList.add('bslogo--enter'); }, 320); });
			}
		}

		// exécuter la routine de révélation
		revealBsLogo();
	})();

function adjustHeroHeight() {
  var banner = document.querySelector('.banniere');
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var bannerH = banner ? banner.getBoundingClientRect().height : 0;
  // définir la hauteur en ligne pour que le héros remplisse initialement la fenêtre d'affichage en dessous de la bannière
  hero.style.height = (window.innerHeight - bannerH) + 'px';
}

// Gestionnaire de clic du bouton TikTok
(function() {
    const tiktokBtn = document.querySelector('.tiktok-btn');
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', function() {
            window.open('https://www.tiktok.com/@star_happy19', '_blank');
        });
    }
})();

(function() {
    const tiktokBtn = document.querySelector('.tiktok-btn2');
    if (tiktokBtn) {
        tiktokBtn.addEventListener('click', function() {
            window.open('https://www.tiktok.com/@jules_crrls', '_blank');
        });
    }
})();

// Sélection de la vidéo par son ID
const video = document.getElementById('hero-video');

// Essayer de lancer la vidéo automatiquement
video.play().catch((error) => {
    // Si iOS bloque l'autoplay (même muted), cette erreur sera attrapée
    console.log("Autoplay bloqué sur iOS, l'utilisateur doit appuyer sur la vidéo pour la lancer.");
});

// Ajouter un écouteur pour démarrer la vidéo dès le premier contact utilisateur
document.addEventListener('touchstart', () => {
    if (video.paused) {
        video.play().catch(() => {
            console.log("La vidéo n'a pas pu démarrer automatiquement.");
        });
    }
}, { once: true });

// Optionnel : permettre de cliquer sur la vidéo pour la lancer
video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    }
});