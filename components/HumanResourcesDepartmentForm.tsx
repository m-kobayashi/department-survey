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

export function HumanResourcesDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    recruitmentTime: "",
    jobPostingManagement: "",
    employeeInquiryChallenges: "",
    evaluationSheetTime: "",
    surveyFrequency: "",
    surveyUtilization: "",
    repetitiveTasks: [],
    repetitiveTasksOther: "",
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
        <h3 className="text-xl font-semibold mb-4">1. 採用活動にかかる時間や手間はどのくらいですか？</h3>
        <RadioGroup
          value={localFormData.recruitmentTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, recruitmentTime: value }))}
        >
          {["非常に多い", "やや多い", "適度", "少ない"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">2. 求人票や面接スケジュールの管理はどのように行っていますか？</h3>
        <Textarea
          value={localFormData.jobPostingManagement}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, jobPostingManagement: e.target.value }))}
          placeholder="求人票や面接スケジュールの管理方法を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. 社員からの問い合わせ対応（例: 福利厚生、休暇申請）で課題を感じる点は？</h3>
        <Textarea
          value={localFormData.employeeInquiryChallenges}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, employeeInquiryChallenges: e.target.value }))}
          placeholder="社員からの問い合わせ対応における課題を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 人事評価シートの作成や更新にどのくらいの時間を費やしていますか？</h3>
        <RadioGroup
          value={localFormData.evaluationSheetTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, evaluationSheetTime: value }))}
        >
          {["1時間未満", "1-3時間", "3-5時間", "5時間以上"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">5. 社内アンケートやヒアリングを行う頻度はどのくらいですか？</h3>
        <RadioGroup
          value={localFormData.surveyFrequency}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, surveyFrequency: value }))}
        >
          {["月1回以上", "四半期に1回", "半年に1回", "年1回", "実施していない"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. 社内アンケートやヒアリングの結果をどのように活用していますか？</h3>
        <Textarea
          value={localFormData.surveyUtilization}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, surveyUtilization: e.target.value }))}
          placeholder="社内アンケートやヒアリングの結果の活用方法を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 繰り返し発生する作業は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {["給与計算", "勤怠管理", "社会保険手続き", "研修資料作成"].map((item) => (
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
        <h3 className="text-xl font-semibold mb-4">8. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "採用プロセスの効率化",
            "社員からの問い合わせ対応の自動化",
            "人事評価シートの自動生成",
            "研修資料の作成支援",
            "社内アンケート結果の分析と洞察",
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

