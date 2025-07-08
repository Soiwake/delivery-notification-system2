"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, FileImage, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("ファイルサイズは10MB以下にしてください")
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleUpload = () => {
    if (selectedImage) {
      router.push("/processing")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">伝票オートリンク</h1>
          <p className="text-indigo-100 text-lg">伝票の写真をアップロードしてください</p>
        </div>

        <Card className="mb-6 bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Image Preview Area */}
            <div className="mb-6">
              {selectedImage ? (
                <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-indigo-300 overflow-hidden shadow-inner">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected receipt"
                    fill
                    className="object-contain"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg border border-gray-200"
                    onClick={() => setSelectedImage(null)}
                  >
                    変更
                  </Button>
                </div>
              ) : (
                <div
                  className={`w-full h-96 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                    isDragging
                      ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-inner"
                      : "border-indigo-300 bg-gradient-to-br from-gray-50 to-indigo-50 hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-400"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                >
                  <div className="p-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 mb-4">
                    <FileImage className="w-16 h-16 text-indigo-600" />
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">ここに伝票画像をドロップ</p>
                  <p className="text-gray-500">または下のボタンから選択してください</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  画像をアップロード
                </Button>
              </div>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/80 hover:bg-white border-indigo-300 hover:border-indigo-400 text-indigo-700 shadow-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  写真を撮る
                </Button>
              </div>
            </div>

            {/* Upload Button */}
            {selectedImage && (
              <div className="mt-6 text-center">
                <Button
                  size="lg"
                  onClick={handleUpload}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 shadow-lg"
                >
                  処理を開始
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-indigo-200">
          <p>対応形式: JPG, PNG, GIF (最大10MB)</p>
        </div>
      </div>
    </div>
  )
}
