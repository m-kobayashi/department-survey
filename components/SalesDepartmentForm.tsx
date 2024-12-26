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

export function SalesDepartmentForm() {
  const { setFormData, setFormState } = useFormContext()
  const [localFormData, setLocalFormData] = useState({
    activities: [],
    activitiesOther: "",
    timeSpent: "",
    customerManagement: [],
    customerManagementOther: "",
    quoteTime: "",
    useSalesTemplates: "",
    challengesInCustomerResponse: [],
    challengesInCustomerResponseOther: "",
    repeatedTasks: "",
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
        <h3 className="text-xl font-semibold mb-4">1. 営業活動の主な内容は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {["新規顧客開拓", "既存顧客フォロー"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.activities.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    activities: checked
                      ? [...prev.activities, item]
                      : prev.activities.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-activities"
            checked={localFormData.activities.includes("その他")}
            value={localFormData.activitiesOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                activities: checked
                  ? [...prev.activities.filter(item => item !== "その他"), "その他"]
                  : prev.activities.filter(item => item !== "その他"),
                activitiesOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">2. 1週間のうち営業活動に費やす時間は何時間程度ですか？</h3>
        <RadioGroup
          value={localFormData.timeSpent}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, timeSpent: value }))}
        >
          {["10時間未満", "10-20時間", "21-30時間", "31-40時間", "41時間以上"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">3. 顧客情報はどのように管理していますか？（複数選択可）</h3>
        <div className="space-y-2">
          {["CRMツール", "Excel"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.customerManagement.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    customerManagement: checked
                      ? [...prev.customerManagement, item]
                      : prev.customerManagement.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-customer-management"
            checked={localFormData.customerManagement.includes("その他")}
            value={localFormData.customerManagementOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                customerManagement: checked
                  ? [...prev.customerManagement.filter(item => item !== "その他"), "その他"]
                  : prev.customerManagement.filter(item => item !== "その他"),
                customerManagementOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">4. 見積もり作成にかかる時間はどのくらいですか？</h3>
        <RadioGroup
          value={localFormData.quoteTime}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, quoteTime: value }))}
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
        <h3 className="text-xl font-semibold mb-4">5. 日常的に使用している営業資料やテンプレートはありますか？</h3>
        <RadioGroup
          value={localFormData.useSalesTemplates}
          onValueChange={(value) => setLocalFormData((prev) => ({ ...prev, useSalesTemplates: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes-templates" />
            <Label htmlFor="yes-templates">はい</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no-templates" />
            <Label htmlFor="no-templates">いいえ</Label>
          </div>
        </RadioGroup>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">6. 顧客対応の際に課題だと感じる点は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {["レスポンスの速さ", "情報の正確性"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={localFormData.challengesInCustomerResponse.includes(item)}
                onCheckedChange={(checked) => {
                  setLocalFormData((prev) => ({
                    ...prev,
                    challengesInCustomerResponse: checked
                      ? [...prev.challengesInCustomerResponse, item]
                      : prev.challengesInCustomerResponse.filter((i) => i !== item),
                  }))
                }}
              />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
          <OtherOption
            id="other-challenges"
            checked={localFormData.challengesInCustomerResponse.includes("その他")}
            value={localFormData.challengesInCustomerResponseOther}
            onCheckedChange={(checked, value) => {
              setLocalFormData((prev) => ({
                ...prev,
                challengesInCustomerResponse: checked
                  ? [...prev.challengesInCustomerResponse.filter(item => item !== "その他"), "その他"]
                  : prev.challengesInCustomerResponse.filter(item => item !== "その他"),
                challengesInCustomerResponseOther: value,
              }))
            }}
          />
        </div>
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">7. 営業プロセスで繰り返し発生する作業は何ですか？</h3>
        <Textarea
          value={localFormData.repeatedTasks}
          onChange={(e) => setLocalFormData((prev) => ({ ...prev, repeatedTasks: e.target.value }))}
          placeholder="繰り返し発生する作業を入力してください"
          className="w-full"
        />
      </AnimatedCard>

      <AnimatedCard>
        <h3 className="text-xl font-semibold mb-4">8. 生成AIで改善したい業務は何ですか？（複数選択可）</h3>
        <div className="space-y-2">
          {[
            "見積書や提案書の自動作成",
            "メール返信やフォローアップメールの自動生成",
            "営業日報の要約と整理",
            "顧客リストの優先順位付け（CRMデータの分析）",
            "新規顧客のターゲティングアイデア提案",
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

