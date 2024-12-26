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

export function MarketingDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    mainTasks: [],
    mainTasksOther: "",
    timeConsumingTask: "",
    analysisTime: "",
    tools: [],
    toolsOther: "",
    campaignAnalysis: "",
    materialChallenges: "",
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
          {["デジタルマーケティング", "コンテンツマーケティング", "SNS運用", "広告運用", "市場調査"].map((item) => (
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
        <h3 className="text-xl font-semibold mb-4">2. 最も時間がかかる業務は何ですか？</h3>
        <Textarea
          value={localFormData.timeConsumingTask}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, timeConsumingTask: e.target.value }))}
          placeholder="最も時間がかかる業務を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. 分析やレポート作成にはどれくらいの時間を費やしていますか？</h3>
        <RadioGroup
          value={localFormData.analysisTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, analysisTime: value }))}
        >
          {["1時間未満/週", "1-3時間/週", "3-5時間/週", "5時間以上/週"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 使用しているツールやプラットフォームを教えてください。（複数選択可）</h3>
        <div className="space-y-2">
          {["Google Analytics", "Google Ads", "Facebook Ads", "HubSpot", "Mailchimp", "SEMrush"].map((item) => (
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
        <h3 className="text-xl font-semibold mb-4">5. 過去のキャンペーンで成功/失敗した要因をどのように分析していますか？</h3>
        <Textarea
          value={localFormData.campaignAnalysis}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, campaignAnalysis: e.target.value }))}
          placeholder="キャンペーン分析の方法を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. マーケティング資料の作成で課題を感じる点は何ですか？</h3>
        <Textarea
          value={localFormData.materialChallenges}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, materialChallenges: e.target.value }))}
          placeholder="マーケティング資料作成の課題を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "コンテンツ作成の効率化",
            "ターゲット顧客の分析と洞察",
            "広告コピーの自動生成",
            "キャンペーン効果予測",
            "競合分析の自動化",
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

