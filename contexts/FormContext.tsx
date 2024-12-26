import React, { createContext, useContext, useState } from 'react'

interface FormContextType {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  formState: 'input' | 'confirmation' | 'completion'
  setFormState: React.Dispatch<React.SetStateAction<'input' | 'confirmation' | 'completion'>>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState({})
  const [formState, setFormState] = useState<'input' | 'confirmation' | 'completion'>('input')

  return (
    <FormContext.Provider value={{ formData, setFormData, formState, setFormState }}>
      {children}
    </FormContext.Provider>
  )
}

