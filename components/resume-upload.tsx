"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export function ResumeUpload() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileDrop = async (file: File) => {
    try {
      console.log('Starting analysis for file:', file.name)
      setIsAnalyzing(true)
      const formData = new FormData()
      formData.append('file', file)

      console.log('Sending file to server for analysis...')
      const response = await fetch('/api/resume-analysis', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Analysis failed')

      console.log('Received analysis results from server')
      const data = await response.json()
      setAnalysis(data.analysis)
      console.log('Analysis complete:', data.analysis)
    } catch (error) {
      console.error('Error during analysis:', error)
      toast({
        title: 'Error',
        description: 'Failed to analyze resume',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log('File selected:', file?.name)
    if (file) handleFileDrop(file) // Automatically start processing
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="text-center">
          <p>Select your resume file to upload</p>
          <p className="text-sm text-muted-foreground">Supported formats: PDF, DOC, DOCX</p>
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx"
            className="mt-4"
            id="resume-upload-input"
          />
          <Button 
            onClick={() => document.getElementById('resume-upload-input')?.click()}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Upload Resume
          </Button>
        </div>
      </Card>

      {isAnalyzing && (
        <div className="text-center">
          <p>Analyzing your resume...</p>
        </div>
      )}

      {analysis && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
          <div className="prose max-w-none">
            {analysis.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}