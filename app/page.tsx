"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DepartmentSelector } from "@/components/DepartmentSelector"
import { SalesDepartmentForm } from "@/components/SalesDepartmentForm"
import { AccountingDepartmentForm } from "@/components/AccountingDepartmentForm"
import { CustomerSupportDepartmentForm } from "@/components/CustomerSupportDepartmentForm"
import { GeneralAffairsDepartmentForm } from "@/components/GeneralAffairsDepartmentForm"
import { HumanResourcesDepartmentForm } from "@/components/HumanResourcesDepartmentForm"
import { ITDepartmentForm } from "@/components/ITDepartmentForm"
import { DesignDepartmentForm } from "@/components/DesignDepartmentForm"
import { MarketingDepartmentForm } from "@/components/MarketingDepartmentForm"
import { ConfirmationScreen } from "@/components/ConfirmationScreen"
import { CompletionScreen } from "@/components/CompletionScreen"
import { Layout } from "@/components/Layout"
import { FormProvider, useFormContext } from "@/contexts/FormContext"

function SurveyContent() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const { formState, setFormState, formData } = useFormContext()

  const renderForm = () => {
    switch (selectedDepartment) {
      case "sales":
        return <SalesDepartmentForm />
      case "accounting":
        return <AccountingDepartmentForm />
      case "customerSupport":
        return <CustomerSupportDepartmentForm />
      case "generalAffairs":
        return <GeneralAffairsDepartmentForm />
      case "humanResources":
        return <HumanResourcesDepartmentForm />
      case "it":
        return <ITDepartmentForm />
      case "design":
        return <DesignDepartmentForm />
      case "marketing":
        return <MarketingDepartmentForm />
      default:
        return null
    }
  }

  const handleConfirm = () => {
    // Here you would typically send the data to a server
    console.log(formData)
    setFormState('completion')
  }

  const handleReturnToTop = () => {
    setSelectedDepartment(null)
    setFormState('input')
  }

  return (
    <AnimatePresence mode="wait">
      {formState === 'input' && !selectedDepartment && (
        <motion.div
          key="selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">部門を選択してください</h2>
          <DepartmentSelector onSelect={setSelectedDepartment} />
        </motion.div>
      )}
      {formState === 'input' && selectedDepartment && (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={() => setSelectedDepartment(null)}
            className="mb-6 text-purple-500 hover:text-purple-700 transition-colors duration-200"
          >
            ← 部門選択に戻る
          </button>
          <h2 className="text-2xl font-bold mb-6">
            {selectedDepartment === "sales" && "営業部門"}
            {selectedDepartment === "accounting" && "経理部門"}
            {selectedDepartment === "customerSupport" && "カスタマーサポート部門"}
            {selectedDepartment === "generalAffairs" && "総務部門"}
            {selectedDepartment === "humanResources" && "人事部門"}
            {selectedDepartment === "it" && "IT部門"}
            {selectedDepartment === "design" && "デザイン部門"}
            {selectedDepartment === "marketing" && "マーケティング部門"}
          </h2>
          {renderForm()}
        </motion.div>
      )}
      {formState === 'confirmation' && (
        <motion.div
          key="confirmation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ConfirmationScreen
            formData={formData}
            onConfirm={handleConfirm}
            onEdit={() => setFormState('input')}
          />
        </motion.div>
      )}
      {formState === 'completion' && (
        <motion.div
          key="completion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CompletionScreen onReturnToTop={handleReturnToTop} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <Layout>
      <FormProvider>
        <SurveyContent />
      </FormProvider>
    </Layout>
  )
}

