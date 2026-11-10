// ============================================================================
// BASE DE DONNÉES : Nomenclature officielle 2026-2027 (Génie chimique)
// ============================================================================
const nomenclatureCours = [
    "GCH1110 - Analyse des procédés et développement durable",
    "GCH1122 - Introduction au génie chimique",
    "GCH1140 - Travail en équipe et projet de génie chimique",
    "GCH1220 - Conception environnementale et cycle de vie",
    "GCH1511 - Thermodynamique",
    "GCH1530 - Chimie organique",
    "GCH2120 - Dynamique des systèmes",
    "GCH2205 - Bioprocédés",
    "GCH2401 - Évaluation économique des projets d'ingénierie",
    "GCH2525 - Thermodynamique chimique",
    "GCH2545 - Modélisation numérique en ingénierie",
    "GCH2550 - Projet de modélisation numérique",
    "GCH2565 - Méthodes expérimentales, instrumentation et acquisition de données",
    "GCH3001 - Stratégies de communication en génie chimique",
    "GCH3000A - Ateliers communication écrite et orale",
    "GCH3000I - Épreuves initiales de communication",
    "GCH3100A - Opérations unitaires",
    "GCH3100C - Projet d'opérations unitaires",
    "GCH3105 - Matériaux polymères",
    "GCH3110 - Calcul des réacteurs chimiques",
    "GCH3135 - Électrochimie et procédés électrolytiques",
    "GCH3515 - Phénomènes d'échanges",
    "GCH3521 - Mécanismes transfert opérations unitaires",
    "GCH3545 - Modélisation numérique en ingénierie",
    "GCH8270 - Laboratoires d'opérations unitaires",
    "GCH8271 - Conception et synthèse des procédés",
    "GCH8272 - Projet de conception et analyse d'impact",
    "GCH8274 - Biofabrication industrielle de thérapeutiques",
    "GCH8275 - Génie de la biofabrication",
    "GCH8276 - Travaux pratiques de biofabrication",
    "GCH8391 - Projet individuel en génie chimique",
    "GCH8615 - Règlementation des procédés propres",
    "GBM1610 - Biochimie pour ingénieur",
    "GBM1620 - Biologie moléculaire et cellulaire pour ingénieur",
    "INF1005D - Programmation procédurale en Python",
    "ING8971 - Projet intégrateur final",
    "MEC1315 - Technologies informationnelles en ingénierie",
    "MTH1008 - Algèbre linéaire appliquée",
    "MTH1105 - Éléments de calcul pour le génie",
    "MTH1115 - Équations différentielles",
    "MTH2302B - Probabilités et statistiques",
    "MTR1035C - Matériaux",
    "PHS1101 - Mécanique pour ingénieurs",
    "SSH3101 - Analyse sociologique de la technologie",
    "SSH3201 - Économique de l'ingénieur",
    "SSH3501 - Éthique appliquée à l'ingénierie",
    "Cours de spécialisation"
];

// Matrice des trimestres selon l'organigramme 2026-2027
const coursParSession = {
    1: ["GCH1110 - Analyse des procédés et développement durable", "GCH1122 - Introduction au génie chimique", "GCH1511 - Thermodynamique", "MTH1105 - Éléments de calcul pour le génie", "MTR1035C - Matériaux"],
    2: ["GCH1140 - Travail en équipe et projet de génie chimique", "GCH1220 - Conception environnementale et cycle de vie", "GCH1530 - Chimie organique", "INF1005D - Programmation procédurale en Python", "MTH1008 - Algèbre linéaire appliquée"],
    3: ["GCH2120 - Dynamique des systèmes", "GCH2205 - Bioprocédés", "GCH2525 - Thermodynamique chimique", "MEC1315 - Technologies informationnelles en ingénierie", "MTH1115 - Équations différentielles"],
    4: ["GCH2401 - Évaluation économique des projets d'ingénierie", "GCH2550 - Projet de modélisation numérique", "GCH2565 - Méthodes expérimentales, instrumentation et acquisition de données", "GCH3515 - Phénomènes d'échanges", "PHS1101 - Mécanique pour ingénieurs"],
    5: ["GCH3110 - Calcul des réacteurs chimiques", "GCH3135 - Électrochimie et procédés électrolytiques", "GCH3521 - Mécanismes transfert opérations unitaires", "GCH3545 - Modélisation numérique en ingénierie", "MTH2302B - Probabilités et statistiques", "SSH3501 - Éthique appliquée à l'ingénierie"],
    6: ["GCH3001 - Stratégies de communication en génie chimique", "GCH3100A - Opérations unitaires", "GCH3100C - Projet d'opérations unitaires"],
    7: ["GCH3105 - Matériaux polymères", "GCH8270 - Laboratoires d'opérations unitaires", "GCH8271 - Conception et synthèse des procédés"],
    8: ["SSH3101 - Analyse sociologique de la technologie", "ING8971 - Projet intégrateur final"]
};

// Délimiteur de rétrocompatibilité
const DELIMITEUR_CELLULE = " ; ";

// ============================================================================
// SOUS-SYSTÈME TRANSVERSAL DE RÉTROACTION UTILISATEUR (Toasts & Animations)
// ============================================================================
let minuteurToast = null;

function afficherToast(message, type = 'succes') {
    let conteneur = document.getElementById('conteneur-toast');
    if (!conteneur) {
        conteneur = document.createElement('div');
        conteneur.id = 'conteneur-toast';
        conteneur.setAttribute('role', 'status');
        conteneur.setAttribute('aria-live', 'polite');
        document.body.appendChild(conteneur);
    }

    conteneur.className = `toast-notification toast-${type} visible`;
    conteneur.textContent = message;

    if (minuteurToast) clearTimeout(minuteurToast);
    minuteurToast = setTimeout(() => {
        conteneur.classList.remove('visible');
    }, 2800);
}

function declencherAnimation(element, classeAnimation) {
    if (!element) return;
    element.classList.remove(classeAnimation);
    void element.offsetWidth; // Force le recalcul du DOM (reflow) pour relancer l'animation
    element.classList.add(classeAnimation);
}

