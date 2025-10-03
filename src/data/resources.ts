import { Resource } from "@/types/wellness";

export const resources: Resource[] = [
  {
    id: "1",
    title: "Meditación Guiada para Principiantes",
    description: "Una introducción suave a la meditación mindfulness, perfecta para reducir el estrés y la ansiedad.",
    category: "meditation",
    link: "https://positivepsychology.com/meditation-techniques-beginners/"
  },
  {
    id: "2",
    title: "Ejercicios de Respiración",
    description: "Técnicas de respiración profunda para calmar la mente y reducir la tensión física.",
    category: "stress",
    link: "https://positivepsychology.com/breathing-exercises/"
  },
  {
    id: "3",
    title: "Rutina de Ejercicio para el Bienestar Mental",
    description: "Cómo el ejercicio regular mejora el estado de ánimo y reduce los síntomas de depresión.",
    category: "exercise",
    link: "https://positivepsychology.com/physical-activity-mental-health/"
  },
  {
    id: "4",
    title: "Higiene del Sueño",
    description: "Estrategias para mejorar la calidad del sueño y establecer rutinas saludables.",
    category: "sleep",
    link: "https://positivepsychology.com/sleep-hygiene/"
  },
  {
    id: "5",
    title: "Diario de Gratitud",
    description: "Cómo llevar un diario de gratitud puede transformar tu perspectiva y bienestar emocional.",
    category: "meditation",
    link: "https://positivepsychology.com/gratitude-journal/"
  },
  {
    id: "6",
    title: "Manejo del Estrés Académico",
    description: "Técnicas específicas para estudiantes para manejar la presión académica.",
    category: "stress",
    link: "https://conecta.tec.mx/es/noticias/aguascalientes/salud/encuentra-tu-balance-5-tips-para-manejar-el-estres-academico"
  },
  {
    id: "7",
    title: "Líneas de Ayuda 24/7",
    description: "Si necesitas hablar con alguien de inmediato, estas líneas ofrecen apoyo confidencial.",
    category: "emergency",
    link: "tel:*4141"
  },
  {
    id: "8",
    title: "Actividades Físicas Suaves",
    description: "Yoga y estiramientos para mejorar el bienestar físico y mental.",
    category: "exercise",
    link: "https://positivepsychology.com/yoga-therapy/"
  }
];

export const getResourcesByMood = (mood: number): Resource[] => {
  if (mood <= 2) {
    return resources.filter(r => 
      r.category === 'emergency' || 
      r.category === 'meditation' || 
      r.category === 'stress'
    );
  } else if (mood <= 4) {
    return resources.filter(r => 
      r.category === 'meditation' || 
      r.category === 'stress' ||
      r.category === 'exercise'
    );
  } else {
    return resources.filter(r => 
      r.category === 'exercise' || 
      r.category === 'sleep'
    );
  }
};
