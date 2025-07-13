import { createRouter, createWebHistory } from "vue-router";
import { checkAdminRole } from '../http/middleware/CheckAdminRole'
import { checkAuditeeRole } from '../http/middleware/CheckAuditeeRole'
import UserManagement from '../views/UserManagement.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminSetup2FA from '../views/AdminSetup2FA.vue' // Import komponen Setup 2FA
import AdminVerify2FA from '../views/AdminVerify2FA.vue' // Import komponen Verify 2FA
import QRTest from '../views/QRTest.vue' // Import QR test component

const routes = [
  {
    path: "/",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { guest: true }
  },
  {
    path: "/qr-test",
    name: "QRTest",
    component: QRTest,
    meta: { guest: true }
  },
  {
    path: "/admin/setup-2fa",
    name: "AdminSetup2FA",
    component: AdminSetup2FA,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      setup2FA: true
    },
    beforeEnter: checkAdminRole
  },
  {
    path: "/admin/verify-2fa",
    name: "AdminVerify2FA",
    component: AdminVerify2FA,
    meta: {
      verify2FA: true // Tidak memerlukan auth penuh karena token belum diverifikasi
    }
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    beforeEnter: checkAdminRole
  },
  {
    path: "/admin/users",
    name: "UserManagement",
    component: UserManagement,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    beforeEnter: checkAdminRole
  },
  {
    path: "/auditee/dashboard",
    name: "AuditeeDashboard",
    component: () => import('../views/AuditeeDashboard.vue'),
    meta: {
      requiresAuth: true,
      requiresAuditee: true
    },
    beforeEnter: checkAuditeeRole
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const isAuthenticated = !!user
  const token = localStorage.getItem('token')
  
  // Cek data 2FA sementara untuk halaman verify-2fa
  const temp2FAData = localStorage.getItem('temp_google2fa_secret') && localStorage.getItem('temp_email')
  
  // Halaman verify-2fa hanya dapat diakses jika ada data 2FA sementara
  if (to.meta.verify2FA && !temp2FAData) {
    return next('/')
  }
  
  // Halaman setup-2fa membutuhkan autentikasi tetapi tidak memerlukan 2FA sudah diverifikasi
  if (to.meta.setup2FA && !token) {
    return next('/')
  }

  // Halaman yang memerlukan autentikasi
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/')
  }
  
  // Special enforcement for admin routes - always require 2FA verification
  // This handles direct URL navigation attempts
  if (to.path.startsWith('/admin') && 
      !to.meta.setup2FA && 
      !to.meta.verify2FA && 
      !to.meta.guest && 
      user?.role === 'admin' && 
      localStorage.getItem('2fa_verified') !== 'true') {
    console.log('Attempted direct access to admin page without 2FA verification:', to.path)
    return next('/admin/setup-2fa')
  }

  // Cek role admin
  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next('/')
  }

  // Cek role auditee
  if (to.meta.requiresAuditee && user?.role !== 'auditee') {
    return next('/')
  }

  // Redirect user yang sudah login dari halaman login
  if (to.meta.guest && isAuthenticated) {
    if (user.role === 'admin') {
      return next('/admin/dashboard')
    } else if (user.role === 'auditee') {
      return next('/auditee/dashboard')
    }
  }
  
  // If user is admin, check for 2FA verification requirement for ALL routes except specific exceptions
  if (user?.role === 'admin') {
    const twoFAVerified = localStorage.getItem('2fa_verified') === 'true';
    const allowedWithoutVerification = to.meta.setup2FA || to.meta.verify2FA || to.meta.guest;
    
    // If 2FA is not verified and trying to access a protected route
    if (!twoFAVerified && !allowedWithoutVerification) {
      console.log('2FA not verified, intercepting navigation to:', to.path);
      
      // Check if we have temporary 2FA data (in the middle of setup process)
      const hasTempData = localStorage.getItem('temp_google2fa_secret') && 
                         localStorage.getItem('temp_email');
      
      // If we have temp data, go to verify page, otherwise to setup page
      if (hasTempData) {
        console.log('Temp 2FA data exists, redirecting to verification page');
        return next('/admin/verify-2fa');
      } else {
        console.log('No temp 2FA data, redirecting to setup page');
        return next('/admin/setup-2fa');
      }
    }
    
    // Prevent navigation away from 2FA pages before verification is complete
    if (
      (from.path === '/admin/setup-2fa' || from.path === '/admin/verify-2fa') && 
      !twoFAVerified && 
      !allowedWithoutVerification
    ) {
      console.log('Attempted to leave 2FA flow before verification is complete');
      
      // Check which page they're on to keep them there
      if (from.path === '/admin/setup-2fa') {
        console.log('Keeping user on setup page');
        return next('/admin/setup-2fa');
      } else {
        // If trying to navigate from verify page, stay on verify page
        console.log('Keeping user on verification page');
        return next('/admin/verify-2fa');
      }
    }
    
    // If we're trying to access setup or verify pages but already verified
    if (twoFAVerified && (to.path === '/admin/setup-2fa' || to.path === '/admin/verify-2fa')) {
      console.log('2FA already verified, redirecting to dashboard');
      return next('/admin/dashboard');
    }
  }

  next()
});

export default router;