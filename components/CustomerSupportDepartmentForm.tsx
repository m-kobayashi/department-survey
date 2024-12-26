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

export function CustomerSupportDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    dailyInquiries: "",
    topInquiries: ["", "", ""],
    faqUsage: "",
    faqFrequency: "",
    recordManagement: [],
    recordManagementOther: "",
    challengesInResponse: [],
    challengesInResponseOther: "",
    crossDepartmentInquiries: "",
    recordSummaryTime: "",
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
        <h3 className="text-xl font-semibold mb-4">1. 1日あたりの顧客対応件数はどのくらいですか？</h3>
        <RadioGroup
          value={localFormData.dailyInquiries}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, dailyInquiries: value }))}
        >
          {["10件未満", "10-30件", "31-50件", "51件以上"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">2. よくある問い合わせ内容のトップ3は何ですか？</h3>
        {[0, 1, 2].map((index) => (
          <Input
            key={index}
            value={localFormData.topInquiries[index]}
            onChange={(e) => {
              const newTopInquiries = [...localFormData.topInquiries]
              newTopInquiries[index] = e.target.value
              setLocalFormData((prev) => ({ ...prev, topInquiries: newTopInquiries }))
            }}
            placeholder={`トップ${index + 1}の問い合わせ内容`}
            className="w-full mb-2"
          />
        ))}
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. FAQやテンプレートは用意していますか？</h3>
        <RadioGroup
          value={localFormData.faqUsage}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, faqUsage: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-faq" />
            <Label htmlFor="yes-faq">はい</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-faq" />
            <Label htmlFor="no-faq">いいえ</Label>
          </div>
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. FAQやテンプレートの利用頻度はどれくらいですか？</h3>
        <RadioGroup
          value={localFormData.faqFrequency}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, faqFrequency: value }))}
        >
          {["ほぼ毎回使用", "時々使用", "あまり使用しない", "全く使用しない"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">5. 顧客対応記録の管理方法は？（複数選択可）</h3>
        <div className="space-y-2">
          {["CRMツール", "Excel", "紙"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.recordManagement.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    recordManagement: checked
                      ? [...prev.recordManagement, item]
                      : prev.recordManagement.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-record-management"
            checked={localFormData.recordManagement.includes("その他")}
            value={localFormData.recordManagementOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                recordManagement: checked
                  ? [...prev.recordManagement.filter(item => item !== "その他"), "その他"]
                  : prev.recordManagement.filter(item => item !== "その他"),
                recordManagementOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. 問い合わせ対応において課題だと感じる点は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {["応答スピード", "情報不足"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.challengesInResponse.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    challengesInResponse: checked
                      ? [...prev.challengesInResponse, item]
                      : prev.challengesInResponse.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-challenges"
            checked={localFormData.challengesInResponse.includes("その他")}
            value={localFormData.challengesInResponseOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                challengesInResponse: checked
                  ? [...prev.challengesInResponse.filter(item => item !== "その他"), "その他"]
                  : prev.challengesInResponse.filter(item => item !== "その他"),
                challengesInResponseOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 他部門との連携が必要な問い合わせは何％くらいありますか？</h3>
        <RadioGroup
          value={localFormData.crossDepartmentInquiries}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, crossDepartmentInquiries: value }))}
        >
          {["10%未満", "10-30%", "31-50%", "51%以上"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">8. 対応後の記録や要約に時間がかかることはありますか？</h3>
        <RadioGroup
          value={localFormData.recordSummaryTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, recordSummaryTime: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-summary-time" />
            <Label htmlFor="yes-summary-time">はい</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-summary-time" />
            <Label htmlFor="no-summary-time">いいえ</Label>
          </div>
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">9. 生成AIを活用して改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "FAQからの自動応答システムの導入",
            "問い合わせ履歴の要約と次回対応の提案",
            "よくある問い合わせのテンプレート回答作成",
            "対応スピード向上のためのチャットボット活用",
            "顧客満足度アンケートの結果分析と改善提案",
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

