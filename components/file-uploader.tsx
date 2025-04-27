"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Upload, X, FileText, AlertCircle, Film, ArrowRight, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploaderProps {
  onUploadComplete: (url: string) => void
  className?: string
}

export function FileUploader({ onUploadComplete, className }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [videoDuration, setVideoDuration] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    // Clean up object URLs when component unmounts or when file changes
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview)
      }
    }
  }, [videoPreview])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      handleFileSelection(droppedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      handleFileSelection(selectedFile)
    }
  }

  const checkVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src)
        resolve(video.duration)
      }

      video.onerror = () => {
        reject("Error loading video metadata")
      }

      video.src = URL.createObjectURL(file)
    })
  }

  const handleFileSelection = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("video/")) {
      setError("Please upload a video file")
      return
    }

    try {
      // Check video duration
      const duration = await checkVideoDuration(selectedFile)
      setVideoDuration(duration)

      // Check if video is longer than 10 minutes
      if (duration > 600) {
        // 600 seconds = 10 minutes
        setError("Video must be less than 10 minutes long")
        return
      }

      setFile(selectedFile)
      setError(null)

      // Create a preview URL for the video
      const previewUrl = URL.createObjectURL(selectedFile)
      setVideoPreview(previewUrl)
    } catch (err) {
      console.error("Error checking video:", err)
      setError("Could not process video file")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Create a FormData object to send the file
      const formData = new FormData()
      formData.append("file", file)

      // Set up progress simulation since fetch doesn't support progress tracking
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const increment = Math.random() * 10
          const newProgress = prev + increment
          if (newProgress >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return newProgress
        })
      }, 300)

      // Upload the file using our server-side API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      // Clear the progress interval
      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      // Complete the progress bar
      setUploadProgress(100)

      // Short delay to show 100% completion
      await new Promise((resolve) => setTimeout(resolve, 500))

      const data = await response.json()

      setIsUploading(false)
      setSuccess(true)
      onUploadComplete(data.url)
    } catch (err) {
      console.error("Upload error:", err)
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.")
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview)
    }
    setFile(null)
    setVideoPreview(null)
    setVideoDuration(null)
    setError(null)
    setSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const resetForm = () => {
    handleRemoveFile()
    setSuccess(false)
  }

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {!file && !success ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key="dropzone"
          >
            <Card className="border-2 border-dashed bg-muted/5 overflow-hidden">
              <CardContent className="p-0">
                <div
                  className={cn(
                    "rounded-lg p-12 text-center cursor-pointer transition-all",
                    isDragging ? "bg-primary/5" : "hover:bg-muted/10",
                    "flex flex-col items-center justify-center gap-8",
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <motion.div
                    className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Film className="h-12 w-12 text-primary" />
                  </motion.div>
                  <div className="max-w-md">
                    <p className="text-2xl font-medium mb-3">{t("dragDrop")}</p>
                    <p className="text-muted-foreground text-lg mb-2">{t("uploadDescription")}</p>
                    <div className="flex items-center justify-center gap-2 text-amber-500 font-medium">
                      <Clock className="h-4 w-4" />
                      <span>Videos must be less than 10 minutes</span>
                    </div>
                  </div>
                  <Button variant="outline" size="lg" className="mt-2 px-8 py-6 text-lg h-auto">
                    {t("selectFile")}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : success ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key="success"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{t("uploadSuccess")}</h3>
                    <p className="text-muted-foreground">
                      Your video has been uploaded and is being processed. You will receive an email when your
                      translations are ready.
                    </p>
                  </div>
                  <Button onClick={resetForm} className="mt-4">
                    Upload Another Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key="filePreview"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                  {/* Video preview */}
                  {videoPreview && !isUploading && !isProcessing && !success && (
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <video ref={videoRef} src={videoPreview} className="w-full h-full object-contain" controls />
                    </div>
                  )}

                  {/* File info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">{file?.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{file && formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{file?.type.split("/")[1].toUpperCase()}</span>
                          {videoDuration && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDuration(videoDuration)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {!isUploading && !isProcessing && !success && (
                      <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>

                  {/* Upload progress */}
                  {isUploading && (
                    <div className="space-y-4 mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{t("uploading")}</span>
                        <span className="font-mono">{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                      <div className="flex justify-center mt-6">
                        <div className="text-primary flex items-center gap-2">
                          <Upload className="h-5 w-5 animate-bounce" />
                          <span className="text-sm font-medium">{t("uploading")}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Processing indicator */}
                  {isProcessing && (
                    <div className="space-y-4 mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{t("processing")}</span>
                      </div>
                      <div className="h-2 bg-muted overflow-hidden rounded-full">
                        <div className="h-full bg-primary w-full animate-pulse rounded-full"></div>
                      </div>
                      <div className="flex justify-center mt-6">
                        <div className="text-amber-500 flex items-center gap-2">
                          <div className="animate-spin">
                            <Upload className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-medium">{t("processing")}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <div className="mt-2 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        <p className="font-medium">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Upload button */}
                  {!isUploading && !isProcessing && !success && (
                    <Button onClick={handleUpload} className="mt-4 w-full py-6 text-lg h-auto" size="lg">
                      {t("generateTranslation")} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
