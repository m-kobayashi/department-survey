import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedCard } from "./AnimatedCard"
import { OtherOption } from "./OtherOption"
import { useFormContext } from "@/contexts/FormContext"

export function GeneralAffairsDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    dailyTasks: [],
    dailyTasksOther: "",
    timeConsumingTask: "",
    documentCheck: "",
    templateStandardization: "",
    communicationTools: "",
    eventChallenges: "",
    repetitiveTasks: "",
    aiImprovements: [],
    aiImprovementsOther: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormData(localFormData)
    setFormState('confirmation')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">1. 日常業務の主な内容を教えてください。（複数選択可）</h3>
        <div className="space-y-2">
          {["備品管理", "社内イベント企画", "オフィス環境整備", "社内文書管理"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.dailyTasks.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    dailyTasks: checked
                      ? [...prev.dailyTasks, item]
                      : prev.dailyTasks.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-daily-tasks"
            checked={localFormData.dailyTasks.includes("その他")}
            value={localFormData.dailyTasksOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                dailyTasks: checked
                  ? [...prev.dailyTasks.filter(item => item !== "その他"), "その他"]
                  : prev.dailyTasks.filter(item => item !== "その他"),
                dailyTasksOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">2. 最も時間がかかる業務は何ですか？</h3>
        <Textarea
          value={localFormData.timeConsumingTask}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, timeConsumingTask: e.target.value }))}
          placeholder="最も時間がかかる業務を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. 書類や契約書のチェックはどのように行っていますか？</h3>
        <Textarea
          value={localFormData.documentCheck}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, documentCheck: e.target.value }))}
          placeholder="書類や契約書のチェック方法を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 社内で使用するテンプレートや書式は標準化されていますか？</h3>
        <RadioGroup
          value={localFormData.templateStandardization}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, templateStandardization: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-standardization" />
            <Label htmlFor="yes-standardization">はい</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-standardization" />
            <Label htmlFor="no-standardization">いいえ</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partial" id="partial-standardization" />
            <Label htmlFor="partial-standardization">一部のみ</Label>
          </div>
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">5. 社内コミュニケーションツールやメールの管理方法を教えてください。</h3>
        <Textarea
          value={localFormData.communicationTools}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, communicationTools: e.target.value }))}
          placeholder="社内コミュニケーションツールやメールの管理方法を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. イベントや会議の準備に課題を感じる点はありますか？</h3>
        <Textarea
          value={localFormData.eventChallenges}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, eventChallenges: e.target.value }))}
          placeholder="イベントや会議の準備における課題を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 繰り返し発生する作業は何ですか？</h3>
        <Textarea
          value={localFormData.repetitiveTasks}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, repetitiveTasks: e.target.value }))}
          placeholder="繰り返し発生する作業を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">8. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "社内文書の自動生成",
            "イベント企画のアイデア出し",
            "備品管理の効率化",
            "社内コミュニケーションの分析と改善提案",
            "契約書のチェックと要約",
          ].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.aiImprovements.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    aiImprovements: checked
                      ? [...prev.aiImprovements, item]
                      : prev.aiImprovements.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-ai-improvements"
            checked={localFormData.aiImprovements.includes("その他")}
            value={localFormData.aiImprovementsOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                aiImprovements: checked
                  ? [...prev.aiImprovements.filter(item => item !== "その他"), "その他"]
                  : prev.aiImprovements.filter(item => item !== "その他"),
                aiImprovementsOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
          確認画面へ
        </Button>
      </motion.div>
    </form>
  )
}

