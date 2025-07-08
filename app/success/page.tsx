"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, BarChart3, Sparkles } from "lucide-react"

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-800 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-green-600/20" />
      <div className="relative max-w-2xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="w-20 h-20 text-white" />
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full animate-ping mx-auto" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="w-20 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full shadow-lg" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              送信完了！
            </h1>

            <p className="text-xl text-gray-700 mb-3 font-medium">配達完了通知が正常に送信されました</p>

            <p className="text-gray-500 mb-8">受取人にメール通知が届きます</p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 shadow-lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                ダッシュボードで確認
              </Button>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="w-full sm:w-auto bg-white/80 hover:bg-white border-emerald-300 hover:border-emerald-400 text-emerald-700 shadow-lg"
                >
                  <Home className="w-5 h-5 mr-2" />
                  新しい伝票を処理
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-emerald-100">
          <p>通知の既読状況はダッシュボードで確認できます</p>
        </div>
      </div>
    </div>
  )
}
