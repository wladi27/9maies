import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // allow larger base64 image uploads
    },
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const { file, folder } = req.body || {}
    if (!file) return res.status(400).json({ error: 'file is required (data URL)' })

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      return res.status(500).json({ error: 'Cloudinary not configured (CLOUDINARY_CLOUD_NAME/CLOUDINARY_UPLOAD_PRESET)' })
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    if (folder) formData.append('folder', folder)

    const resp = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData as any,
    })

    const data = await resp.json()
    if (!resp.ok) return res.status(resp.status).json(data)

    return res.status(200).json(data)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Upload error', err)
    return res.status(500).json({ error: 'Upload failed' })
  }
}
