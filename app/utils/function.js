export const lerp = (start, end, amount) => {
  return (1 - amount) * start + amount * end
}

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Vérifie si un fichier est de type PDF,  DOC et DOX c'est à dire
 * un document texte
 * @param {FILE} file - le fichier qui doit être vérifier
 * @param {string} type - le type de fichier document | image
 * @returns {Boolean} Boolean
 */
export const validFileType = (file, type) => {
  let documents = [
    'application/pdf',
    'application/doc',
    'application/docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ]

  let images = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/bmp',
  ]

  if (type === 'documents') {
    for (var i = 0; i < documents.length; i++) {
      if (file.type === documents[i]) {
        return true
      }
    }

    return false
  } else if (type === 'images') {
    for (var i = 0; i < images.length; i++) {
      if (file.type === images[i]) {
        return true
      }
    }

    return false
  }
}
