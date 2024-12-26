import { Button } from "@/components/ui/button"
import { AnimatedCard } from "./AnimatedCard"

interface ConfirmationScreenProps {
  formData: any
  onConfirm: () => void
  onEdit: () => void
}

const fieldNameMapping: { [key: string]: string } = {
  activities: "1. 営業活動の主な内容は何ですか？（複数選択可）",
  activitiesOther: "営業活動のその他の内容",
  timeSpent: "2. 1週間のうち営業活動に費やす時間は何時間程度ですか？",
  customerManagement: "3. 顧客情報はどのように管理していますか？（複数選択可）",
  customerManagementOther: "顧客情報の管理方法（その他）",
  quoteTime: "4. 見積もり作成にかかる時間はどのくらいですか？",
  useSalesTemplates: "5. 日常的に使用している営業資料やテンプレートはありますか？",
  challengesInCustomerResponse: "6. 顧客対応の際に課題だと感じる点は何ですか？（複数選択可）",
  challengesInCustomerResponseOther: "顧客対応の課題（その他）",
  repeatedTasks: "7. 営業プロセスで繰り返し発生する作業は何ですか？",
  aiImprovements: "8. 生成AIで改善したい業務は何ですか？（複数選択可）",
  aiImprovementsOther: "生成AIで改善したい業務（その他）",
  mainTasks: "1. 主な業務内容を教えてください。（複数選択可）",
  mainTasksOther: "主な業務内容（その他）",
  timeConsumingTask: "2. 1ヶ月の中で最も時間がかかる業務は何ですか？",
  dailyInquiries: "1. 1日あたりの顧客対応件数はどのくらいですか？",
  topInquiries: "2. よくある問い合わせ内容のトップ3は何ですか？",
  faqUsage: "3. FAQやテンプレートは用意していますか？",
  faqFrequency: "4. FAQやテンプレートの利用頻度はどれくらいですか？",
  recordManagement: "5. 顧客対応記録の管理方法は？（複数選択可）",
  recordManagementOther: "顧客対応記録の管理方法（その他）",
  crossDepartmentInquiries: "7. 他部門との連携が必要な問い合わせは何％くらいありますか？",
  recordSummaryTime: "8. 対応後の記録や要約に時間がかかることはありますか？",
  dailyTasks: "1. 日常業務の主な内容を教えてください。（複数選択可）",
  dailyTasksOther: "日常業務の主な内容（その他）",
  documentCheck: "3. 書類や契約書のチェックはどのように行っていますか？",
  templateStandardization: "4. 社内で使用するテンプレートや書式は標準化されていますか？",
  communicationTools: "5. 社内コミュニケーションツールやメールの管理方法を教えてください。",
  eventChallenges: "6. イベントや会議の準備に課題を感じる点はありますか？",
  recruitmentTime: "1. 採用活動にかかる時間や手間はどのくらいですか？",
  jobPostingManagement: "2. 求人票や面接スケジュールの管理はどのように行っていますか？",
  employeeInquiryChallenges: "3. 社員からの問い合わせ対応（例: 福利厚生、休暇申請）で課題を感じる点は？",
  evaluationSheetTime: "4. 人事評価シートの作成や更新にどのくらいの時間を費やしていますか？",
  surveyFrequency: "5. 社内アンケートやヒアリングを行う頻度はどのくらいですか？",
  surveyUtilization: "6. 社内アンケートやヒアリングの結果をどのように活用していますか？",
  repetitiveTasks: "7. 繰り返し発生する作業は何ですか？（複数選択可）",
  repetitiveTasksOther: "繰り返し発生する作業（その他）",
  troubleshootingTime: "2. トラブルシューティングや問い合わせ対応にかかる時間はどのくらいですか？",
  inefficientProcesses: "3. 現在の開発プロセスや運用フローで非効率だと感じる部分はどこですか？",
  tools: "4. 使用しているツールやプラットフォームを教えてください。（複数選択可）",
  toolsOther: "使用しているツールやプラットフォーム（その他）",
  documentationTime: "5. システムドキュメントや手順書の作成頻度と時間はどれくらいですか？",
  securityChallenges: "6. セキュリティチェックやコードレビューにおける課題はありますか？",
  designTime: "2. デザイン案の作成から完成までの平均的な作業時間を教えてください。",
  revisionFrequency: "3. クライアントや他部門からの修正依頼の頻度はどれくらいですか？",
  designTools: "4. 使用しているデザインツールを教えてください。（複数選択可）",
  designToolsOther: "使用しているデザインツール（その他）",
  brainstormingTime: "5. アイデア出し（ブレインストーミング）にかける時間はどのくらいですか？",
  revisionChallenges: "6. デザインの修正対応で課題に感じる点は何ですか？",
  analysisTime: "3. 分析やレポート作成にはどれくらいの時間を費やしていますか？",
  campaignAnalysis: "5. 過去のキャンペーンで成功/失敗した要因をどのように分析していますか？",
  materialChallenges: "6. マーケティング資料の作成で課題を感じる点は何ですか？"
};

export function ConfirmationScreen({ formData, onConfirm, onEdit }: ConfirmationScreenProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">入力内容の確認</h2>
      <AnimatedCard>
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <h3 className="font-semibold">{fieldNameMapping[key] || `${key}（未翻訳）`}</h3>
              <p>{Array.isArray(value) ? value.join(", ") : value}</p>
            </div>
          ))}
        </div>
      </AnimatedCard>
      <div className="flex justify-between">
        <Button onClick={onEdit} variant="outline">
          編集する
        </Button>
        <Button onClick={onConfirm}>
          送信する
        </Button>
      </div>
    </div>
  )
}

