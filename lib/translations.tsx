"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export const translations = {
  en: {
    videos: "Educational Videos",
    categories: "Categories",
    all: "All",
    relatedVideos: "Related Videos",
    backToCatalog: "Back to catalog",
    watchNow: "Watch Now",
    duration: "Duration",
    uploadVideo: "Upload Video",
    uploadDescription: "Upload a video to translate",
    selectFile: "Select File",
    uploading: "Uploading...",
    processing: "Processing...",
    uploadSuccess: "Upload successful!",
    uploadError: "Upload failed",
    dragDrop: "Drag and drop file here or click to browse",
    generateTranslation: "Generate Translation",
    // Video titles
    video1: "Introduction to Mathematics",
    video2: "Basic Physics Concepts",
    video3: "World History: Ancient Civilizations",
    video4: "Introduction to Biology",
    video5: "Chemistry Fundamentals",
    video6: "Learning English Grammar",
    // Categories
    mathematics: "Mathematics",
    physics: "Physics",
    history: "History",
    biology: "Biology",
    chemistry: "Chemistry",
    languages: "Languages",
    // Video descriptions
    video1Description:
      "This video introduces basic mathematical concepts that form the foundation of higher mathematics. Perfect for beginners and those looking to refresh their knowledge.",
    video2Description:
      "Learn about the fundamental concepts in physics including motion, energy, and forces. This video provides a clear explanation with visual examples.",
    video3Description:
      "Explore the fascinating world of ancient civilizations, their cultures, achievements, and lasting impact on our modern world.",
    video4Description:
      "Discover the science of life in this introductory video that covers cells, genetics, evolution, and the diversity of living organisms.",
    video5Description:
      "This video covers the basic principles of chemistry, including atoms, elements, compounds, and chemical reactions.",
    video6Description:
      "A comprehensive guide to English grammar rules and usage, designed for non-native speakers who want to improve their language skills.",
  },
  es: {
    videos: "Videos Educativos",
    categories: "Categorías",
    all: "Todos",
    relatedVideos: "Videos relacionados",
    backToCatalog: "Volver al catálogo",
    watchNow: "Ver ahora",
    duration: "Duración",
    uploadVideo: "Subir Video",
    uploadDescription: "Sube un video para traducir",
    selectFile: "Seleccionar Archivo",
    uploading: "Subiendo...",
    processing: "Procesando...",
    uploadSuccess: "¡Subida exitosa!",
    uploadError: "Error al subir",
    dragDrop: "Arrastra y suelta el archivo aquí o haz clic para navegar",
    generateTranslation: "Generar Traducción",
    // Video titles
    video1: "Introducción a las Matemáticas",
    video2: "Conceptos Básicos de Física",
    video3: "Historia Mundial: Civilizaciones Antiguas",
    video4: "Introducción a la Biología",
    video5: "Fundamentos de Química",
    video6: "Aprendiendo Gramática Inglesa",
    // Categories
    mathematics: "Matemáticas",
    physics: "Física",
    history: "Historia",
    biology: "Biología",
    chemistry: "Química",
    languages: "Idiomas",
    // Video descriptions
    video1Description:
      "Este video introduce conceptos matemáticos básicos que forman la base de las matemáticas superiores. Perfecto para principiantes y aquellos que desean refrescar sus conocimientos.",
    video2Description:
      "Aprenda sobre los conceptos fundamentales de la física, incluido el movimiento, la energía y las fuerzas. Este video proporciona una explicación clara con ejemplos visuales.",
    video3Description:
      "Explore el fascinante mundo de las civilizaciones antiguas, sus culturas, logros e impacto duradero en nuestro mundo moderno.",
    video4Description:
      "Descubra la ciencia de la vida en este video introductorio que cubre células, genética, evolución y la diversidad de los organismos vivos.",
    video5Description:
      "Este video cubre los principios básicos de la química, incluidos átomos, elementos, compuestos y reacciones químicas.",
    video6Description:
      "Una guía completa de las reglas y el uso de la gramática inglesa, diseñada para hablantes no nativos que desean mejorar sus habilidades lingüísticas.",
  },
  fr: {
    videos: "Vidéos Éducatives",
    categories: "Catégories",
    all: "Tous",
    relatedVideos: "Vidéos associées",
    backToCatalog: "Retour au catalogue",
    watchNow: "Regarder maintenant",
    duration: "Durée",
    uploadVideo: "Télécharger une Vidéo",
    uploadDescription: "Téléchargez une vidéo à traduire",
    selectFile: "Sélectionner un Fichier",
    uploading: "Téléchargement...",
    processing: "Traitement...",
    uploadSuccess: "Téléchargement réussi !",
    uploadError: "Échec du téléchargement",
    dragDrop: "Glissez et déposez le fichier ici ou cliquez pour parcourir",
    generateTranslation: "Générer une Traduction",
    // Video titles
    video1: "Introduction aux Mathématiques",
    video2: "Concepts Fondamentaux de Physique",
    video3: "Histoire du Monde: Civilisations Anciennes",
    video4: "Introduction à la Biologie",
    video5: "Principes Fondamentaux de Chimie",
    video6: "Apprentissage de la Grammaire Anglaise",
    // Categories
    mathematics: "Mathématiques",
    physics: "Physique",
    history: "Histoire",
    biology: "Biologie",
    chemistry: "Chimie",
    languages: "Langues",
    // Video descriptions
    video1Description:
      "Cette vidéo présente les concepts mathématiques de base qui constituent le fondement des mathématiques supérieures. Parfait pour les débutants et ceux qui souhaitent rafraîchir leurs connaissances.",
    video2Description:
      "Découvrez les concepts fondamentaux de la physique, notamment le mouvement, l'énergie et les forces. Cette vidéo offre une explication claire avec des exemples visuels.",
    video3Description:
      "Explorez le monde fascinant des civilisations anciennes, leurs cultures, leurs réalisations et leur impact durable sur notre monde moderne.",
    video4Description:
      "Découvrez la science de la vie dans cette vidéo d'introduction qui couvre les cellules, la génétique, l'évolution et la diversité des organismes vivants.",
    video5Description:
      "Cette vidéo couvre les principes fondamentaux de la chimie, y compris les atomes, les éléments, les composés et les réactions chimiques.",
    video6Description:
      "Un guide complet des règles de grammaire anglaise et de leur utilisation, conçu pour les non-anglophones qui souhaitent améliorer leurs compétences linguistiques.",
  },
  de: {
    videos: "Lehrvideos",
    categories: "Kategorien",
    all: "Alle",
    relatedVideos: "Ähnliche Videos",
    backToCatalog: "Zurück zum Katalog",
    watchNow: "Jetzt ansehen",
    duration: "Dauer",
    uploadVideo: "Video hochladen",
    uploadDescription: "Laden Sie ein Video zum Übersetzen hoch",
    selectFile: "Datei auswählen",
    uploading: "Wird hochgeladen...",
    processing: "Wird verarbeitet...",
    uploadSuccess: "Upload erfolgreich!",
    uploadError: "Upload fehlgeschlagen",
    dragDrop: "Datei hier ablegen oder klicken zum Durchsuchen",
    generateTranslation: "Übersetzung generieren",
    // Video titles
    video1: "Einführung in die Mathematik",
    video2: "Grundlegende physikalische Konzepte",
    video3: "Weltgeschichte: Antike Zivilisationen",
    video4: "Einführung in die Biologie",
    video5: "Grundlagen der Chemie",
    video6: "Englische Grammatik lernen",
    // Categories
    mathematics: "Mathematik",
    physics: "Physik",
    history: "Geschichte",
    biology: "Biologie",
    chemistry: "Chemie",
    languages: "Sprachen",
  },
  pt: {
    videos: "Vídeos Educativos",
    categories: "Categorias",
    all: "Todos",
    relatedVideos: "Vídeos relacionados",
    backToCatalog: "Voltar ao catálogo",
    watchNow: "Assistir agora",
    duration: "Duração",
    uploadVideo: "Carregar Vídeo",
    uploadDescription: "Carregue um vídeo para traduzir",
    selectFile: "Selecionar Arquivo",
    uploading: "Carregando...",
    processing: "Processando...",
    uploadSuccess: "Carregamento bem-sucedido!",
    uploadError: "Falha no carregamento",
    dragDrop: "Arraste e solte o arquivo aqui ou clique para navegar",
    generateTranslation: "Gerar Tradução",
    // Video titles
    video1: "Introdução à Matemática",
    video2: "Conceitos Básicos de Física",
    video3: "História Mundial: Civilizações Antigas",
    video4: "Introdução à Biologia",
    video5: "Fundamentos da Química",
    video6: "Aprendendo Gramática Inglesa",
    // Categories
    mathematics: "Matemática",
    physics: "Física",
    history: "História",
    biology: "Biologia",
    chemistry: "Química",
    languages: "Línguas",
  },
  zh: {
    videos: "教育视频",
    categories: "类别",
    all: "全部",
    relatedVideos: "相关视频",
    backToCatalog: "返回目录",
    watchNow: "立即观看",
    duration: "时长",
    uploadVideo: "上传视频",
    uploadDescription: "上传视频进行翻译",
    selectFile: "选择文件",
    uploading: "上传中...",
    processing: "处理中...",
    uploadSuccess: "上传成功！",
    uploadError: "上传失败",
    dragDrop: "将文件拖放到此处或点击浏览",
    generateTranslation: "生成翻译",
    // Video titles
    video1: "数学导论",
    video2: "基本物理概念",
    video3: "世界历史：古代文明",
    video4: "生物学导论",
    video5: "化学基础",
    video6: "学习英语语法",
    // Categories
    mathematics: "数学",
    physics: "物理",
    history: "历史",
    biology: "生物学",
    chemistry: "化学",
    languages: "语言",
  },
  hi: {
    videos: "शैक्षिक वीडियो",
    categories: "श्रेणियाँ",
    all: "सभी",
    relatedVideos: "संबंधित वीडियो",
    backToCatalog: "कैटलॉग पर वापस जाएं",
    watchNow: "अभी देखें",
    duration: "अवधि",
    uploadVideo: "वीडियो अपलोड करें",
    uploadDescription: "अनुवाद के लिए वीडियो अपलोड करें",
    selectFile: "फ़ाइल चुनें",
    uploading: "अपलोड हो रहा है...",
    processing: "प्रोसेसिंग हो रही है...",
    uploadSuccess: "अपलोड सफल!",
    uploadError: "अपलोड विफल",
    dragDrop: "फ़ाइल को यहां खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें",
    generateTranslation: "अनुवाद उत्पन्न करें",
    // Video titles
    video1: "गणित का परिचय",
    video2: "मूल भौतिकी अवधारणाएँ",
    video3: "विश्व इतिहास: प्राचीन सभ्यताएँ",
    video4: "जीव विज्ञान का परिचय",
    video5: "रसायन विज्ञान मूल बातें",
    video6: "अंग्रेजी व्याकरण सीखना",
    // Categories
    mathematics: "गणित",
    physics: "भौतिक विज्ञान",
    history: "इतिहास",
    biology: "जीव विज्ञान",
    chemistry: "रसायन विज्ञान",
    languages: "भाषाएँ",
  },
  ar: {
    videos: "فيديوهات تعليمية",
    categories: "الفئات",
    all: "الكل",
    relatedVideos: "فيديوهات ذات صلة",
    backToCatalog: "العودة إلى الفهرس",
    watchNow: "شاهد الآن",
    duration: "المدة",
    uploadVideo: "تحميل فيديو",
    uploadDescription: "قم بتحميل فيديو للترجمة",
    selectFile: "اختر ملف",
    uploading: "جاري التحميل...",
    processing: "جاري المعالجة...",
    uploadSuccess: "تم التحميل بنجاح!",
    uploadError: "فشل التحميل",
    dragDrop: "اسحب وأفلت الملف هنا أو انقر للتصفح",
    generateTranslation: "إنشاء ترجمة",
    // Video titles
    video1: "مقدمة في الرياضيات",
    video2: "مفاهيم الفيزياء الأساسية",
    video3: "تاريخ العالم: الحضارات القديمة",
    video4: "مقدمة في علم الأحياء",
    video5: "أساسيات الكيمياء",
    video6: "تعلم قواعد اللغة الإنجليزية",
    // Categories
    mathematics: "الرياضيات",
    physics: "الفيزياء",
    history: "التاريخ",
    biology: "علم الأحياء",
    chemistry: "الكيمياء",
    languages: "اللغات",
  },
}

// Language code mapping for video files
export const languageCodeMapping = {
  en: "en-US",
  es: "es-US",
  fr: "fr-FR",
  de: "nl-NL",
  pt: "pt-BR",
  zh: "cmn-CN",
  hi: "hi-IN",
  ar: "ar-XA",
}

type TranslationKey = keyof typeof translations.en
type LanguageCode = keyof typeof translations

interface TranslationContextType {
  language: LanguageCode
  setLanguage: (lang: string) => void
  t: (key: TranslationKey) => string
  getVideoUrl: (videoId: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en")

  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && savedLanguage in translations) {
      setLanguageState(savedLanguage as LanguageCode)
    }
  }, [])

  const setLanguage = (lang: string) => {
    if (lang in translations) {
      setLanguageState(lang as LanguageCode)
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key]
  }

  const getVideoUrl = (videoId: string): string => {
    const langCode = languageCodeMapping[language] || "en-US"
    return `https://storage.googleapis.com/aroundtheworldstudy/${videoId}/${langCode}_output.mp4`
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t, getVideoUrl }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
