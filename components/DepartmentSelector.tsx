import { motion } from 'framer-motion'
import { Building2, Calculator, HeadphonesIcon, Briefcase, Users, MonitorIcon, PenTool, TrendingUp } from 'lucide-react'

const departments = [
  { value: "sales", label: "営業部門", icon: Briefcase },
  { value: "accounting", label: "経理部門", icon: Calculator },
  { value: "customerSupport", label: "カスタマーサポート部門", icon: HeadphonesIcon },
  { value: "generalAffairs", label: "総務部門", icon: Building2 },
  { value: "humanResources", label: "人事部門", icon: Users },
  { value: "it", label: "IT部門", icon: MonitorIcon },
  { value: "design", label: "デザイン部門", icon: PenTool },
  { value: "marketing", label: "マーケティング部門", icon: TrendingUp },
]

interface DepartmentSelectorProps {
  onSelect: (department: string) => void
}

export function DepartmentSelector({ onSelect }: DepartmentSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {departments.map((dept) => (
        <motion.button
          key={dept.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => onSelect(dept.value)}
        >
          <dept.icon className="w-12 h-12 mb-2 text-purple-500" />
          <span className="text-sm font-medium text-gray-700">{dept.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

