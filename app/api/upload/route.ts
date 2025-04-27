import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate a unique ID for the video
    const videoId = `video_${Date.now()}`
    const fileName = `${videoId}_${file.name.replace(/\s+/g, "_")}`

    // In a real implementation, you would upload to Google Cloud Storage here
    // For now, we'll simulate a successful upload
    const videoUrl = `https://storage.googleapis.com/aroundtheworldstudy/${fileName}`

    // Trigger the audio generation endpoint with the correct parameters
    try {
      const audioGenResponse = await fetch(
        "https://conversionpipeline-104807892715.us-central1.run.app/build_audio_files",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: videoId,
            videoUrl: videoUrl,
            cloudStorageBucketURI: "aroundtheworldstudy",
            title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension for title
          }),
        },
      )

      if (!audioGenResponse.ok) {
        console.error("Audio generation failed:", await audioGenResponse.text())
      }
    } catch (audioGenError) {
      console.error("Error triggering audio generation:", audioGenError)
      // Continue with the response even if audio generation fails
    }

    // Return the simulated URL
    return NextResponse.json({
      success: true,
      url: videoUrl,
      id: videoId,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
