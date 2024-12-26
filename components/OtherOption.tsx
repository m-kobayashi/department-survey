import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface OtherOptionProps {
  id: string
  checked: boolean
  onCheckedChange: (checked: boolean, value: string) => void
  value: string
}

export function OtherOption({ id, checked, onCheckedChange, value }: OtherOptionProps) {
  const [otherValue, setOtherValue] = useState(value)

  useEffect(() => {
    setOtherValue(value)
  }, [value])

  const handleCheckedChange = (newChecked: boolean) => {
    onCheckedChange(newChecked, newChecked ? otherValue : "")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setOtherValue(newValue)
    if (checked) {
      onCheckedChange(true, newValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={handleCheckedChange}
        />
        <Label htmlFor={id}>その他</Label>
      </div>
      {checked && (
        <Input
          value={otherValue}
          onChange={handleInputChange}
          placeholder="その他の内容を入力してください"
          className="w-full mt-2"
        />
      )}
    </div>
  )
}

