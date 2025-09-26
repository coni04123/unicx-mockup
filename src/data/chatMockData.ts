// Extended mock data for WhatsApp-style chat interface with Portuguese content

export interface ChatContact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  lastSeen: string;
  isOnline: boolean;
  initials: string;
}

export interface ChatConversation {
  id: string;
  contactId: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isRead: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'audio';
  isIncoming: boolean;
  status: 'sent' | 'delivered' | 'read';
}

// Extended contacts with more realistic data
export const chatContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Beatriz Costa',
    phone: '(11) 99876-5432',
    lastSeen: 'online',
    isOnline: true,
    initials: 'BC',
  },
  {
    id: '2', 
    name: 'Vanessa Alessandra',
    phone: '(11) 98901-2345',
    lastSeen: 'há 5 minutos',
    isOnline: false,
    initials: 'VA',
  },
  {
    id: '3',
    name: 'Maria Eduarda', 
    phone: '(47) 99123-4567',
    lastSeen: 'há 1 hora',
    isOnline: false,
    initials: 'ME',
  },
  {
    id: '4',
    name: 'Isabela Lima',
    phone: '(11) 92345-6789',
    lastSeen: 'há 2 horas',
    isOnline: false,
    initials: 'IL',
  },
  {
    id: '5',
    name: 'Ana Souza',
    phone: '(11) 97890-1234',
    lastSeen: 'ontem',
    isOnline: false,
    initials: 'AS',
  },
  {
    id: '6',
    name: 'Igor Lopes',
    phone: '(11) 95678-4321',
    lastSeen: 'há 3 dias',
    isOnline: false,
    initials: 'IL',
  },
  {
    id: '7',
    name: 'Rafael Dias',
    phone: '(11) 94567-8901',
    lastSeen: 'online',
    isOnline: true,
    initials: 'RD',
  },
  {
    id: '8',
    name: 'Mariana Santos',
    phone: '(11) 93456-7890',
    lastSeen: 'há 10 minutos',
    isOnline: false,
    initials: 'MS',
  },
  {
    id: '9',
    name: 'Grupo Enterprise Col...',
    phone: 'Grupo',
    lastSeen: 'há 30 minutos',
    isOnline: false,
    initials: 'GE',
  },
  {
    id: '10',
    name: 'Luisa Gomes',
    phone: '(11) 92345-6789',
    lastSeen: 'há 1 hora',
    isOnline: false,
    initials: 'LG',
  },
  {
    id: '11',
    name: 'Eduardo Pereira',
    phone: '(11) 91234-5678',
    lastSeen: 'há 2 horas',
    isOnline: false,
    initials: 'EP',
  },
  {
    id: '12',
    name: 'Daniel Santos',
    phone: '(11) 90123-4567',
    lastSeen: 'ontem',
    isOnline: false,
    initials: 'DS',
  },
  {
    id: '13',
    name: 'Rafaela Gomes',
    phone: '(11) 98765-4321',
    lastSeen: 'há 5 dias',
    isOnline: false,
    initials: 'RG',
  },
  {
    id: '14',
    name: 'Carlos Mendes',
    phone: '(21) 97654-3210',
    lastSeen: 'há 1 hora',
    isOnline: false,
    initials: 'CM',
  },
  {
    id: '15',
    name: 'Patricia Silva',
    phone: '(31) 96543-2109',
    lastSeen: 'online',
    isOnline: true,
    initials: 'PS',
  },
];

