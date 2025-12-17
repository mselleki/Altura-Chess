import { Link, useNavigate } from 'react-router-dom'

function Programme() {
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo_altura.png" 
                alt="Altura Chess Formation" 
                className="h-16 md:h-12 w-auto"
              />
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Accueil
              </Link>
              <Link
                to="/programme"
                className="text-gray-900 font-medium text-sm transition-colors border-b-2 border-gray-900"
              >
                Programme
              </Link>
              <button
                onClick={handleContactClick}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-sm font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight text-center">
            Programme de formation
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Gestion d'une association, promotion et développement d'un club d'échecs, outils et techniques de gestion d'un club au jour le jour.
          </p>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="py-16 px-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Durée</h3>
              <p className="text-gray-700 text-base">21 heures</p>
            </div>
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Public</h3>
              <p className="text-gray-700 text-base">
                Président, membre du bureau ou bénévole impliqués dans la gestion de votre club d'échecs.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tarifs</h3>
              <p className="text-gray-700 text-base mb-2">
                <span className="font-semibold">1 500 €</span> pour un apprenant
              </p>
              <p className="text-gray-700 text-base">
                <span className="font-semibold">2 000 €</span> pour un groupe (jusqu'à 3 apprenants)
              </p>
            </div>
          </div>

          {/* Objectifs */}
          <div className="bg-white border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">À l'issue de la formation, vous serez capable de :</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-gray-900 mr-3 font-bold">•</span>
                <span>Créer et structurer une association sur des bases solides</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3 font-bold">•</span>
                <span>Gérer l'administratif et les finances du club de façon efficace grâce à nos outils, ainsi que la gouvernance en toute conformité</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3 font-bold">•</span>
                <span>Mobiliser des bénévoles et partenaires efficacement</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3 font-bold">•</span>
                <span>Développer des projets durables et rechercher des financements</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-900 mr-3 font-bold">•</span>
                <span>Mobiliser et garder la motivation de vos joueurs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-12 text-center">
            La formation dans les grandes lignes - 3 modules
          </h2>

          {/* Module 1 */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
              🧩 Module 1 : La gestion d'un club d'échecs
            </h3>

            {/* Séquence 1 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🏛️ Séquence 1. Cadre juridique et statutaire</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Loi 1901 et obligations légales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Rédaction et modification des statuts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Rôles et responsabilités des dirigeants (président, trésorier, secrétaire)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Assemblées générales et conseils d'administration</span>
                </li>
              </ul>
            </div>

            {/* Séquence 2 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📋 Séquence 2. Organisation et gouvernance</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Structuration interne et répartition des tâches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Prise de décision collective et transparente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Gestion des conflits et responsabilités juridiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Bonnes pratiques de gouvernance associative</span>
                </li>
              </ul>
            </div>

            {/* Séquence 3 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">💰 Séquence 3. Gestion financière et comptable</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Élaboration et suivi du budget</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Tenue de la comptabilité associative</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Gestion des cotisations, dons et subventions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Obligations fiscales et financières</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 5 :</strong> Lecture et analyse des comptes</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 2 */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
              🎯 Module 2 : L'animation d'un club d'échecs
            </h3>

            {/* Séquence 1 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🤝 Séquence 1. Gestion des ressources humaines</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Trouver et fidéliser ses bénévoles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Encadrement des salariés et/ou prestataires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Motivation, communication interne et valorisation des engagements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Création, organisation et gestion d'évènement interne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 5 :</strong> Cadre légal du bénévolat</span>
                </li>
              </ul>
            </div>

            {/* Séquence 2 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🥇 Séquence 2. Gestion des compétitions</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Trouver et garder la motivation de ses joueurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Les points clés du règlement des compétitions de la FFE</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Comment garantir un suivi de ses joueurs lors des compétitions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Organiser et gérer ses équipes</span>
                </li>
              </ul>
            </div>

            {/* Séquence 3 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🧑‍🎓 Séquence 3. Trouver et gérer son personnel formateur</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Trouver des entraîneurs d'échecs fiables et compétents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Rédiger un programme de formation adapté au profil de vos joueurs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Comment et où trouver du bon contenu pour préparer ses cours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Formateur bénévole vs. Formateur professionnel</span>
                </li>
              </ul>
            </div>

            {/* Séquence 4 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🎭 Séquence 4. Organiser des évènements ouverts au public</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> L'intérêt des stages pendant les vacances et leur organisation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> L'organisation d'open lent et rapide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> La réglementation autour des "buvettes"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> L'arbitrage et la communication auprès des joueurs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Module 3 */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 pb-4 border-b-2 border-gray-200">
              🚀 Module 3 : Le développement d'un club d'échecs
            </h3>

            {/* Séquence 1 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📣 Séquence 1. Communication et visibilité</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Définition de l'identité et du projet associatif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Communication interne et externe</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Utilisation des réseaux sociaux et outils numériques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Relations avec les partenaires et les institutions</span>
                </li>
              </ul>
            </div>

            {/* Séquence 2 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🚀 Séquence 2. Développement de projets et recherche de financements</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> Création et rédaction du projet associatif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Recherche de subventions et appels à projets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Mécénat, sponsoring et partenariats, comment trouver et à qui s'adresser</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> Suivi, évaluation et reporting des actions</span>
                </li>
              </ul>
            </div>

            {/* Séquence 3 */}
            <div className="mb-8 ml-4">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">♟️ Séquence 3. Les projets à forte valeur ajoutée</h4>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 1 :</strong> L'intervention en milieu scolaire, du cadrage à la mise en place</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 2 :</strong> Comment mobiliser le périscolaire et les espaces jeunes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 3 :</strong> Embaucher un service civique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span><strong>Séance 4 :</strong> L'organisation et la gestion de déplacement club</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
            Prêt à suivre cette formation ?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre situation et voir comment cette formation peut s'adapter à votre club.
          </p>
          <button
            onClick={handleContactClick}
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors text-base"
          >
            Nous contacter
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h4 className="text-lg font-semibold text-white mb-2">Altura Chess Formation</h4>
          <p className="text-gray-500 text-sm mb-3">La référence en formation de gestion de clubs d'échecs</p>
          <p className="text-gray-600 text-xs">&copy; 2026 Altura Chess Formation. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default Programme

