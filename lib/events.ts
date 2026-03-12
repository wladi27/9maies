export type Event = {
  _id: string
  title: string
  description: string
  date: string | null
  location: string | null
  featuredImage?: string | null
}

export const EVENTS: Event[] = [
  {
    _id: 'evt-1',
    title: 'Evento en Panamá',
    description: 'Estrategias cuantitativas, IA aplicada y gestión patrimonial de próxima generación.',
    date: new Date(2026, 0, 8, 18, 30, 0).toISOString(),
    location: 'RENAISSANCE Panamá City Hotel. Vía España Calle Ricardo Arias. Ciudad de Panamá.',
    featuredImage: '/images/panama-evento.png',
  },
  {
    _id: 'evt-2',
    title: 'Evento en Dubái EAU',
    description: 'Casos reales de automatización de carteras. Del 6 al 9 de febrero de 2026.',
    date: new Date(2026, 1, 6, 10, 0, 0).toISOString(),
    location: 'Por definir',
    featuredImage: '/images/dubai-evento.png',
  },
  {
    _id: 'evt-3',
    title: 'Evento en México',
    description: 'Arquitectura de datos, señales y ejecución autónoma en múltiples mercados.',
    date: new Date(2025, 11, 17, 16, 0, 0).toISOString(),
    location: 'Ciudad de México, México',
    featuredImage: '/images/mexico-evento.png',
  },
]

export function getEvents() {
  return EVENTS
}

export function getEventById(id: string) {
  return EVENTS.find((e) => e._id === id) ?? null
}