document.addEventListener('DOMContentLoaded', () => {

    // ========================================================================
    // 1. LOGIQUE DE LA PAGE D'ACCUEIL (index.html)
    // ========================================================================
    const zoneJetons = document.getElementById('zone-jetons');
    if (zoneJetons) {
        const barreRecherche = document.getElementById('barre-recherche');
        const boiteSuggestions = document.getElementById('suggestions');
        const btnValider = document.getElementById('btn-valider-selection');
        const btnVider = document.getElementById('btn-vider-cours');
        const erreurId = document.getElementById('erreur-identification');
        const champPrenom = document.getElementById('prenom');
        const champNom = document.getElementById('nom');
        const champCourriel = document.getElementById('courriel');

        // Réinitialisation complète à l'ouverture de la page
        let coursSelectionnes = [];
        try {
            localStorage.removeItem('coursAEvaluer');
            localStorage.removeItem('etudiant');
            localStorage.removeItem('brouillonEvaluations');
        } catch (e) {}

        champPrenom.value = '';
        champNom.value = '';
        champCourriel.value = '';

        // --- Rétroaction en temps réel sur les champs d'identification ---
        const estCourrielValide = (courriel) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel);

        function actualiserEtatChampId(champ) {
            const valeur = champ.value.trim();
            if (valeur.length === 0) {
                champ.classList.remove('champ-valide', 'champ-erreur');
                return false;
            }
            const valide = (champ.type === 'email') ? estCourrielValide(valeur) : valeur.length >= 2;
            if (valide) {
                champ.classList.add('champ-valide');
                champ.classList.remove('champ-erreur');
            } else {
                champ.classList.remove('champ-valide');
            }
            if (champPrenom.value.trim() && champNom.value.trim() && estCourrielValide(champCourriel.value.trim())) {
                erreurId.classList.add('masque');
            }
            return valide;
        }

        [champPrenom, champNom, champCourriel].forEach(champ => {
            champ.addEventListener('input', () => actualiserEtatChampId(champ));
            champ.addEventListener('blur', () => {
                const valeur = champ.value.trim();
                if (valeur.length > 0 && !actualiserEtatChampId(champ)) {
                    champ.classList.add('champ-erreur');
                }
            });
        });

        // --- Synchronisation visuelle de l'état des boutons de session ---
        function synchroniserBoutonsSession() {
            document.querySelectorAll('.btn-session').forEach(btn => {
                const session = btn.getAttribute('data-session');
                const listeCours = coursParSession[session] || [];
                const tousPresents = listeCours.length > 0 && listeCours.every(c => coursSelectionnes.includes(c));
                if (tousPresents) {
                    btn.classList.add('session-active');
                    btn.textContent = `✓ Session ${session}`;
                } else {
                    btn.classList.remove('session-active');
                    btn.textContent = `Session ${session}`;
                }
            });
        }

        // --- Ajout rapide par session avec défilement automatique vers le bas ---
        document.querySelectorAll('.btn-session').forEach(btn => {
            btn.addEventListener('click', () => {
                const session = btn.getAttribute('data-session');
                const listeCours = coursParSession[session];
                if (listeCours) {
                    const nouveauxSigles = [];
                    listeCours.forEach(cours => {
                        if (!coursSelectionnes.includes(cours)) {
                            coursSelectionnes.push(cours);
                            nouveauxSigles.push(cours.split(' - ')[0]);
                        }
                    });

                    rendreJetons(nouveauxSigles);
                    declencherAnimation(zoneJetons, 'flash-zone');

                    if (nouveauxSigles.length > 0) {
                        afficherToast(`Session ${session} : ${nouveauxSigles.length} cours ajouté${nouveauxSigles.length > 1 ? 's' : ''}`, 'succes');
                    } else {
                        afficherToast(`Tous les cours de la Session ${session} sont déjà sélectionnés`, 'info');
                    }

                    // Défilement fluide vers la zone de sélection et le bouton de validation au bas de la page
                    setTimeout(() => {
                        btnValider.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 80);
                }
            });
        });

        // --- Moteur d'autocomplétion avec navigation clavier complète ---
        let indexSuggestionActive = 0;

        function mettreAJourSuggestionActive(items) {
            items.forEach((item, idx) => {
                if (idx === indexSuggestionActive) {
                    item.classList.add('actif');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('actif');
                }
            });
        }

        if (barreRecherche) {
            barreRecherche.addEventListener('input', function () {
                const requete = this.value.toLowerCase().trim();
                boiteSuggestions.innerHTML = '';
                indexSuggestionActive = 0;

                if (requete.length === 0) {
                    boiteSuggestions.style.display = 'none';
                    return;
                }

                const resultats = nomenclatureCours.filter(cours =>
                    cours.toLowerCase().includes(requete) && !coursSelectionnes.includes(cours)
                );

                if (resultats.length > 0) {
                    boiteSuggestions.style.display = 'block';
                    resultats.forEach((cours, index) => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        if (index === 0) div.classList.add('actif');
                        div.textContent = cours;

                        div.addEventListener('click', () => {
                            const sigle = cours.split(' - ')[0];
                            coursSelectionnes.push(cours);
                            barreRecherche.value = '';
                            boiteSuggestions.style.display = 'none';
                            rendreJetons([sigle]);
                            declencherAnimation(zoneJetons, 'flash-zone');
                            afficherToast(`${sigle} ajouté à votre sélection`, 'succes');
                        });
                        boiteSuggestions.appendChild(div);
                    });
                } else {
                    // Rétroaction explicite lorsqu'aucun cours ne correspond
                    boiteSuggestions.style.display = 'block';
                    const vide = document.createElement('div');
                    vide.className = 'suggestion-vide';
                    vide.textContent = "Aucun cours trouvé (utilisez l'ajout manuel ci-dessous).";
                    boiteSuggestions.appendChild(vide);
                }
            });

            barreRecherche.addEventListener('keydown', function (e) {
                const items = boiteSuggestions.querySelectorAll('.suggestion-item');
                if (boiteSuggestions.style.display === 'block' && items.length > 0) {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        indexSuggestionActive = (indexSuggestionActive + 1) % items.length;
                        mettreAJourSuggestionActive(items);
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        indexSuggestionActive = (indexSuggestionActive - 1 + items.length) % items.length;
                        mettreAJourSuggestionActive(items);
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        const choix = items[indexSuggestionActive] || items[0];
                        if (choix) choix.click();
                    } else if (e.key === 'Escape') {
                        boiteSuggestions.style.display = 'none';
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    declencherAnimation(barreRecherche, 'secousse-erreur');
                }
            });

            // Fermeture des suggestions au clic externe
            document.addEventListener('click', (e) => {
                if (!barreRecherche.contains(e.target) && !boiteSuggestions.contains(e.target)) {
                    boiteSuggestions.style.display = 'none';
                }
            });
        }

        // --- Tiroir d'ajout manuel avec rétroaction intégrée ---
        const btnOuvrirManuel = document.getElementById('btn-ouvrir-manuel');
        const tiroirManuel = document.getElementById('tiroir-ajout-manuel');
        const champSigleManuel = document.getElementById('champ-sigle-manuel');
        const btnConfirmerManuel = document.getElementById('btn-confirmer-manuel');

        if (btnOuvrirManuel && tiroirManuel) {
            btnOuvrirManuel.addEventListener('click', () => {
                tiroirManuel.classList.toggle('masque');
                const estOuvert = !tiroirManuel.classList.contains('masque');
                btnOuvrirManuel.classList.toggle('session-active', estOuvert);
                if (estOuvert) {
                    champSigleManuel.focus();
                    tiroirManuel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });

            const ajouterSigleManuel = () => {
                const sigleBrut = champSigleManuel.value.trim().toUpperCase();
                if (!sigleBrut) {
                    champSigleManuel.classList.add('champ-erreur');
                    declencherAnimation(champSigleManuel, 'secousse-erreur');
                    afficherToast("Veuillez saisir un sigle de cours (ex. : GCH8000)", 'avertissement');
                    champSigleManuel.focus();
                    return;
                }

                champSigleManuel.classList.remove('champ-erreur');
                const sigleFormate = `${sigleBrut} - Ajout manuel`;
                const dejaPresent = coursSelectionnes.some(c => c.split(' - ')[0] === sigleBrut);

                if (!dejaPresent) {
                    coursSelectionnes.push(sigleFormate);
                    champSigleManuel.value = '';
                    tiroirManuel.classList.add('masque');
                    btnOuvrirManuel.classList.remove('session-active');
                    rendreJetons([sigleBrut]);
                    declencherAnimation(zoneJetons, 'flash-zone');
                    afficherToast(`${sigleBrut} ajouté manuellement`, 'succes');
                    setTimeout(() => {
                        btnValider.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    }, 80);
                } else {
                    declencherAnimation(champSigleManuel, 'secousse-erreur');
                    afficherToast(`Le sigle ${sigleBrut} figure déjà dans votre liste`, 'info');
                    champSigleManuel.select();
                }
            };

            btnConfirmerManuel.addEventListener('click', ajouterSigleManuel);
            champSigleManuel.addEventListener('input', () => champSigleManuel.classList.remove('champ-erreur'));
            champSigleManuel.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    ajouterSigleManuel();
                }
            });
        }

        // --- Bouton pour vider la sélection ---
        if (btnVider) {
            btnVider.addEventListener('click', () => {
                const total = coursSelectionnes.length;
                coursSelectionnes = [];
                rendreJetons();
                declencherAnimation(zoneJetons, 'flash-zone');
                afficherToast(`${total} cours retiré${total > 1 ? 's' : ''} de la sélection`, 'info');
            });
        }

        window.retirerCours = function (cours, elementJeton) {
            const sigle = cours.split(' - ')[0];
            if (elementJeton) {
                elementJeton.classList.add('jeton-sortie');
                setTimeout(() => {
                    coursSelectionnes = coursSelectionnes.filter(c => c !== cours);
                    rendreJetons();
                    afficherToast(`${sigle} retiré`, 'info');
                }, 160);
            } else {
                coursSelectionnes = coursSelectionnes.filter(c => c !== cours);
                rendreJetons();
                afficherToast(`${sigle} retiré`, 'info');
            }
        };

        function rendreJetons(nouveauxSigles = []) {
            zoneJetons.innerHTML = '';
            synchroniserBoutonsSession();

            if (coursSelectionnes.length === 0) {
                zoneJetons.innerHTML = '<span style="color: #6c7a70; font-style: italic;">Aucun cours sélectionné pour le moment.</span>';
                btnValider.classList.add('masque');
                if (btnVider) btnVider.classList.add('masque');
                return;
            }

            btnValider.classList.remove('masque');
            btnValider.textContent = `Passer à l'évaluation (${coursSelectionnes.length} cours) →`;
            if (btnVider) btnVider.classList.remove('masque');

            coursSelectionnes.forEach(cours => {
                const jeton = document.createElement('div');
                const sigle = cours.split(' - ')[0];
                jeton.className = nouveauxSigles.includes(sigle) ? 'jeton jeton-nouveau' : 'jeton';

                const texteJeton = document.createTextNode(sigle + ' ');
                jeton.appendChild(texteJeton);

                const btnSupprimer = document.createElement('button');
                btnSupprimer.type = 'button';
                btnSupprimer.className = 'bouton-supprimer';
                btnSupprimer.setAttribute('aria-label', `Retirer ${sigle}`);
                btnSupprimer.textContent = '✖';
                btnSupprimer.addEventListener('click', () => retirerCours(cours, jeton));

                jeton.appendChild(btnSupprimer);
                zoneJetons.appendChild(jeton);
            });
        }

        // --- Validation de l'identification et passage à l'assistant ---
        btnValider.addEventListener('click', () => {
            const prenom = champPrenom.value.trim();
            const nom = champNom.value.trim();
            const courriel = champCourriel.value.trim();

            let premierChampInvalide = null;
            [
                { champ: champPrenom, valide: prenom.length >= 2 },
                { champ: champNom, valide: nom.length >= 2 },
                { champ: champCourriel, valide: estCourrielValide(courriel) }
            ].forEach(({ champ, valide }) => {
                if (!valide) {
                    champ.classList.add('champ-erreur');
                    champ.classList.remove('champ-valide');
                    declencherAnimation(champ, 'secousse-erreur');
                    if (!premierChampInvalide) premierChampInvalide = champ;
                } else {
                    champ.classList.add('champ-valide');
                    champ.classList.remove('champ-erreur');
                }
            });

            if (premierChampInvalide) {
                erreurId.textContent = (!prenom || !nom || !courriel)
                    ? "Veuillez remplir l'intégralité des champs d'identification (Prénom, Nom et Courriel) avant de continuer."
                    : "Veuillez vérifier le format de votre adresse courriel (ex. : prenom.nom@polymtl.ca).";
                erreurId.classList.remove('masque');
                document.getElementById('bloc-identification').scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => premierChampInvalide.focus(), 350);
                return;
            }

            erreurId.classList.add('masque');
            btnValider.textContent = "Ouverture du questionnaire...";
            btnValider.disabled = true;

            const etudiantData = { prenom, nom, courriel };
            localStorage.setItem('etudiant', JSON.stringify(etudiantData));
            localStorage.setItem('coursAEvaluer', JSON.stringify(coursSelectionnes));
            window.location.href = 'assistant.html';
        });

        rendreJetons();
    }

    // ========================================================================
    // 2. LOGIQUE DE LA PAGE D'ÉVALUATION (assistant.html)
    // ========================================================================
    const conteneurPiste = document.getElementById('piste-jetons');
    if (conteneurPiste) {
        let coursAEvaluer = [];
        try {
            const coursAEvaluerData = localStorage.getItem('coursAEvaluer');
            coursAEvaluer = coursAEvaluerData ? JSON.parse(coursAEvaluerData) : [];
        } catch (e) {
            coursAEvaluer = [];
        }

        if (coursAEvaluer.length === 0) {
            window.location.href = 'index.html';
            return;
        }

        const siglesAEvaluer = coursAEvaluer.map(c => c.split(' - ')[0]);
        const intitulesAEvaluer = coursAEvaluer.map(c => {
            const parties = c.split(' - ');
            return parties.length > 1 ? parties.slice(1).join(' - ') : c;
        });

        let indexCourant = 0;
        let baseDeDonneesLocale = {};
        let sortieAutorisee = false;

        const form = document.getElementById('formulaire-cours');
        const checkboxIaAutre = document.getElementById('checkbox-ia-autre');
        const champIaAutre = document.getElementById('champ-ia-autre');
        const champForce = document.getElementById('champ-force');
        const checkboxForceNa = document.getElementById('checkbox-force-na');
        const champAmeliorations = document.getElementById('champ-ameliorations');
        const checkboxAmeliorationsNa = document.getElementById('checkbox-ameliorations-na');

        // --- Évaluation de la complétion individuelle d'un bloc question (Q1 à Q12) ---
        function estQuestionRepondue(idBloc) {
            const correspondanceRadio = {
                'bloc-q1': 'motivation',
                'bloc-q2': 'charge',
                'bloc-q3': 'consolidation',
                'bloc-q4': 'clarte_livrables',
                'bloc-q5': 'clarte_examens',
                'bloc-q6': 'delai_correction',
                'bloc-q7': 'plateforme_moodle',
                'bloc-q8': 'quantite_exercices',
                'bloc-q9': 'frequence_ia'
            };

            if (correspondanceRadio[idBloc]) {
                return Boolean(form.querySelector(`input[name="${correspondanceRadio[idBloc]}"]:checked`));
            }
            if (idBloc === 'bloc-q10') {
                const coches = form.querySelectorAll('input[name="raisons_ia"]:checked');
                if (coches.length === 0) return false;
                if (checkboxIaAutre && checkboxIaAutre.checked && champIaAutre.value.trim() === '') return false;
                return true;
            }
            if (idBloc === 'bloc-q11') {
                return champForce.value.trim().length > 0 || checkboxForceNa.checked;
            }
            if (idBloc === 'bloc-q12') {
                return champAmeliorations.value.trim().length > 0 || checkboxAmeliorationsNa.checked;
            }
            return false;
        }

        // --- Détection de réponses déjà saisies (sur le cours actif ou un cours précédent) ---
        function aDesReponsesSaisies() {
            for (let i = 1; i <= 12; i++) {
                if (estQuestionRepondue(`bloc-q${i}`)) return true;
            }
            return Object.keys(baseDeDonneesLocale).some(sigle => {
                const d = baseDeDonneesLocale[sigle];
                if (!d) return false;
                const radios = [
                    'motivation', 'charge', 'consolidation', 'clarte_livrables',
                    'clarte_examens', 'delai_correction', 'plateforme_moodle',
                    'quantite_exercices', 'frequence_ia'
                ];
                if (radios.some(r => d[r] !== null && d[r] !== undefined)) return true;
                if (d._ui) {
                    if (Array.isArray(d._ui.q10_coches) && d._ui.q10_coches.length > 0) return true;
                    if (d._ui.q11_na || d._ui.q11_texte || d._ui.q12_na || d._ui.q12_texte) return true;
                }
                return false;
            });
        }

        // --- Sous-système de confirmation avant retour à la sélection des cours ---
        function demanderConfirmationModificationCours(urlDestination = 'index.html') {
            try {
                let modale = document.getElementById('modale-confirmation-retour');
                if (!modale) {
                    modale = document.createElement('div');
                    modale.id = 'modale-confirmation-retour';
                    modale.className = 'modale-superposition masque';
                    modale.setAttribute('role', 'dialog');
                    modale.setAttribute('aria-modal', 'true');
                    modale.setAttribute('aria-labelledby', 'titre-modale-retour');
                    modale.innerHTML = `
                        <div class="modale-boite">
                            <h3 id="titre-modale-retour" class="modale-titre">Modifier votre choix de cours ?</h3>
                            <p class="modale-texte">
                                Attention : le retour à la page de sélection réinitialisera toutes les réponses déjà remplies dans ce questionnaire.
                            </p>
                            <div class="modale-actions">
                                <button type="button" id="btn-annuler-retour" class="btn-secondaire">
                                    Continuer l'évaluation
                                </button>
                                <button type="button" id="btn-confirmer-retour" class="btn-danger">
                                    Oui, modifier et effacer
                                </button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modale);

                    const fermerModale = () => {
                        modale.classList.add('masque');
                    };

                    document.getElementById('btn-annuler-retour').addEventListener('click', fermerModale);
                    modale.addEventListener('click', (e) => {
                        if (e.target === modale) fermerModale();
                    });
                    document.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape' && !modale.classList.contains('masque')) {
                            fermerModale();
                        }
                    });
                }

                const btnConfirmer = document.getElementById('btn-confirmer-retour');
                btnConfirmer.onclick = () => {
                    sortieAutorisee = true;
                    window.location.href = urlDestination;
                };

                modale.classList.remove('masque');
                const btnAnnuler = document.getElementById('btn-annuler-retour');
                if (btnAnnuler) setTimeout(() => btnAnnuler.focus(), 40);
            } catch (err) {
                // Contingence native si le DOM est restreint
                const confirmationNative = window.confirm(
                    "Attention : retourner à la sélection des cours effacera toutes les réponses déjà remplies. Voulez-vous vraiment continuer ?"
                );
                if (confirmationNative) {
                    sortieAutorisee = true;
                    window.location.href = urlDestination;
                }
            }
        }

        // --- Interception universelle du bouton « Modifier mon choix de cours » ---
        function initialiserVerrouModificationCours() {
            const selecteursCibles = [
                '#btn-modifier-cours',
                '#btn-retour-accueil',
                '.bandeau-progression a',
                '.bandeau-progression button',
                '.entete-progression a',
                '.entete-progression button',
                'a[href*="index.html"]'
            ];
            const elementsCibles = new Set(document.querySelectorAll(selecteursCibles.join(', ')));

            document.querySelectorAll('a, button').forEach(el => {
                const texte = (el.textContent || '').toLowerCase();
                const onclickAttr = (el.getAttribute('onclick') || '').toLowerCase();
                if (texte.includes('modifier') || onclickAttr.includes('index.html')) {
                    elementsCibles.add(el);
                }
            });

            elementsCibles.forEach(el => {
                const urlCible = el.getAttribute('href') || 'index.html';
                el.setAttribute('data-url-retour', urlCible);
                // Neutralise tout attribut onclick inline qui contournerait la confirmation
                el.removeAttribute('onclick');
                el.onclick = null;

                el.addEventListener('click', (e) => {
                    if (sortieAutorisee) return;
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    demanderConfirmationModificationCours(el.getAttribute('data-url-retour') || 'index.html');
                }, true);
            });

            // Protection complémentaire contre le bouton « Précédent » du navigateur ou l'actualisation accidentelle
            window.addEventListener('beforeunload', (e) => {
                if (!sortieAutorisee && aDesReponsesSaisies()) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            });
        }

        initialiserVerrouModificationCours();

        // --- Rétroaction visuelle sur chaque carte de question + barre de progression temps réel ---
        function actualiserFeedbackBlocsEtProgression() {
            const totalQuestions = 12;
            let reponduesCourant = 0;

            for (let i = 1; i <= totalQuestions; i++) {
                const idBloc = `bloc-q${i}`;
                const bloc = document.getElementById(idBloc);
                if (!bloc) continue;

                if (estQuestionRepondue(idBloc)) {
                    bloc.classList.add('question-repondue');
                    reponduesCourant++;
                } else {
                    bloc.classList.remove('question-repondue');
                }
            }

            // Progression granulaire continue (prend en compte les cours complétés + la fraction du cours actif)
            const fractionCoursActif = reponduesCourant / totalQuestions;
            const pourcentage = Math.min(100, ((indexCourant + fractionCoursActif) / siglesAEvaluer.length) * 100);
            const barre = document.getElementById('barre-remplissage');
            if (barre) {
                barre.style.width = `${pourcentage}%`;
            }
        }

        // --- Gestion de l'affichage et du focus du champ "Autre" de la Question 10 ---
        function synchroniserChampsAutre(donnerFocus = false) {
            if (checkboxIaAutre && champIaAutre) {
                if (checkboxIaAutre.checked) {
                    champIaAutre.classList.remove('masque');
                    if (donnerFocus) {
                        setTimeout(() => champIaAutre.focus(), 50);
                    }
                } else {
                    champIaAutre.classList.add('masque');
                    champIaAutre.value = '';
                }
            }
        }

        // --- Gestion de l'exclusivité mutuelle pour les cases à cocher (Q10) ---
        function configurerExclusiviteGroupe(nomGroupe) {
            const cases = Array.from(form.querySelectorAll(`input[name="${nomGroupe}"]`));
            const caseExclusive = cases.find(c => c.getAttribute('data-exclusif') === 'true');
            const casesStandards = cases.filter(c => c.getAttribute('data-exclusif') !== 'true');

            cases.forEach(c => {
                c.addEventListener('change', () => {
                    if (c === caseExclusive && caseExclusive.checked) {
                        casesStandards.forEach(std => { std.checked = false; });
                    } else if (c !== caseExclusive && c.checked && caseExclusive) {
                        caseExclusive.checked = false;
                    }
                    synchroniserChampsAutre(c === checkboxIaAutre && c.checked);
                    nettoyerErreurBloc(c.closest('.question-bloc'));
                    sauvegarderReponses();
                    actualiserFeedbackBlocsEtProgression();
                });
            });
        }

        configurerExclusiviteGroupe('raisons_ia');

        // --- Couplage intelligent bidirectionnel Q9 (Fréquence IA) <-> Q10 (Raisons IA) ---
        form.querySelectorAll('input[name="frequence_ia"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const caseNonUtilise = form.querySelector('input[name="raisons_ia"][data-exclusif="true"]');
                const blocQ10 = document.getElementById('bloc-q10');
                if (!caseNonUtilise) return;

                if (radio.value === '1' || radio.value === 'NA') {
                    // Si "Jamais" ou "S.O.", coche automatiquement "Je n'ai pas utilisé l'IA"
                    const etaitDecoche = !caseNonUtilise.checked;
                    caseNonUtilise.checked = true;
                    form.querySelectorAll('input[name="raisons_ia"]:not([data-exclusif="true"])').forEach(c => {
                        c.checked = false;
                    });
                    synchroniserChampsAutre(false);
                    nettoyerErreurBloc(blocQ10);

                    if (etaitDecoche) {
                        declencherAnimation(blocQ10, 'flash-couplage');
                        afficherToast("Question 10 ajustée automatiquement (« Aucune utilisation de l'IA »)", 'info');
                    }
                } else {
                    // Si une fréquence supérieure à 1 est choisie, décoche "Je n'ai pas utilisé l'IA" pour éviter toute contradiction
                    if (caseNonUtilise.checked) {
                        caseNonUtilise.checked = false;
                        declencherAnimation(blocQ10, 'flash-couplage');
                    }
                }
                sauvegarderReponses();
                actualiserFeedbackBlocsEtProgression();
            });
        });

        // --- Gestion symétrique des questions ouvertes avec échappatoire (Q11 et Q12) ---
        function configurerChampCommentaire(champTexte, caseNa, idBloc) {
            if (!champTexte || !caseNa) return;

            const synchroniserEtatVisuelCommentaire = () => {
                champTexte.classList.toggle('champ-desactive-visuel', caseNa.checked);
            };

            caseNa.addEventListener('change', () => {
                if (caseNa.checked) {
                    champTexte.value = '';
                } else {
                    champTexte.focus();
                }
                synchroniserEtatVisuelCommentaire();
                nettoyerErreurBloc(document.getElementById(idBloc));
                sauvegarderReponses();
                actualiserFeedbackBlocsEtProgression();
            });

            champTexte.addEventListener('focus', () => {
                if (caseNa.checked) {
                    caseNa.checked = false;
                    synchroniserEtatVisuelCommentaire();
                    actualiserFeedbackBlocsEtProgression();
                }
            });

            champTexte.addEventListener('input', () => {
                if (champTexte.value.trim().length > 0) {
                    caseNa.checked = false;
                }
                synchroniserEtatVisuelCommentaire();
                nettoyerErreurBloc(document.getElementById(idBloc));
                sauvegarderReponses();
                actualiserFeedbackBlocsEtProgression();
            });
        }

        configurerChampCommentaire(champForce, checkboxForceNa, 'bloc-q11');
        configurerChampCommentaire(champAmeliorations, checkboxAmeliorationsNa, 'bloc-q12');

        // Nettoyage automatique des erreurs et mise à jour de l'état dès qu'une réponse est fournie
        form.querySelectorAll('input[type="radio"], textarea').forEach(el => {
            el.addEventListener('change', () => {
                nettoyerErreurBloc(el.closest('.question-bloc'));
                sauvegarderReponses();
                actualiserFeedbackBlocsEtProgression();
            });
            if (el.tagName === 'TEXTAREA') {
                el.addEventListener('input', () => {
                    nettoyerErreurBloc(el.closest('.question-bloc'));
                    sauvegarderReponses();
                    actualiserFeedbackBlocsEtProgression();
                });
            }
        });

        function nettoyerErreurBloc(bloc) {
            if (!bloc) return;
            bloc.classList.remove('question-invalide');
            const msg = bloc.querySelector('.erreur-question');
            if (msg) msg.classList.add('masque');

            if (form.querySelectorAll('.question-invalide').length === 0) {
                document.getElementById('banniere-erreur-globale').classList.add('masque');
            }
        }

        function marquerErreurBloc(idBloc) {
            const bloc = document.getElementById(idBloc);
            if (!bloc) return;
            bloc.classList.remove('question-repondue');
            bloc.classList.add('question-invalide');
            declencherAnimation(bloc, 'secousse-erreur');
            const msg = bloc.querySelector('.erreur-question');
            if (msg) msg.classList.remove('masque');
        }

        // --- Validation stricte de l'intégralité des 12 questions ---
        function validerFormulaireCourant() {
            let premierBlocEnErreur = null;
            let nombreErreurs = 0;

            const enregistrerErreur = (idBloc) => {
                marquerErreurBloc(idBloc);
                nombreErreurs++;
                if (!premierBlocEnErreur) premierBlocEnErreur = document.getElementById(idBloc);
            };

            // Q1 à Q9 : Échelles de Likert
            const questionsRadio = [
                { nom: 'motivation', bloc: 'bloc-q1' },
                { nom: 'charge', bloc: 'bloc-q2' },
                { nom: 'consolidation', bloc: 'bloc-q3' },
                { nom: 'clarte_livrables', bloc: 'bloc-q4' },
                { nom: 'clarte_examens', bloc: 'bloc-q5' },
                { nom: 'delai_correction', bloc: 'bloc-q6' },
                { nom: 'plateforme_moodle', bloc: 'bloc-q7' },
                { nom: 'quantite_exercices', bloc: 'bloc-q8' },
                { nom: 'frequence_ia', bloc: 'bloc-q9' }
            ];

            questionsRadio.forEach(q => {
                const coche = form.querySelector(`input[name="${q.nom}"]:checked`);
                if (!coche) enregistrerErreur(q.bloc);
            });

            // Q10 : Raisons IA (au moins une case + précision obligatoire si "Autre")
            const cochesQ10 = form.querySelectorAll('input[name="raisons_ia"]:checked');
            if (cochesQ10.length === 0) {
                enregistrerErreur('bloc-q10');
            } else if (checkboxIaAutre.checked && champIaAutre.value.trim() === '') {
                enregistrerErreur('bloc-q10');
                setTimeout(() => champIaAutre.focus(), 400);
            }

            // Q11 : Principale force du cours ou échappatoire "Aucun commentaire"
            const texteQ11 = champForce.value.trim();
            if (texteQ11 === '' && !checkboxForceNa.checked) {
                enregistrerErreur('bloc-q11');
            }

            // Q12 : Pistes d'amélioration ou échappatoire "Aucun commentaire"
            const texteQ12 = champAmeliorations.value.trim();
            if (texteQ12 === '' && !checkboxAmeliorationsNa.checked) {
                enregistrerErreur('bloc-q12');
            }

            if (premierBlocEnErreur) {
                const banniere = document.getElementById('banniere-erreur-globale');
                banniere.textContent = `${nombreErreurs} question${nombreErreurs > 1 ? 's requièrent' : ' requiert'} votre attention avant de passer au cours suivant.`;
                banniere.classList.remove('masque');
                premierBlocEnErreur.scrollIntoView({ behavior: 'smooth', block: 'center' });
                afficherToast(`${nombreErreurs} question${nombreErreurs > 1 ? 's' : ''} à compléter`, 'avertissement');
                return false;
            }

            document.getElementById('banniere-erreur-globale').classList.add('masque');
            return true;
        }

        // --- Rendu de la barre de progression ---
        function genererPisteJetons() {
            conteneurPiste.innerHTML = '';
            const compteur = document.getElementById('compteur-cours');
            if (compteur) {
                compteur.textContent = `Cours ${indexCourant + 1} sur ${siglesAEvaluer.length}`;
            }

            siglesAEvaluer.forEach((sigle, index) => {
                const span = document.createElement('span');
                span.className = 'jeton-etat';
                if (index < indexCourant) {
                    span.classList.add('complete');
                    span.textContent = `✓ ${sigle}`;
                } else if (index === indexCourant) {
                    span.classList.add('actif');
                    span.textContent = `En cours : ${sigle}`;
                } else {
                    span.textContent = sigle;
                }
                conteneurPiste.appendChild(span);
            });
        }

        // --- Sauvegarde en mémoire vive et structuration atomique pour Google Sheets ---
        function sauvegarderReponses() {
            const sigle = siglesAEvaluer[indexCourant];
            const intitule = intitulesAEvaluer[indexCourant];

            // Convertit "1".."5" en entier numérique (1..5) pour calcul direct, et conserve "NA"
            const extraireRadioNumerique = (name) => {
                const el = form.querySelector(`input[name="${name}"]:checked`);
                if (!el) return null;
                if (el.value === 'NA') return 'NA';
                const num = parseInt(el.value, 10);
                return isNaN(num) ? el.value : num;
            };

            // Extraction binaire (1 ou 0) de chaque option de la Question 10
            const valeursQ10Brutes = Array.from(form.querySelectorAll('input[name="raisons_ia"]:checked')).map(cb => cb.value);
            const texteAutreQ10 = champIaAutre.value.trim();

            const ia_notes = valeursQ10Brutes.includes('notes') ? 1 : 0;
            const ia_tutorat = valeursQ10Brutes.includes('tutorat') ? 1 : 0;
            const ia_idees = valeursQ10Brutes.includes('idees') ? 1 : 0;
            const ia_demarche = valeursQ10Brutes.includes('demarche') ? 1 : 0;
            const ia_exercices = valeursQ10Brutes.includes('exercices') ? 1 : 0;
            const ia_travaux = valeursQ10Brutes.includes('travaux') ? 1 : 0;
            const ia_langue = valeursQ10Brutes.includes('langue') ? 1 : 0;
            const ia_aucune = valeursQ10Brutes.includes('aucune') ? 1 : 0;
            const ia_autre = valeursQ10Brutes.includes('autre') ? 1 : 0;
            const ia_autre_texte = ia_autre ? texteAutreQ10 : "";

            // Chaîne récapitulative pour lecture rapide
            const dictionnaireLabelsQ10 = {
                notes: "Résumer/expliquer notes",
                tutorat: "Rétroaction (style tutorat)",
                idees: "Générer des idées",
                demarche: "Démarche détaillée d'exercices",
                exercices: "Générer exercices supplémentaires",
                travaux: "Rédiger/coder/résoudre travaux",
                langue: "Réviser qualité de la langue",
                aucune: "Aucune utilisation",
                autre: ia_autre_texte ? `Autre : ${ia_autre_texte}` : "Autre"
            };
            const chaineRaisonsIaRetro = valeursQ10Brutes.map(v => dictionnaireLabelsQ10[v] || v).join(DELIMITEUR_CELLULE);

            // Extraction des questions ouvertes Q11 et Q12 (chaîne vide "" si "Aucun commentaire" est coché)
            const texteForce = champForce.value.trim();
            const valeurForce = checkboxForceNa.checked ? "" : texteForce;

            const texteAmeliorations = champAmeliorations.value.trim();
            const valeurAmeliorations = checkboxAmeliorationsNa.checked ? "" : texteAmeliorations;

            const valeurDelai = extraireRadioNumerique('delai_correction');

            baseDeDonneesLocale[sigle] = {
                // Métadonnées du cours
                sigle: sigle,
                intitule_cours: intitule,

                // Q1 à Q9 : Valeurs numériques (1 à 5) ou "NA"
                motivation: extraireRadioNumerique('motivation'),
                charge: extraireRadioNumerique('charge'),
                consolidation: extraireRadioNumerique('consolidation'),
                clarte_livrables: extraireRadioNumerique('clarte_livrables'),
                clarte_examens: extraireRadioNumerique('clarte_examens'),
                delai_correction: valeurDelai,
                criteres_correction: valeurDelai, // Alias de rétrocompatibilité
                plateforme_moodle: extraireRadioNumerique('plateforme_moodle'),
                quantite_exercices: extraireRadioNumerique('quantite_exercices'),
                frequence_ia: extraireRadioNumerique('frequence_ia'),

                // Q10 : Colonnes binaires séparées (1 ou 0) + colonne texte dédiée pour "Autre"
                ia_notes: ia_notes,
                ia_tutorat: ia_tutorat,
                ia_idees: ia_idees,
                ia_demarche: ia_demarche,
                ia_exercices: ia_exercices,
                ia_travaux: ia_travaux,
                ia_langue: ia_langue,
                ia_aucune: ia_aucune,
                ia_autre: ia_autre,
                ia_autre_texte: ia_autre_texte,

                // Rétrocompatibilité Q10
                raisons_ia: chaineRaisonsIaRetro,
                raisons_ia_autre: ia_autre_texte,

                // Q11 et Q12 : Textes libres épurés (cellule vide "" si "Aucun commentaire" coché)
                force: valeurForce,
                ameliorations: valeurAmeliorations,

                // Métadonnées internes d'interface pour la navigation "Précédent / Suivant"
                _ui: {
                    q10_coches: valeursQ10Brutes,
                    q10_autre: texteAutreQ10,
                    q11_na: checkboxForceNa.checked,
                    q11_texte: texteForce,
                    q12_na: checkboxAmeliorationsNa.checked,
                    q12_texte: texteAmeliorations
                }
            };
        }

        // --- Affichage et restauration de l'état d'un cours ---
        function afficherCours() {
            const sigleComplet = coursAEvaluer[indexCourant];
            const sigle = siglesAEvaluer[indexCourant];

            const titreCours = document.getElementById('titre-cours-actif');
            titreCours.textContent = `Évaluation : ${sigleComplet}`;
            declencherAnimation(titreCours, 'transition-cours');

            document.getElementById('btn-precedent').style.visibility = (indexCourant === 0) ? 'hidden' : 'visible';

            const btnSuivant = document.getElementById('btn-suivant');
            if (indexCourant === siglesAEvaluer.length - 1) {
                btnSuivant.textContent = "Terminer et transmettre ✓";
            } else {
                btnSuivant.textContent = "Cours suivant →";
            }

            // Réinitialisation du formulaire et des états d'erreur
            form.reset();
            form.querySelectorAll('.question-bloc').forEach(b => {
                nettoyerErreurBloc(b);
                b.classList.remove('question-repondue');
            });
            document.getElementById('banniere-erreur-globale').classList.add('masque');

            // Restauration des réponses si le cours a déjà été visité durant la session active
            if (baseDeDonneesLocale[sigle]) {
                const data = baseDeDonneesLocale[sigle];

                const variablesRadio = [
                    'motivation', 'charge', 'consolidation', 'clarte_livrables', 'clarte_examens',
                    'delai_correction', 'plateforme_moodle', 'quantite_exercices', 'frequence_ia'
                ];

                variablesRadio.forEach(variable => {
                    if (data[variable] !== null && data[variable] !== undefined) {
                        const el = form.querySelector(`input[name="${variable}"][value="${String(data[variable])}"]`);
                        if (el) el.checked = true;
                    }
                });

                if (data._ui) {
                    data._ui.q10_coches.forEach(val => {
                        const cb = form.querySelector(`input[name="raisons_ia"][value="${CSS.escape(val)}"]`);
                        if (cb) cb.checked = true;
                    });
                    champIaAutre.value = data._ui.q10_autre || '';

                    checkboxForceNa.checked = Boolean(data._ui.q11_na);
                    champForce.value = data._ui.q11_texte || '';

                    checkboxAmeliorationsNa.checked = Boolean(data._ui.q12_na);
                    champAmeliorations.value = data._ui.q12_texte || '';
                }
            }

            champForce.classList.toggle('champ-desactive-visuel', checkboxForceNa.checked);
            champAmeliorations.classList.toggle('champ-desactive-visuel', checkboxAmeliorationsNa.checked);

            synchroniserChampsAutre(false);
            actualiserFeedbackBlocsEtProgression();
        }

        // --- Navigation séquentielle et transmission finale ---
        window.naviguer = function (direction) {
            if (direction === -1 && indexCourant <= 0) return;
            sauvegarderReponses();

            // Bloqueur strict lors de la progression vers l'avant
            if (direction === 1 && !validerFormulaireCourant()) {
                return;
            }

            // Transmission finale au dernier cours
            if (direction === 1 && indexCourant === siglesAEvaluer.length - 1) {
                // Nettoyage des métadonnées internes (_ui) avant l'envoi réseau
                const evaluationsPropres = {};
                Object.keys(baseDeDonneesLocale).forEach(sigle => {
                    const copie = { ...baseDeDonneesLocale[sigle] };
                    delete copie._ui;
                    evaluationsPropres[sigle] = copie;
                });

                const chargeUtile = {
                    etudiant: JSON.parse(localStorage.getItem('etudiant')),
                    evaluations: evaluationsPropres
                };

                const URL_API = "https://script.google.com/macros/s/AKfycbxcbQSve0p0mkv-yRvz12OHvAIEOQFTUsjcTKkg_QM7VFAdk5C5kZpDO4Oja03C0bQpuQ/exec";

                const btnSuivant = document.getElementById('btn-suivant');
                btnSuivant.innerHTML = "Transmission en cours <span class='icone-sablier'>⌛</span>";
                btnSuivant.disabled = true;
                btnSuivant.style.opacity = "0.7";

                fetch(URL_API, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(chargeUtile)
                })
                .then(() => {
                    sortieAutorisee = true;
                    document.getElementById('barre-remplissage').style.width = '100%';
                    document.getElementById('phase-evaluation').innerHTML = `
                        <div class="carte-confirmation">
                            <h2 style="color: var(--vert-primaire); text-align:center;">Transmission complétée avec succès !</h2>
                            <p style="text-align:center; font-size: 1.05em;">Merci pour votre précieuse contribution à l'assurance qualité du programme de génie chimique.</p>
                            <div style="text-align:center; margin-top: 25px;">
                                <a href="index.html" class="btn-secondaire" style="text-decoration:none; display:inline-block;">Retour à l'accueil</a>
                            </div>
                        </div>
                    `;
                    localStorage.removeItem('etudiant');
                    localStorage.removeItem('coursAEvaluer');
                    localStorage.removeItem('brouillonEvaluations');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                })
                .catch(erreur => {
                    afficherToast("Échec de la connexion réseau. Veuillez réessayer.", 'avertissement');
                    btnSuivant.textContent = "Terminer et transmettre ✓";
                    btnSuivant.disabled = false;
                    btnSuivant.style.opacity = "1";
                });

                return;
            }

            // Changement de cours et retour automatique en haut de page
            const siglePrecedent = siglesAEvaluer[indexCourant];
            indexCourant += direction;
            genererPisteJetons();
            afficherCours();
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (direction === 1) {
                afficherToast(`${siglePrecedent} complété — Passage à ${siglesAEvaluer[indexCourant]}`, 'succes');
            } else {
                afficherToast(`Retour à ${siglesAEvaluer[indexCourant]}`, 'info');
            }
        };

        genererPisteJetons();
        afficherCours();
    }
});