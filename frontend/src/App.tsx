import { useEffect, useState } from 'react'

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
  
  // Guide modal states
  const [showGuideModal, setShowGuideModal] = useState(false)
  const [isModalClosing, setIsModalClosing] = useState(false)
  const [guideEmail, setGuideEmail] = useState('')
  const [guideSubmitting, setGuideSubmitting] = useState(false)
  const [guideSubmitted, setGuideSubmitted] = useState(false)

  // Parrainage form states
  const [parrainageName, setParrainageName] = useState('')
  const [parrainageEmail, setParrainageEmail] = useState('')
  const [parrainageClub, setParrainageClub] = useState('')
  const [parrainageSubmitting, setParrainageSubmitting] = useState(false)
  const [parrainageSubmitted, setParrainageSubmitted] = useState(false)

  // Scroll detection for guide modal - seulement scroll down
  useEffect(() => {
    // Vérifier localStorage au chargement
    if (localStorage.getItem('guideModalShown') === 'true') {
      return
    }
    
    let lastScrollY = window.scrollY
    let triggered = false
    
    const handleScroll = () => {
      // Vérifier à nouveau localStorage au cas où il aurait changé
      if (localStorage.getItem('guideModalShown') === 'true') {
        return
      }
      
      if (triggered) return
      
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY
      lastScrollY = currentScrollY
      
      // Ne déclencher que si on scroll vers le bas
      if (!isScrollingDown) return
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0
      
      // Déclencher entre 30% et 40% de scroll (ou dès 30% si la page est courte)
      if (scrollPercentage >= 30) {
        triggered = true
        localStorage.setItem('guideModalShown', 'true')
        // Petit délai pour l'animation
        setTimeout(() => {
          setShowGuideModal(true)
        }, 100)
      }
    }

    // Attendre que le DOM soit prêt
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true })
      // Déclencher aussi au premier scroll si on est déjà à 30%
      handleScroll()
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const closeModal = () => {
    setIsModalClosing(true)
    setTimeout(() => {
      setShowGuideModal(false)
      setIsModalClosing(false)
    }, 300)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
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

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!guideEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guideEmail)) {
      return
    }

    setGuideSubmitting(true)
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      setGuideSubmitted(true)
      setTimeout(() => {
        closeModal()
        setGuideEmail('')
        setGuideSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting guide form:', error)
    } finally {
      setGuideSubmitting(false)
    }
  }

  const handleParrainageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!parrainageName.trim() || !parrainageEmail.trim() || !parrainageClub.trim()) {
      return
    }

    setParrainageSubmitting(true)
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      setParrainageSubmitted(true)
      setTimeout(() => {
        setParrainageName('')
        setParrainageEmail('')
        setParrainageClub('')
        setParrainageSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error('Error submitting parrainage form:', error)
    } finally {
      setParrainageSubmitting(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-300 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
              Altura Chess Formation
            </h1>
            <button
              onClick={scrollToForm}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-sm font-medium hover:bg-gray-800 transition-colors text-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight tracking-tight">
            Créer et gérer un club d'échecs sans s'épuiser
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto">
            Un système testé pour sortir du chaos administratif et dynamiser votre club.
          </p>
          <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Pour présidents et bénévoles qui portent déjà trop.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-gray-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-gray-800 transition-colors text-base"
          >
            Structurer mon club sérieusement
          </button>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 tracking-tight text-center">
            Marie l'a fait dans son club, à Reims
          </h3>
          <div className="aspect-video bg-gray-200 rounded-sm border border-gray-300 mb-6 flex items-center justify-center">
            <iframe
              className="w-full h-full rounded-sm"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Témoignage club d'échecs"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-center text-gray-700 text-base">
            Marie explique comment son club de Reims est passé de 45 à 120 licenciés sans épuiser les bénévoles.
          </p>
        </div>
      </section>

      {/* Résultats concrets Domloup */}
      <section className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight text-center">
              Les résultats concrets à Domloup
            </h3>
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-sm">
              Des décisions prises sur le terrain, pas en théorie.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">60 → 120</div>
              <p className="text-gray-600 text-sm font-medium">Licenciés en 1 an et demi</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">0 → 450</div>
              <p className="text-gray-600 text-sm font-medium">Élèves touchés en milieu scolaire en 2 ans</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">0 → 3</div>
              <p className="text-gray-600 text-sm font-medium">Équipes jeunes en 2 ans</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">3 → 8</div>
              <p className="text-gray-600 text-sm font-medium">Entraîneurs en 2 ans</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">0 → 2</div>
              <p className="text-gray-600 text-sm font-medium">Mécènes privés pérennes en 3 ans</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">—</div>
              <p className="text-gray-600 text-sm font-medium">Satisfaction et convivialité au top</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-16 md:py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Contactez-nous
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Vous pouvez aussi simplement nous écrire ou nous appeler.
            </p>
            <p className="text-base text-gray-600 mb-2">
              <a href="mailto:contact@alturachess.fr" className="text-gray-900 font-medium hover:underline">
                contact@alturachess.fr
              </a>
            </p>
            <p className="text-base text-gray-600 mb-6">
              <a href="tel:+33123456789" className="text-gray-900 font-medium hover:underline">
                +33 1 23 45 67 89
              </a>
            </p>
            <p className="text-sm text-gray-500 italic">
              Aucun engagement.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 md:p-10 max-w-2xl mx-auto">
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
      </section>

      {/* Parrainage Section */}
      <section className="py-20 px-6 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
              Parrainer un club d'échecs
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Vous connaissez un président à bout de souffle ?<br />
              Si votre recommandation aboutit à une inscription, vous recevez 200 €.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 max-w-2xl mx-auto">
            {parrainageSubmitted ? (
              <div className="text-center py-8">
                <p className="text-green-600 font-medium mb-2">Merci pour votre proposition !</p>
                <p className="text-gray-600 text-sm">Nous vous contacterons prochainement.</p>
              </div>
            ) : (
              <form onSubmit={handleParrainageSubmit} className="space-y-5">
                <div>
                  <label htmlFor="parrainage-name" className="block text-gray-700 mb-2 font-medium text-sm">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="parrainage-name"
                    value={parrainageName}
                    onChange={(e) => setParrainageName(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-base"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="parrainage-email" className="block text-gray-700 mb-2 font-medium text-sm">
                    Votre email
                  </label>
                  <input
                    type="email"
                    id="parrainage-email"
                    value={parrainageEmail}
                    onChange={(e) => setParrainageEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-base"
                    placeholder="votre.email@exemple.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="parrainage-club" className="block text-gray-700 mb-2 font-medium text-sm">
                    Club à parrainer
                  </label>
                  <input
                    type="text"
                    id="parrainage-club"
                    value={parrainageClub}
                    onChange={(e) => setParrainageClub(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm border border-gray-300 bg-white focus:border-gray-900 focus:ring-1 focus:ring-gray-900 text-gray-900 placeholder-gray-400 focus:outline-none transition-colors text-base"
                    placeholder="Nom du club et contact si possible"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={parrainageSubmitting}
                  className={`w-full py-3 px-6 rounded-sm font-medium text-base transition-colors ${
                    parrainageSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {parrainageSubmitting ? 'Envoi en cours...' : 'Proposer un club'}
                </button>
              </form>
            )}
          </div>
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

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50">
          {/* Overlay - sibling, pas parent */}
          <div 
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isModalClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeModal}
          />
          
          {/* Modal - sibling, complètement opaque */}
          <div className="relative flex items-center justify-center min-h-screen p-4">
            <div 
              className={`bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative transition-all duration-300 ${
                isModalClosing ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ×
            </button>
            
            {guideSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-600 font-semibold mb-2 text-lg">Merci !</p>
                <p className="text-gray-600 text-sm">Le guide vous sera envoyé par email.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-2xl">📘</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                    Les 5 décisions qui sauvent un club avant l'épuisement des bénévoles
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Un guide issu du terrain pour présidents et bénévoles de clubs d'échecs.
                  </p>
                </div>
                
                <form onSubmit={handleGuideSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={guideEmail}
                      onChange={(e) => setGuideEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20 text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-base"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={guideSubmitting}
                    className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base transition-all shadow-lg ${
                      guideSubmitting
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl'
                    }`}
                  >
                    {guideSubmitting ? 'Envoi...' : 'Recevoir le guide gratuitement'}
                  </button>
                </form>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
