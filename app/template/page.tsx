"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Eye, FileText, User, Building2, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TemplatePage() {
  const router = useRouter()
  const [template, setTemplate] = useState({
    subject: "配達完了のお知らせ - {name}様",
    body: `{name}様

いつもお世話になっております。
{department}宛の荷物が正常に配達完了いたしました。

配達日時: {date}
配達場所: {department}

ご確認のほど、よろしくお願いいたします。

何かご不明な点がございましたら、お気軽にお問い合わせください。

配達担当者より`,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  const getPreviewText = () => {
    const sampleData = {
      name: "田中 太郎",
      department: "営業部",
      date: "2024年1月15日 14:30",
    }

    let previewSubject = template.subject
    let previewBody = template.body

    Object.entries(sampleData).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, "g")
      previewSubject = previewSubject.replace(regex, value)
      previewBody = previewBody.replace(regex, value)
    })

    return { subject: previewSubject, body: previewBody }
  }

  const preview = getPreviewText()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-blue-900 to-indigo-800 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 via-blue-600/20 to-indigo-600/20" />
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="mr-4 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">メールテンプレート設定</h1>
            <p className="text-teal-100 text-lg">配達完了通知のテンプレートを編集できます</p>
          </div>
        </div>

        {/* Success Alert */}
        {isSaved && (
          <Alert className="mb-6 bg-emerald-50 border-emerald-200">
            <Save className="h-4 w-4 text-emerald-600" />
            <AlertDescription className="text-emerald-700">テンプレートが正常に保存されました！</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Editor */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <div className="p-2 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                テンプレート編集
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">件名テンプレート</label>
                <Input
                  value={template.subject}
                  onChange={(e) => setTemplate({ ...template, subject: e.target.value })}
                  placeholder="件名を入力してください"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">本文テンプレート</label>
                <textarea
                  value={template.body}
                  onChange={(e) => setTemplate({ ...template, body: e.target.value })}
                  placeholder="メール本文を入力してください"
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      テンプレート保存
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-white/80 hover:bg-white border-teal-300 hover:border-teal-400 text-teal-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? "編集に戻る" : "プレビュー"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Variables Guide & Preview */}
          <div className="space-y-6">
            {/* Variables Guide */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  使用可能な変数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center bg-gray-50 rounded-lg p-3">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">{"{name}"}</code>
                      <p className="text-sm text-gray-600 mt-1">受取人の名前</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gray-50 rounded-lg p-3">
                    <div className="p-1.5 bg-gradient-to-br from-green-500 to-teal-500 rounded-md mr-3">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">{"{department}"}</code>
                      <p className="text-sm text-gray-600 mt-1">部署名</p>
                    </div>
                  </div>

                  <div className="flex items-center bg-gray-50 rounded-lg p-3">
                    <div className="p-1.5 bg-gradient-to-br from-orange-500 to-red-500 rounded-md mr-3">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">{"{date}"}</code>
                      <p className="text-sm text-gray-600 mt-1">配達日時</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            {showPreview && (
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg mr-3">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    プレビュー（サンプルデータ）
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">件名</label>
                      <div className="bg-gray-50 border rounded-md p-3">
                        <p className="font-medium">{preview.subject}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">本文</label>
                      <div className="bg-gray-50 border rounded-md p-3">
                        <pre className="whitespace-pre-wrap text-sm text-gray-700">{preview.body}</pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
