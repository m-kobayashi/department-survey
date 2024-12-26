import { Button } from "@/components/ui/button"
import { AnimatedCard } from "./AnimatedCard"

interface CompletionScreenProps {
  onReturnToTop: () => void
}

export function CompletionScreen({ onReturnToTop }: CompletionScreenProps) {
  return (
    <AnimatedCard>
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">送信完了</h2>
        <p>ありがとうございました。アンケートの回答が正常に送信されました。</p>
        <Button onClick={onReturnToTop}>
          トップへ戻る
        </Button>
      </div>
    </AnimatedCard>
  )
}

