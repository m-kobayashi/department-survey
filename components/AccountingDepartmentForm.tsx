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

export function AccountingDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    monthlySchedule: [],
    monthlyScheduleOther: "",
    timeConsumingTask: "",
    accountingSoftware: "",
    manualTasks: [],
    manualTasksOther: "",
    repetitiveTasks: [],
    repetitiveTasksOther: "",
    dataCheckTime: "",
    reportingChallenges: "",
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
        <h3 className="text-xl font-semibold mb-4">1. 毎月の経理業務のスケジュールを教えてください。（複数選択可）</h3>
        <div className="space-y-2">
          {["月末締め", "請求書発行"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.monthlySchedule.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    monthlySchedule: checked
                      ? [...prev.monthlySchedule, item]
                      : prev.monthlySchedule.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-monthly-schedule"
            checked={localFormData.monthlySchedule.includes("その他")}
            value={localFormData.monthlyScheduleOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                monthlySchedule: checked
                  ? [...prev.monthlySchedule.filter(item => item !== "その他"), "その他"]
                  : prev.monthlySchedule.filter(item => item !== "その他"),
                monthlyScheduleOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">2. 1ヶ月のうち、どの業務に最も時間がかかっていますか？</h3>
        <Textarea
          value={localFormData.timeConsumingTask}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, timeConsumingTask: e.target.value }))}
          placeholder="最も時間がかかる業務を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. 現在使用している会計ソフトやツールは何ですか？</h3>
        <Input
          value={localFormData.accountingSoftware}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, accountingSoftware: e.target.value }))}
          placeholder="使用している会計ソフトやツールを入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 手動で処理している業務はありますか？（複数選択可）</h3>
        <div className="space-y-2">
          {["領収書管理", "請求書作成"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.manualTasks.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    manualTasks: checked
                      ? [...prev.manualTasks, item]
                      : prev.manualTasks.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-manual-tasks"
            checked={localFormData.manualTasks.includes("その他")}
            value={localFormData.manualTasksOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                manualTasks: checked
                  ? [...prev.manualTasks.filter(item => item !== "その他"), "その他"]
                  : prev.manualTasks.filter(item => item !== "その他"),
                manualTasksOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">5. 繰り返し作業が多い業務はありますか？（複数選択可）</h3>
        <div className="space-y-2">
          {["データ入力", "仕訳"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.repetitiveTasks.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    repetitiveTasks: checked
                      ? [...prev.repetitiveTasks, item]
                      : prev.repetitiveTasks.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-repetitive-tasks"
            checked={localFormData.repetitiveTasks.includes("その他")}
            value={localFormData.repetitiveTasksOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                repetitiveTasks: checked
                  ? [...prev.repetitiveTasks.filter(item => item !== "その他"), "その他"]
                  : prev.repetitiveTasks.filter(item => item !== "その他"),
                repetitiveTasksOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. 書類やデータの不備チェックに時間がかかることはありますか？</h3>
        <RadioGroup
          value={localFormData.dataCheckTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, dataCheckTime: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-data-check" />
            <Label htmlFor="yes-data-check">はい</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-data-check" />
            <Label htmlFor="no-data-check">いいえ</Label>
          </div>
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. レポートや分析資料の作成における課題は何ですか？</h3>
        <Textarea
          value={localFormData.reportingChallenges}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, reportingChallenges: e.target.value }))}
          placeholder="レポートや分析資料作成の課題を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">8. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "領収書のOCR処理と自動仕訳",
            "定期的な収支レポートの自動生成",
            "請求書作成のテンプレート自動化",
            "経費精算業務の効率化",
            "データ入力時の不整合検出やエラーチェック",
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