// Realistic Portuguese conversations
export const chatConversations: ChatConversation[] = [
  {
    id: '1',
    contactId: '7',
    lastMessage: 'Perfeito! E a parte de personalização visual ficou dentro do valor mesmo?',
    timestamp: '13:39',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '2',
    contactId: '1',
    lastMessage: 'Recebido, Bia! Já abri aqui e, de primeira...',
    timestamp: '13:43',
    unreadCount: 1,
    isRead: false,
  },
  {
    id: '3',
    contactId: '8',
    lastMessage: 'Olá, gostaria de prosseguir?',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '4',
    contactId: '9',
    lastMessage: 'Qual o horário da reunião?',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '5',
    contactId: '10',
    lastMessage: 'Vou encerrar nosso atendimento.',
    timestamp: '13:43',
    unreadCount: 1,
    isRead: false,
  },
  {
    id: '6',
    contactId: '11',
    lastMessage: 'Obrigado pela confiança!',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '7',
    contactId: '12',
    lastMessage: 'Vou pensar e depois retorno.',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '8',
    contactId: '13',
    lastMessage: 'Preciso analisar melhor os detalhes.',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '9',
    contactId: '2',
    lastMessage: 'Ótimo! Quando podemos agendar?',
    timestamp: '13:42',
    unreadCount: 2,
    isRead: false,
  },
  {
    id: '10',
    contactId: '3',
    lastMessage: 'Obrigada pela atenção!',
    timestamp: '13:41',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '11',
    contactId: '4',
    lastMessage: 'Tudo bem, aguardo retorno.',
    timestamp: '13:40',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '12',
    contactId: '5',
    lastMessage: 'Perfeita a explicação!',
    timestamp: '13:38',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '13',
    contactId: '14',
    lastMessage: 'Vou analisar e te respondo.',
    timestamp: '13:35',
    unreadCount: 1,
    isRead: false,
  },
  {
    id: '14',
    contactId: '15',
    lastMessage: 'Sim, pode enviar os documentos.',
    timestamp: '13:30',
    unreadCount: 0,
    isRead: true,
  },
];

// Realistic Portuguese messages for Rafael Dias conversation
export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '7',
    content: 'Oi, Bia! Queria te perguntar uma coisa antes.',
    timestamp: '13:38',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '2',
    conversationId: '1',
    senderId: 'me',
    content: 'Rafael, finalizei a proposta que conversamos. Precisa acertar algum detalhe antes que eu envie?',
    timestamp: '13:38',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '3',
    conversationId: '1',
    senderId: 'me',
    content: 'Eu só queria confirmar se nessa proposta já vai incluir o suporte pós-implementação.',
    timestamp: '13:39',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '4',
    conversationId: '1',
    senderId: 'me',
    content: 'Sim! O suporte está incluído. Ah, e o cronograma continua o mesmo, começando na segunda. Inclui tudo de forma detalhada.',
    timestamp: '13:39',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '5',
    conversationId: '1',
    senderId: '7',
    content: 'Perfeito! E a parte de personalização visual ficou dentro do valor mesmo?',
    timestamp: '13:39',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  // Additional messages for other conversations
  {
    id: '6',
    conversationId: '2',
    senderId: '1',
    content: 'Recebido, Bia! Já abri aqui e, de primeira, gostei muito do layout.',
    timestamp: '13:43',
    type: 'text',
    isIncoming: true,
    status: 'delivered',
  },
  {
    id: '7',
    conversationId: '2',
    senderId: '1',
    content: 'Só tenho uma dúvida sobre a integração com o sistema atual.',
    timestamp: '13:44',
    type: 'text',
    isIncoming: true,
    status: 'delivered',
  },
  {
    id: '8',
    conversationId: '3',
    senderId: '8',
    content: 'Olá! Tudo bem?',
    timestamp: '13:40',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '9',
    conversationId: '3',
    senderId: 'me',
    content: 'Oi Mariana! Tudo ótimo, e você?',
    timestamp: '13:41',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '10',
    conversationId: '3',
    senderId: '8',
    content: 'Olá, gostaria de prosseguir com o projeto que conversamos?',
    timestamp: '13:43',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '11',
    conversationId: '4',
    senderId: '9',
    content: 'Pessoal, qual o horário da reunião de amanhã?',
    timestamp: '13:42',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '12',
    conversationId: '4',
    senderId: 'me',
    content: 'A reunião está marcada para às 14h na sala de conferências.',
    timestamp: '13:43',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '13',
    conversationId: '5',
    senderId: '10',
    content: 'Muito obrigada pela atenção e pelo excelente atendimento!',
    timestamp: '13:42',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '14',
    conversationId: '5',
    senderId: 'me',
    content: 'Foi um prazer te ajudar! Qualquer dúvida, é só chamar.',
    timestamp: '13:42',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '15',
    conversationId: '5',
    senderId: '10',
    content: 'Vou encerrar nosso atendimento por aqui então. Até mais!',
    timestamp: '13:43',
    type: 'text',
    isIncoming: true,
    status: 'delivered',
  },
];
