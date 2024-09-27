"use client"

import React, { useState, useRef } from 'react'
import { Upload, X, Play } from 'lucide-react'

interface VideoFile extends File {
  preview: string
}

export default function VideoUploader() {
  const [videos, setVideos] = useState<VideoFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList) => {
    const newVideos = Array.from(files).filter(file => file.type.startsWith('video/')).map(file => 
      Object.assign(file, { preview: URL.createObjectURL(file) })
    ) as VideoFile[]
    setVideos(prev => [...prev, ...newVideos])
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Video</h2>
      <form
        className={`relative border-2 border-dashed rounded-lg p-12 text-center ${
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={handleChange}
          accept="video/*"
          className="hidden"
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">Drag and drop your videos here, or click to select files</p>
        <button
          className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onButtonClick}
        >
          Select Files
        </button>
        {dragActive && (
          <div
            className="absolute inset-0 rounded-lg"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>
      {videos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="relative group">
              <video className="w-full h-48 object-cover rounded-lg">
                <source src={video.preview} type={video.type} />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
                <button
                  className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => window.open(video.preview, '_blank')}
                  aria-label="Play video"
                >
                  <Play className="h-6 w-6" />
                </button>
              </div>
              <button
                className="absolute top-2 right-2 p-1 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => removeVideo(index)}
                aria-label="Remove video"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-2 text-sm text-gray-600 truncate">{video.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}