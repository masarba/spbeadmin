export const checkAdminRole = async (to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  if (!token || !user) {
    // Clear all auth-related data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('2fa_verified')
    localStorage.removeItem('temp_google2fa_secret')
    localStorage.removeItem('temp_email')
    localStorage.removeItem('user_email')
    next('/')
    return
  }

  try {
    // Cek role dari data user yang sudah disimpan
    if (!user || user.role !== 'admin') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('2fa_verified')
      next('/')
      return
    }

    // Skip 2FA check only for setup-2fa and verify-2fa pages
    if (to.meta.setup2FA || to.meta.verify2FA) {
      // Allow access to these pages only
      return next()
    }

    // Strict check if 2FA is verified for ALL other admin routes
    const twoFAVerified = localStorage.getItem('2fa_verified') === 'true'
    if (!twoFAVerified) {
      console.log('Admin 2FA not verified, checking current page')
      
      // If user is already on verify-2fa page, keep them there
      if (from.path === '/admin/verify-2fa') {
        console.log('Already on verify-2fa page, preventing navigation to:', to.path)
        return next(false) // Prevent navigation entirely
      }
      
      // Check if we have temporary 2FA data (in the middle of setup process)
      const hasTempData = localStorage.getItem('temp_google2fa_secret') && 
                          localStorage.getItem('temp_email')
      
      // If we have temp data, go to verify page, otherwise to setup page
      if (hasTempData) {
        console.log('Has temp 2FA data, redirecting to verification page')
        return next('/admin/verify-2fa')
      } else {
        console.log('No temp 2FA data, redirecting to setup page')
        return next('/admin/setup-2fa') 
      }
    }

    // All checks passed, allow navigation
    next()
  } catch (error) {
    console.error('Auth check error:', error)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('2fa_verified')
    next('/')
  }
} 