import type React from "react"
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  File,
  FileText,
  HelpCircle,
  ImageIcon,
  Laptop,
  Layout,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type LucideIcon,
  Sparkles,
  Palette,
  Globe,
  Code,
  Rocket,
  Zap,
  Github,
  Linkedin,
  Mail,
  Menu,
  ExternalLink,
  Layers,
  Monitor,
  Smartphone,
  Tablet,
  Download,
  Copy,
} from "lucide-react"

export type Icon = LucideIcon

// Custom logo component
const QuickfolioLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

export const Icons = {
  logo: QuickfolioLogo,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: Github,
  twitter: Twitter,
  check: Check,
  sparkles: Sparkles,
  palette: Palette,
  layout: Layout,
  globe: Globe,
  code: Code,
  rocket: Rocket,
  zap: Zap,
  linkedin: Linkedin,
  mail: Mail,
  menu: Menu,
  file: File,
  fileText: FileText,
  image: ImageIcon,
  eye: Eye,
  plus: Plus,
  briefcase: Briefcase,
  externalLink: ExternalLink,
  layers: Layers,
  monitor: Monitor,
  smartphone: Smartphone,
  tablet: Tablet,
  download: Download,
  copy: Copy,
}
