
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AccountPage.vue') }
    ]
  },
  {
    path: '/wishlist',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/WishlistPage.vue') }
    ]
  },
  {
    path: '/account_setting',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AccountSetting.vue') }
    ]
  },
  {
    path: '/suggestion',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SuggestionPage.vue') }
    ]
  },
  {
    path: '/terms',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/TermsPage.vue') }
    ]
  }, {
    path: '/privacy_policy',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PrivacyPolicy.vue') }
    ]
  },
  {
    path: '/about_us',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AboutUs.vue') }
    ]
  },
  {
    path: '/category',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/CategoryMobile.vue') }
    ]
  },
  {
    path: '/subcategory',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ProductSubcategory.vue') }
    ]
  },
  {
    path: '/product_details',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ProductDetails.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/LoginPage.vue') }
    ]
  },
  {
    path: '/signup',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SignupPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
