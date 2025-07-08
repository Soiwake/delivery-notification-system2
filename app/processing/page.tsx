"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Send, Eye, User, Building2 } from "lucide-react"

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState("reading")
  const [extractedInfo, setExtractedInfo] = useState<{ name: string; department: string } | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true)
          setExtractedInfo({
            name: "田中 太郎",
            department: "営業部",
          })
          setStage("complete")
          clearInterval(timer)
          return 100
        }
        return prev + 10
      })
    }, 300)

    return () => clearInterval(timer)
  }, [])

  const handleSend = () => {
    router.push("/success")
  }

  const getStageMessage = () => {
    switch (stage) {
      case "reading":
        return "伝票を読み取り中..."
      case "complete":
        return "読み取り完了。送信準備ができました。"
      default:
        return "処理中..."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-blue-900 to-cyan-800 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-600/20 to-cyan-600/20" />
      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">伝票処理中</h1>
          <p className="text-violet-100 text-lg">AI-OCRによる読み取りを行っています</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Progress Section */}
            <div className="text-center mb-8">
              <div className="mb-6">
                {isComplete ? (
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full animate-ping mx-auto" />
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      className="w-20 h-20 border-4 border-gradient-to-r from-violet-500 to-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                      style={{
                        background: "conic-gradient(from 0deg, #8b5cf6, #06b6d4, transparent, transparent)",
                        borderImage: "conic-gradient(from 0deg, #8b5cf6, #06b6d4) 1",
                      }}
                    />
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-violet-400/20 to-cyan-400/20 rounded-full animate-pulse mx-auto" />
                  </div>
                )}
              </div>

              <Progress value={progress} className="w-full mb-4 h-3 bg-gray-200" />

              <p className="text-xl font-semibold text-gray-700 mb-2">{getStageMessage()}</p>

              <p className="text-violet-600 font-medium">{progress}% 完了</p>
            </div>

            {/* Extracted Information Preview */}
            {isComplete && extractedInfo && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 mb-6 shadow-inner">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mr-3">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-800">読み取り結果</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center bg-white/60 rounded-lg p-3">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">配達先:</span>
                    <span className="ml-2 font-bold text-gray-900">{extractedInfo.name}</span>
                  </div>
                  <div className="flex items-center bg-white/60 rounded-lg p-3">
                    <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md mr-3">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">部署:</span>
                    <span className="ml-2 font-bold text-gray-900">{extractedInfo.department}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <Button
                size="lg"
                onClick={handleSend}
                disabled={!isComplete}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 shadow-lg disabled:from-gray-400 disabled:to-gray-500"
              >
                <Send className="w-5 h-5 mr-2" />
                配達完了通知を送信
              </Button>

              {!isComplete && <p className="text-violet-600 font-medium">読み取り完了まで少々お待ちください</p>}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
          >
            戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
