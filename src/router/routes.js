
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/account', component: () => import('src/pages/AccountPage.vue') },
      { path: '/wishlist', component: () => import('src/pages/WishlistPage.vue') },
      { path: '/account_setting', component: () => import('src/pages/AccountSetting.vue') },
      { path: '/suggestion', component: () => import('src/pages/SuggestionPage.vue') },
      // { path: '/terms', component: () => import('src/pages/TermsPage.vue') },
      // { path: '/privacy_policy', component: () => import('src/pages/PrivacyPolicy.vue') },
      { path: '/about_us', component: () => import('src/pages/AboutUs.vue') },
      { path: '/category', component: () => import('src/pages/CategoryMobile.vue') },
      { path: '/subcategory', component: () => import('src/pages/ProductSubcategory.vue') },
      { path: '/product_details/:slug', component: () => import('src/pages/ProductDetails.vue') },
      { path: '/search', component: () => import('src/pages/SearchPage.vue') },
      { path: '/notifications', component: () => import('src/pages/NotificationPage.vue') },
      { path: '/chat', component: () => import('src/pages/ChatPage.vue') },
      { path: '/grid', component: () => import('src/pages/GridProduct.vue') },

    ]
  },
  {
    path: '/login',
    component: () => import('src/pages/LoginPage.vue'),
  },
  {
    path: '/signup',
    component: () => import('src/pages/SignupPage.vue'),
  },
  {
    path: '/forgot',
    component: () => import('src/pages/ForgotPassword.vue'),
  },

  // Always leave this as last one,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
