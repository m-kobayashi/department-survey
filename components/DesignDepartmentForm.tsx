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

export function DesignDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    mainTasks: [],
    mainTasksOther: "",
    designTime: "",
    revisionFrequency: "",
    designTools: [],
    designToolsOther: "",
    brainstormingTime: "",
    revisionChallenges: "",
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
          {["ウェブデザイン", "グラフィックデザイン", "UI/UXデザイン", "ブランディングデザイン"].map((item) => (
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
        <h3 className="text-xl font-semibold mb-4">2. デザイン案の作成から完成までの平均的な作業時間を教えてください。</h3>
        <RadioGroup
          value={localFormData.designTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, designTime: value }))}
        >
          {["1日以内", "2-3日", "4-7日", "1週間以上"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. クライアントや他部門からの修正依頼の頻度はどれくらいですか？</h3>
        <RadioGroup
          value={localFormData.revisionFrequency}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, revisionFrequency: value }))}
        >
          {["ほぼ毎回", "半分程度", "たまに", "ほとんどない"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 使用しているデザインツールを教えてください。（複数選択可）</h3>
        <div className="space-y-2">
          {["Adobe Creative Suite", "Figma", "Sketch", "Canva", "Blender"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.designTools.includes(item)}
                checked={localFormData.designTools.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    designTools: checked
                      ? [...prev.designTools, item]
                      : prev.designTools.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-design-tools"
            checked={localFormData.designTools.includes("その他")}
            value={localFormData.designToolsOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                designTools: checked
                  ? [...prev.designTools.filter(item => item !== "その他"), "その他"]
                  : prev.designTools.filter(item => item !== "その他"),
                designToolsOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">5. アイデア出し（ブレインストーミング）にかける時間はどのくらいですか？</h3>
        <RadioGroup
          value={localFormData.brainstormingTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, brainstormingTime: value }))}
        >
          {["30分未満", "30分-1時間", "1-2時間", "2時間以上"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. デザインの修正対応で課題に感じる点は何ですか？</h3>
        <Textarea
          value={localFormData.revisionChallenges}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, revisionChallenges: e.target.value }))}
          placeholder="デザイン修正対応の課題を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "アイデア出しの効率化",
            "デザインバリエーションの自動生成",
            "画像編集・加工の自動化",
            "レイアウト提案の自動生成",
            "カラーパレットの提案",
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

