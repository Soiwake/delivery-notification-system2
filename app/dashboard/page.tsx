"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Filter, Plus, CheckCircle, Clock, Mail, AlertCircle, User, TrendingUp, FileText } from "lucide-react"

interface NotificationRecord {
  id: string
  recipient: string
  sendDate: string
  readStatus: "read" | "unread"
  replyStatus: "replied" | "no-reply"
  readDate?: string
  replyDate?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample data
  const notifications: NotificationRecord[] = [
    {
      id: "001",
      recipient: "田中 太郎",
      sendDate: "2024-01-15 14:30",
      readStatus: "read",
      replyStatus: "replied",
      readDate: "2024-01-15 15:45",
      replyDate: "2024-01-15 16:20",
    },
    {
      id: "002",
      recipient: "佐藤 花子",
      sendDate: "2024-01-15 13:15",
      readStatus: "read",
      replyStatus: "no-reply",
      readDate: "2024-01-15 14:00",
    },
    {
      id: "003",
      recipient: "山田 次郎",
      sendDate: "2024-01-15 12:00",
      readStatus: "unread",
      replyStatus: "no-reply",
    },
    {
      id: "004",
      recipient: "鈴木 美咲",
      sendDate: "2024-01-14 16:45",
      readStatus: "read",
      replyStatus: "replied",
      readDate: "2024-01-14 17:30",
      replyDate: "2024-01-14 18:15",
    },
  ]

  const getStatusBadge = (readStatus: string, replyStatus: string) => {
    if (readStatus === "unread") {
      return (
        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm">
          <Clock className="w-3 h-3 mr-1" />
          未読
        </Badge>
      )
    }
    if (replyStatus === "replied") {
      return (
        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
          <CheckCircle className="w-3 h-3 mr-1" />
          返信済み
        </Badge>
      )
    }
    return (
      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
        <Mail className="w-3 h-3 mr-1" />
        既読
      </Badge>
    )
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      statusFilter === "all" ||
      (statusFilter === "unread" && notification.readStatus === "unread") ||
      (statusFilter === "read" && notification.readStatus === "read") ||
      (statusFilter === "replied" && notification.replyStatus === "replied")

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: notifications.length,
    read: notifications.filter((n) => n.readStatus === "read").length,
    unread: notifications.filter((n) => n.readStatus === "unread").length,
    replied: notifications.filter((n) => n.replyStatus === "replied").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600/20 via-purple-600/20 to-slate-600/20" />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">配達通知ダッシュボード</h1>
            <p className="text-slate-200 text-lg">送信した通知の状況を確認できます</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button
              onClick={() => router.push("/template")}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              テンプレート設定
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              新しい伝票を処理
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-lg mr-3">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">総送信数</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-lg mr-3">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-emerald-100 text-sm">既読</p>
                  <p className="text-3xl font-bold">{stats.read}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-lg mr-3">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-orange-100 text-sm">未読</p>
                  <p className="text-3xl font-bold">{stats.unread}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-3 bg-white/20 rounded-lg mr-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-purple-100 text-sm">返信済み</p>
                  <p className="text-3xl font-bold">{stats.replied}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mr-3">
                <Filter className="w-5 h-5 text-white" />
              </div>
              検索・フィルター
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="受取人名で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                  <SelectValue placeholder="ステータスで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="unread">未読</SelectItem>
                  <SelectItem value="read">既読</SelectItem>
                  <SelectItem value="replied">返信済み</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Table */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-gray-800">通知一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200">
                    <TableHead className="font-semibold text-gray-700">ID</TableHead>
                    <TableHead className="font-semibold text-gray-700">受取人</TableHead>
                    <TableHead className="font-semibold text-gray-700">送信日時</TableHead>
                    <TableHead className="font-semibold text-gray-700">ステータス</TableHead>
                    <TableHead className="font-semibold text-gray-700">既読日時</TableHead>
                    <TableHead className="font-semibold text-gray-700">返信日時</TableHead>
                    <TableHead className="font-semibold text-gray-700">メール</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification) => (
                    <TableRow key={notification.id} className="hover:bg-gray-50 border-gray-100">
                      <TableCell className="font-mono text-gray-600">{notification.id}</TableCell>
                      <TableCell className="font-medium text-gray-900">{notification.recipient}</TableCell>
                      <TableCell className="text-gray-600">{notification.sendDate}</TableCell>
                      <TableCell>{getStatusBadge(notification.readStatus, notification.replyStatus)}</TableCell>
                      <TableCell className="text-gray-600">{notification.readDate || "-"}</TableCell>
                      <TableCell className="text-gray-600">{notification.replyDate || "-"}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-indigo-200"
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-lg bg-white">
                            <DialogHeader>
                              <DialogTitle className="text-gray-800">返信・質問への回答</DialogTitle>
                            </DialogHeader>
                            <EmailForm recipient={notification.recipient} />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">該当する通知が見つかりません</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EmailForm({ recipient }: { recipient: string }) {
  const [subject, setSubject] = useState(`Re: 配達完了のお知らせについて - ${recipient}様`)
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) return

    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSending(false)
    setIsSent(true)

    setTimeout(() => {
      setIsSent(false)
      setSubject(`Re: 配達完了のお知らせについて - ${recipient}様`)
      setMessage("")
    }, 2000)
  }

  if (isSent) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">返信完了！</h3>
        <p className="text-gray-600">回答メールが正常に送信されました</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
        <div className="flex items-center mb-2">
          <User className="w-4 h-4 mr-2 text-blue-600" />
          <span className="font-medium text-blue-800">返信先:</span>
          <span className="ml-2 text-blue-900 font-semibold">{recipient}</span>
        </div>
        <p className="text-sm text-blue-700">配達完了通知への返信・質問に対する回答メールを送信します</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">件名</label>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="件名を入力してください"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">回答メッセージ</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`${recipient}様からの質問に対する回答を入力してください...

例：
お問い合わせいただきありがとうございます。
ご質問の件についてお答えいたします。

[ここに具体的な回答を記載]

その他ご不明な点がございましたら、お気軽にお問い合わせください。`}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
        />
      </div>

      <Button
        onClick={handleSend}
        disabled={!subject.trim() || !message.trim() || isSending}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
      >
        {isSending ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            送信中...
          </>
        ) : (
          <>
            <Mail className="w-4 h-4 mr-2" />
            回答メール送信
          </>
        )}
      </Button>
    </div>
  )
}
