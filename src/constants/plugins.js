import {
  BookOpen,
  Box,
  Calendar,
  ChartNoAxesColumn,
  CreditCard,
  Database,
  Figma,
  FileText,
  Github,
  HardDrive,
  ListTodo,
  Mail,
  Presentation,
  Send,
  Slack,
  Table,
  Ticket,
  Trello,
  Video,
} from 'lucide-react'

export const PLUGINS_PATH = '/chat/plugins'

export const PLUGINS = [
  {
    id: 'gmail',
    connector: 'gmail',
    name: 'Gmail',
    description: 'Read and manage Gmail',
    category: 'Popular',
    icon: Mail,
    tint: 'bg-red-500/15 text-red-400',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Triage PRs, issues, CI, and publish flows',
    category: 'Popular',
    icon: Github,
    tint: 'bg-white/10 text-white',
  },
  {
    id: 'google-drive',
    connector: 'google-drive',
    name: 'Google Drive',
    description: 'Drive, Docs, Sheets or Slides',
    category: 'Popular',
    icon: HardDrive,
    tint: 'bg-amber-500/15 text-amber-400',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Read and manage Slack',
    category: 'Popular',
    icon: Slack,
    tint: 'bg-violet-500/15 text-violet-400',
  },
  {
    id: 'google-calendar',
    connector: 'google-calendar',
    name: 'Google Calendar',
    description: 'Check your schedule and create events',
    category: 'Popular',
    icon: Calendar,
    tint: 'bg-blue-500/15 text-blue-400',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Search pages, databases and notes',
    category: 'Popular',
    icon: FileText,
    tint: 'bg-white/10 text-neutral-200',
  },
]

export const PLUGIN_CATEGORIES = ['Popular']
