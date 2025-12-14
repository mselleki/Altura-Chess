import { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const API_URL = (import.meta.env as { VITE_API_URL?: string }).VITE_API_URL || 'http://localhost:8000'

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [submitMessage, setSubmitMessage] = useState('')
  const [expandedModules, setExpandedModules] = useState<{ [key: number]: boolean }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null)
      setSubmitMessage('')
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const response = await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setSubmitMessage('Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
        setSubmitMessage(
          data.errors?.join(' ') || 'Une erreur s\'est produite. Veuillez réessayer.'
        )
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Erreur de connexion. Veuillez vérifier que le serveur est démarré.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
              ChessFormation Academy
            </h1>
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('la-methode')}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                La méthode
              </button>
              <button
                onClick={() => scrollToSection('le-programme')}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Le programme
              </button>
              <button
                onClick={() => scrollToSection('pour-qui')}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Pour qui
              </button>
              <button
                onClick={scrollToForm}
                className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                Contact
              </button>
              <button
                onClick={scrollToForm}
                className="bg-gray-900 text-white px-6 py-2.5 rounded-sm font-medium hover:bg-gray-800 transition-colors text-sm"
              >
                Discuter de mon club
              </button>
            </nav>
            <button
              onClick={scrollToForm}
              className="md:hidden bg-gray-900 text-white px-4 py-2 rounded-sm font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
                Un système pour arrêter de bricoler et structurer votre club
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
                Simple, reproductible, pensé pour des clubs locaux.
              </p>
              <p className="text-base text-gray-600 mb-8">
                Testé sur le terrain dans un club comparable au vôtre.
              </p>
              <button
                onClick={scrollToForm}
                className="bg-gray-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-gray-800 transition-colors text-base"
              >
                Arrêter de bricoler mon club
              </button>
            </div>
            <div className="relative">
              <img
                src="/images/chess_famille.jpg"
                alt="Groupe de membres d'un club d'échecs"
                className="w-full h-[350px] md:h-[400px] rounded-sm border border-gray-200 shadow-lg object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Qui est Guillaume */}
      <section className="py-10 px-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <p className="text-base text-gray-700 font-medium">
            Guillaume, président bénévole, pas consultant. Il n'a pas hérité d'un gros club. Il a structuré un petit.
          </p>
        </div>
      </section>

      {/* Définition du système */}
      <section id="la-methode" className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 tracking-tight">
            Un système = décisions + outils + priorités
          </h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Simple, reproductible, sans dépendre d'une seule personne. Pensé pour des clubs de 30 à 150 licenciés.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Vous n'apprenez pas à gérer un club, vous appliquez un modèle qui a déjà fonctionné. Testé sur le terrain, transférable à votre situation.
          </p>
        </div>
      </section>

      {/* Bloc preuve 40 → 120 - EN COLONNES */}
      <section className="py-20 px-6 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 tracking-tight text-center">
            Voilà ce qui vous attend
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="bg-white border-2 border-red-300 p-8 shadow-sm">
              <div className="text-5xl font-bold text-red-600 mb-2">40</div>
              <p className="text-sm text-gray-500 mb-4">licenciés</p>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Si vous continuez</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span>Tout repose sur 1-2 personnes. Charge mentale élevée.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span>Effectifs stagnants. Organisation informelle.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 font-bold">•</span>
                  <span>Financements imprévisibles. Vision à court terme.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white border-2 border-green-300 p-8 shadow-sm">
              <div className="text-5xl font-bold text-green-600 mb-2">120</div>
              <p className="text-sm text-gray-500 mb-4">licenciés</p>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Si vous changez</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span>Bénévoles moins surchargés. Organisation plus sereine.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span>Croissance en structurant, pas en accélérant.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 font-bold">•</span>
                  <span>Financements diversifiés. Vision à moyen terme.</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600 italic">
                Pendant plusieurs saisons. Un résultat accessible, pas exceptionnel.
              </p>
            </div>
          </div>
          <p className="text-center text-gray-700 font-medium">
            Un cas réel. Un résultat accessible.
          </p>
        </div>
      </section>

      {/* Section engagement - INCONFORTABLE */}
      <section className="py-16 px-6 bg-gray-900 text-white border-b border-gray-800">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 tracking-tight">
            Ce que ce système demande
          </h3>
          <p className="text-lg mb-4 leading-relaxed">
            Appliquer ce système implique de renoncer à certaines façons de faire. Ce modèle demande de changer certaines habitudes.
          </p>
          <p className="text-base text-gray-300 italic">
            Si vous cherchez une solution magique, passez votre chemin. Ce n'est pas magique, c'est structuré.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-3">30-150</div>
              <div className="text-gray-600 text-sm font-medium">Licenciés : la taille idéale pour votre club</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-3">—</div>
              <div className="text-gray-600 text-sm font-medium">Testé sur plusieurs saisons, pas en théorie</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-3">—</div>
              <div className="text-gray-600 text-sm font-medium">Résultat accessible, pas exceptionnel</div>
            </div>
          </div>
        </div>
      </section>

      {/* Citation vérité */}
      <section className="py-20 px-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <blockquote className="text-xl text-gray-800 italic border-l-4 border-gray-900 pl-8 leading-relaxed">
            "La majorité des clubs stagnent non par manque de passion, mais par absence de méthode. Le bénévolat ne suffit pas à faire grandir un club."
          </blockquote>
        </div>
      </section>

      {/* Projection personnelle */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <h4 className="text-2xl font-semibold mb-6">Questions directes</h4>
          <p className="text-xl mb-4 leading-relaxed">
            À quoi ressemblerait votre club dans 2 saisons si rien ne change ?
          </p>
          <p className="text-xl leading-relaxed">
            Combien de temps pouvez-vous encore tout porter seul ?
          </p>
        </div>
      </section>

      {/* Avant / Après Section */}
      <section className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Avant et après : un cas parmi d'autres
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl">
              Voici ce qui a changé dans un club qui vous ressemble. Un cas concret pour vous projeter.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 border border-red-200 p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Avant</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Effectifs stagnants autour de 40 licenciés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Organisation informelle, dépendance aux bénévoles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Financements limités et imprévisibles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Difficultés à structurer l'administratif</span>
                </li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Après</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Croissance à 120 licenciés en quelques saisons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Stabilité organisationnelle, bénévoles moins surchargés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Financement diversifié et prévisible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Administration structurée et maîtrisée</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="pour-qui" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
              Ce que vous allez appliquer à votre club
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-3xl">
              Ce n'est pas une formation théorique. C'est la mise à plat d'un système qui marche, transférable à votre situation.
            </p>
            <p className="text-base text-gray-700 italic mb-8 max-w-3xl">
              Chaque module correspond à une décision réelle testée sur le terrain. Vous n'apprenez pas à gérer un club, vous appliquez un modèle qui a déjà fonctionné dans des clubs qui vous ressemblent.
            </p>
            
            {/* Erreurs et échecs */}
            <div className="max-w-3xl bg-yellow-50 border-2 border-yellow-300 p-8 mb-12">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Ce qu'un club a arrêté de faire</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Les erreurs corrigées en cours de route. Ce qui n'a pas marché (et pourquoi). Montrer l'échec rend la réussite plus crédible.
              </p>
              <p className="text-gray-600 italic">
                "On a testé, on a échoué, on a ajusté. Vous n'aurez pas à refaire ces erreurs dans votre club."
              </p>
            </div>
          </div>
          
          {/* Image de formation */}
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop&q=80"
              alt="Formation professionnelle - Formateur avec audience"
              className="w-full h-auto rounded-sm border border-gray-200 shadow-sm object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center text-white text-lg font-semibold mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Faire grandir votre club sans brûler les bénévoles
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Arrêter de tout porter seul. Structurer votre club sans devenir esclave de l'administratif. Un système transférable, testé sur le terrain.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center text-white text-lg font-semibold mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Chercher des financements sans dépendre uniquement des subventions
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mettre une comptabilité propre dans votre club sans être expert-comptable. Une méthode testée, accessible.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center text-white text-lg font-semibold mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Organiser des tournois qui servent la croissance de votre club
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pas juste le prestige. Des événements qui font grandir votre club. Un modèle reproductible.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center text-white text-lg font-semibold mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Sortir l'administratif de votre tête
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Arrêter que tout repose sur vous dans votre club. Statuts, gestion, administration légale : un système qui libère du temps.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center text-white text-lg font-semibold mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Recruter et fidéliser dans votre club sans marketing générique
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Techniques concrètes pour faire grandir les effectifs de votre club. Pas de théorie, du vécu transférable.
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center text-white text-lg font-semibold mb-4">
                ✓
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Développer des programmes dans votre club sans se disperser
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Des cours structurés pour tous les niveaux dans votre club. Un modèle reproductible, testé sur le terrain.
              </p>
            </div>
          </div>

          {/* Section erreurs de Guillaume */}
          <div className="mt-12 bg-gray-100 border border-gray-300 p-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Les erreurs à éviter dans votre club</h4>
            <p className="text-gray-700 mb-4">
              On a testé, on a échoué, on a ajusté. Voici ce qui n'a pas marché et pourquoi. Montrer l'échec rend la réussite plus crédible.
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>Les tentatives de recrutement génériques qui n'ont rien donné dans votre club</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>L'organisation de votre club qui repose trop sur une seule personne</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">•</span>
                <span>Les financements que vous attendez sans les chercher activement</span>
              </li>
            </ul>
            <p className="text-gray-600 text-sm mt-4 italic">
              Vous n'aurez pas à refaire ces erreurs dans votre club. C'est ça, la valeur d'un retour d'expérience transférable.
            </p>
          </div>

          {/* Section pour qui ce n'est PAS fait */}
          <div className="mt-6 bg-gray-100 border border-gray-300 p-8">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Pour qui cette formation n'est pas faite</h4>
            <p className="text-gray-700 mb-4">
              Cette formation n'est pas faite pour les clubs qui veulent rester informels. Ni pour ceux qui refusent de structurer leur fonctionnement.
            </p>
            <p className="text-gray-600 text-sm">
              Si vous cherchez une méthode théorique ou un cours de gestion classique, ce n'est pas ici. Ici, on applique un système qui a marché. Point.
            </p>
          </div>
        </div>
      </section>

      {/* Détails de la formation */}
      <section id="le-programme" className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
              La formation en détail
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl leading-relaxed">
              21 heures de formation structurée en 3 modules. Chaque séance correspond à une décision réelle prise sur le terrain.
            </p>
          </div>

          {/* Informations pratiques */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Public</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Président, membre du bureau ou bénévole impliqué dans la gestion de votre club d'échecs.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Durée</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                21 heures de formation réparties en séances pratiques et applicables immédiatement.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Tarifs</h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">
                <span className="font-semibold">1 500 €</span> pour un apprenant
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <span className="font-semibold">2 000 €</span> pour un groupe (jusqu'à 3 apprenants)
              </p>
            </div>
          </div>
          <p className="text-center text-gray-700 italic mb-12 max-w-2xl mx-auto">
            Cette formation s'adresse à ceux qui tiennent leur club à bout de bras… et qui veulent que ça dure.
          </p>

          {/* Bénéfices humains */}
          <div className="mb-12 bg-gray-900 text-white p-8">
            <h4 className="text-xl font-semibold mb-4">Ce que cette formation va vous enlever comme problèmes :</h4>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start">
                <span className="text-white mr-2 font-bold">•</span>
                <span>Ne plus tout porter seul. Savoir exactement qui fait quoi.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2 font-bold">•</span>
                <span>Arrêter de subir l'administratif. Avoir des outils qui fonctionnent.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2 font-bold">•</span>
                <span>Ne plus dépendre d'une seule personne. Structurer pour que ça tienne.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2 font-bold">•</span>
                <span>Avoir une vision claire à 2-3 saisons. Sécuriser l'avenir du club.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2 font-bold">•</span>
                <span>Faire grandir sans s'épuiser. Animer efficacement au jour le jour.</span>
              </li>
            </ul>
          </div>

          {/* Les 3 modules */}
          <div className="space-y-6">
            {/* Module 1 */}
            <div className="border-l-4 border-gray-900 pl-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-3">Module 1 : Sortir le club du chaos administratif</h4>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Statuts, assemblées générales, budget, comptabilité. Les bases solides pour que tout ne repose plus sur vous.
                  </p>
                  {expandedModules[1] && (
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-700">Cadre juridique et statutaire :</p>
                      <p>Loi 1901, statuts, rôles des dirigeants, assemblées générales</p>
                      <p className="font-medium text-gray-700 mt-4">Organisation et gouvernance :</p>
                      <p>Structuration interne, prise de décision, gestion des conflits</p>
                      <p className="font-medium text-gray-700 mt-4">Gestion financière :</p>
                      <p>Budget, comptabilité, cotisations, subventions, obligations fiscales</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setExpandedModules({ ...expandedModules, [1]: !expandedModules[1] })}
                className="mt-3 text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                {expandedModules[1] ? 'Masquer le détail' : 'Voir le détail du module'}
              </button>
            </div>

            {/* Module 2 */}
            <div className="border-l-4 border-gray-900 pl-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-3">Module 2 : Faire vivre le club sans s'épuiser</h4>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Bénévoles, joueurs, entraîneurs, tournois. Animer efficacement votre club au jour le jour sans tout porter seul.
                  </p>
                  {expandedModules[2] && (
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-700">Gestion des ressources humaines :</p>
                      <p>Fidéliser les bénévoles, encadrer salariés/prestataires, organiser des événements</p>
                      <p className="font-medium text-gray-700 mt-4">Gestion des compétitions :</p>
                      <p>Motiver les joueurs, règlement FFE, suivi des joueurs, gestion des équipes</p>
                      <p className="font-medium text-gray-700 mt-4">Formateurs :</p>
                      <p>Trouver des entraîneurs, programmes adaptés, contenu de cours, bénévole vs professionnel</p>
                      <p className="font-medium text-gray-700 mt-4">Événements ouverts au public :</p>
                      <p>Stages vacances, opens, réglementation buvettes, arbitrage</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setExpandedModules({ ...expandedModules, [2]: !expandedModules[2] })}
                className="mt-3 text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                {expandedModules[2] ? 'Masquer le détail' : 'Voir le détail du module'}
              </button>
            </div>

            {/* Module 3 */}
            <div className="border-l-4 border-gray-900 pl-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-3">Module 3 : Sécuriser l'avenir du club</h4>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Communication, financements, projets durables. Faire grandir votre club avec une vision à moyen terme.
                  </p>
                  {expandedModules[3] && (
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p className="font-medium text-gray-700">Communication et visibilité :</p>
                      <p>Identité associative, communication interne/externe, réseaux sociaux, relations partenaires</p>
                      <p className="font-medium text-gray-700 mt-4">Développement de projets :</p>
                      <p>Projet associatif, subventions, appels à projets, mécénat, sponsoring</p>
                      <p className="font-medium text-gray-700 mt-4">Projets à forte valeur ajoutée :</p>
                      <p>Interventions scolaires, périscolaire, service civique, déplacements club</p>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setExpandedModules({ ...expandedModules, [3]: !expandedModules[3] })}
                className="mt-3 text-sm font-medium text-gray-900 hover:text-gray-700"
              >
                {expandedModules[3] ? 'Masquer le détail' : 'Voir le détail du module'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1200&h=600&fit=crop&q=80"
            alt="Tournoi d'échecs professionnel"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
            Prêt à passer un cap dans votre club ?
          </h3>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Appliquez un modèle testé sur le terrain, transférable à votre club. Pas besoin de notoriété, ni de gros budget. Un résultat accessible.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-white text-gray-900 px-8 py-3 rounded-sm font-medium hover:bg-gray-100 transition-colors text-base"
          >
            Passer un cap dans mon club
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-20 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <img
                src="https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop&q=80"
                alt="Échiquier et pièces d'échecs"
                className="w-full h-auto rounded-sm border border-gray-200 shadow-sm object-cover"
              />
            </div>
            <div className="bg-white border border-gray-200 p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-block bg-gray-100 text-gray-700 px-4 py-1.5 rounded-sm text-xs font-medium mb-4 tracking-wide uppercase">
                Formulaire de contact
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
                Appliquer le modèle à votre club
              </h3>
              <p className="text-lg text-gray-600">
                Remplissez le formulaire ci-dessous et Guillaume vous contactera pour discuter de la situation de votre club
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium text-sm">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-sm border ${
                    errors.name
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  } text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-base`}
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-sm border ${
                    errors.email
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  } text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-base`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 font-medium text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-sm border ${
                    errors.message
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900'
                  } text-gray-900 placeholder-gray-400 focus:outline-none transition-colors resize-none text-base`}
                  placeholder="Dites-nous en quoi nous pouvons vous aider..."
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {submitStatus && (
                <div
                  className={`p-4 rounded-sm border ${
                    submitStatus === 'success'
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  } font-medium text-sm`}
                >
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-sm font-medium text-base transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Structurer mon club sérieusement'}
              </button>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h4 className="text-lg font-semibold text-white mb-2">ChessFormation Academy</h4>
          <p className="text-gray-500 text-sm mb-3">La référence en formation de gestion de clubs d'échecs</p>
          <p className="text-gray-600 text-xs">&copy; 2026 ChessFormation Academy. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
