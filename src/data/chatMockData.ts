// Extended mock data for WhatsApp-style chat interface with English content

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
    name: 'Sarah Johnson',
    phone: '+1 (555) 0123',
    lastSeen: 'online',
    isOnline: true,
    initials: 'SJ',
  },
  {
    id: '2', 
    name: 'Michael Davis',
    phone: '+1 (555) 0124',
    lastSeen: '5 minutes ago',
    isOnline: false,
    initials: 'MD',
  },
  {
    id: '3',
    name: 'Emily Wilson', 
    phone: '+1 (555) 0125',
    lastSeen: '1 hour ago',
    isOnline: false,
    initials: 'EW',
  },
  {
    id: '4',
    name: 'James Brown',
    phone: '+1 (555) 0126',
    lastSeen: '2 hours ago',
    isOnline: false,
    initials: 'JB',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    phone: '+1 (555) 0127',
    lastSeen: 'yesterday',
    isOnline: false,
    initials: 'LA',
  },
  {
    id: '6',
    name: 'David Miller',
    phone: '+1 (555) 0128',
    lastSeen: '3 days ago',
    isOnline: false,
    initials: 'DM',
  },
  {
    id: '7',
    name: 'Jessica Taylor',
    phone: '+1 (555) 0129',
    lastSeen: 'online',
    isOnline: true,
    initials: 'JT',
  },
  {
    id: '8',
    name: 'Robert Garcia',
    phone: '+1 (555) 0130',
    lastSeen: '10 minutes ago',
    isOnline: false,
    initials: 'RG',
  },
  {
    id: '9',
    name: 'Enterprise Support Team',
    phone: 'Group',
    lastSeen: '30 minutes ago',
    isOnline: false,
    initials: 'ES',
  },
  {
    id: '10',
    name: 'Amanda White',
    phone: '+1 (555) 0131',
    lastSeen: '1 hour ago',
    isOnline: false,
    initials: 'AW',
  },
  {
    id: '11',
    name: 'Christopher Lee',
    phone: '+1 (555) 0132',
    lastSeen: '2 hours ago',
    isOnline: false,
    initials: 'CL',
  },
  {
    id: '12',
    name: 'Michelle Rodriguez',
    phone: '+1 (555) 0133',
    lastSeen: 'yesterday',
    isOnline: false,
    initials: 'MR',
  },
  {
    id: '13',
    name: 'Kevin Martinez',
    phone: '+1 (555) 0134',
    lastSeen: '5 days ago',
    isOnline: false,
    initials: 'KM',
  },
  {
    id: '14',
    name: 'Nicole Thompson',
    phone: '+1 (555) 0135',
    lastSeen: '1 hour ago',
    isOnline: false,
    initials: 'NT',
  },
  {
    id: '15',
    name: 'Ryan Clark',
    phone: '+1 (555) 0136',
    lastSeen: 'online',
    isOnline: true,
    initials: 'RC',
  },
];

// Realistic English conversations
export const chatConversations: ChatConversation[] = [
  {
    id: '1',
    contactId: '7',
    lastMessage: 'Perfect! Is the visual customization included in the quoted price?',
    timestamp: '13:39',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '2',
    contactId: '1',
    lastMessage: 'Received! I opened it and at first glance...',
    timestamp: '13:43',
    unreadCount: 1,
    isRead: false,
  },
  {
    id: '3',
    contactId: '8',
    lastMessage: 'Hello, would you like to proceed?',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '4',
    contactId: '9',
    lastMessage: 'What time is the meeting scheduled?',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '5',
    contactId: '10',
    lastMessage: 'I will close our support session.',
    timestamp: '13:43',
    unreadCount: 1,
    isRead: false,
  },
  {
    id: '6',
    contactId: '11',
    lastMessage: 'Thank you for your trust!',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '7',
    contactId: '12',
    lastMessage: 'I will think about it and get back to you.',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '8',
    contactId: '13',
    lastMessage: 'I need to analyze the details better.',
    timestamp: '13:43',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '9',
    contactId: '2',
    lastMessage: 'Great! When can we schedule this?',
    timestamp: '13:42',
    unreadCount: 2,
    isRead: false,
  },
  {
    id: '10',
    contactId: '3',
    lastMessage: 'Thank you for your attention!',
    timestamp: '13:41',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '11',
    contactId: '4',
    lastMessage: 'Sounds good, I await your response.',
    timestamp: '13:40',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '12',
    contactId: '5',
    lastMessage: 'Perfect explanation!',
    timestamp: '13:38',
    unreadCount: 0,
    isRead: true,
  },
  {
    id: '13',
    contactId: '14',
    lastMessage: 'I will review and respond to you.',
    timestamp: '13:35',
    unreadCount: 1,
    isRead: false,
  },
  {
    id: '14',
    contactId: '15',
    lastMessage: 'Yes, you can send the documents.',
    timestamp: '13:30',
    unreadCount: 0,
    isRead: true,
  },
];

// Realistic English messages for Jessica Taylor conversation
export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '7',
    content: 'Hi! I wanted to ask you something first.',
    timestamp: '13:38',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '2',
    conversationId: '1',
    senderId: 'me',
    content: 'Jessica, I finished the proposal we discussed. Do you need to adjust any details before I send it?',
    timestamp: '13:38',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '3',
    conversationId: '1',
    senderId: 'me',
    content: 'I just wanted to confirm if this proposal already includes post-implementation support.',
    timestamp: '13:39',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '4',
    conversationId: '1',
    senderId: 'me',
    content: 'Yes! Support is included. And the timeline remains the same, starting Monday. Everything is detailed.',
    timestamp: '13:39',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '5',
    conversationId: '1',
    senderId: '7',
    content: 'Perfect! Is the visual customization included in the quoted price?',
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
    content: 'Received! I opened it and at first glance, I really liked the layout.',
    timestamp: '13:43',
    type: 'text',
    isIncoming: true,
    status: 'delivered',
  },
  {
    id: '7',
    conversationId: '2',
    senderId: '1',
    content: 'I just have a question about integration with our current system.',
    timestamp: '13:44',
    type: 'text',
    isIncoming: true,
    status: 'delivered',
  },
  {
    id: '8',
    conversationId: '3',
    senderId: '8',
    content: 'Hello! How are you?',
    timestamp: '13:40',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '9',
    conversationId: '3',
    senderId: 'me',
    content: 'Hi Robert! Everything is great, how about you?',
    timestamp: '13:41',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '10',
    conversationId: '3',
    senderId: '8',
    content: 'Hello, would you like to proceed with the project we discussed?',
    timestamp: '13:43',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '11',
    conversationId: '4',
    senderId: '9',
    content: 'Team, what time is tomorrow\'s meeting?',
    timestamp: '13:42',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '12',
    conversationId: '4',
    senderId: 'me',
    content: 'The meeting is scheduled for 2 PM in the conference room.',
    timestamp: '13:43',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '13',
    conversationId: '5',
    senderId: '10',
    content: 'Thank you so much for your attention and excellent service!',
    timestamp: '13:42',
    type: 'text',
    isIncoming: true,
    status: 'read',
  },
  {
    id: '14',
    conversationId: '5',
    senderId: 'me',
    content: 'It was a pleasure helping you! If you have any questions, just reach out.',
    timestamp: '13:42',
    type: 'text',
    isIncoming: false,
    status: 'read',
  },
  {
    id: '15',
    conversationId: '5',
    senderId: '10',
    content: 'I will close our support session here then. See you later!',
    timestamp: '13:43',
    type: 'text',
    isIncoming: true,
    status: 'delivered',
  },
];
