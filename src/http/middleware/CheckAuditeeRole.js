export const checkAuditeeRole = async (to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token || !user) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    next('/')
    return
  }

  try {
    // Cek role dari data user yang sudah disimpan
    if (!user || user.role !== 'auditee') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      next('/')
      return
    }

    next()
  } catch (error) {
    console.error('Auth check error:', error)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    next('/')
  }
} 