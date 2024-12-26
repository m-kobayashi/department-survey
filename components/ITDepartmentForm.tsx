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

export function ITDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    mainTasks: [],
    mainTasksOther: "",
    troubleshootingTime: "",
    inefficientProcesses: "",
    tools: [],
    toolsOther: "",
    documentationTime: "",
    securityChallenges: "",
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
        <h3 className="text-xl font-semibold mb-4">1. 主な業務内容を教えてください。（複数選択可）</h3>
        <div className="space-y-2">
          {["システム開発", "インフラ管理", "ヘルプデスク", "セキュリティ管理"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.mainTasks.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    mainTasks: checked
                      ? [...prev.mainTasks, item]
                      : prev.mainTasks.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-main-tasks"
            checked={localFormData.mainTasks.includes("その他")}
            value={localFormData.mainTasksOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                mainTasks: checked
                  ? [...prev.mainTasks.filter(item => item !== "その他"), "その他"]
                  : prev.mainTasks.filter(item => item !== "その他"),
                mainTasksOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">2. トラブルシューティングや問い合わせ対応にかかる時間はどのくらいですか？</h3>
        <RadioGroup
          value={localFormData.troubleshootingTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, troubleshootingTime: value }))}
        >
          {["1時間未満/日", "1-3時間/日", "3-5時間/日", "5時間以上/日"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. 現在の開発プロセスや運用フローで非効率だと感じる部分はどこですか？</h3>
        <Textarea
          value={localFormData.inefficientProcesses}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, inefficientProcesses: e.target.value }))}
          placeholder="非効率だと感じる部分を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 使用しているツールやプラットフォームを教えてください。（複数選択可）</h3>
        <div className="space-y-2">
          {["Git", "JIRA", "Slack", "AWS", "Azure", "Google Cloud"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.tools.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    tools: checked
                      ? [...prev.tools, item]
                      : prev.tools.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-tools"
            checked={localFormData.tools.includes("その他")}
            value={localFormData.toolsOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                tools: checked
                  ? [...prev.tools.filter(item => item !== "その他"), "その他"]
                  : prev.tools.filter(item => item !== "その他"),
                toolsOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">5. システムドキュメントや手順書の作成頻度と時間はどれくらいですか？</h3>
        <RadioGroup
          value={localFormData.documentationTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, documentationTime: value }))}
        >
          {["週1回未満", "週1-2回", "週3-4回", "ほぼ毎日"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. セキュリティチェックやコードレビューにおける課題はありますか？</h3>
        <Textarea
          value={localFormData.securityChallenges}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, securityChallenges: e.target.value }))}
          placeholder="セキュリティチェックやコードレビューの課題を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "コード生成・最適化",
            "バグ検出・修正支援",
            "ドキュメント作成の自動化",
            "セキュリティ脆弱性の検出",
            "問い合わせ対応の効率化",
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

