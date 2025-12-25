# Implementation Plan

- [x] 1. Setup Supabase client and types
  - [x] 1.1 Install Supabase dependencies
    - Install `@supabase/supabase-js` package
    - _Requirements: 4.1, 4.2_
  - [x] 1.2 Create Supabase client utility
    - Create `lib/supabase.ts` with client initialization
    - Add environment variable validation with clear error messages
    - _Requirements: 4.1, 4.2, 4.3_
  - [x] 1.3 Write property test for environment validation
    - **Property 6: Environment variable validation**
    - **Validates: Requirements 4.3**
  - [x] 1.4 Add UserProfile type to types/index.ts
    - Add UserProfile and AuthState interfaces
    - _Requirements: 3.1, 3.2_

- [ ] 2. Create Auth Context Provider
  - [ ] 2.1 Create AuthProvider component
    - Create `components/AuthProvider.tsx`
    - Implement auth state management with useState
    - Add onAuthStateChange listener
    - Implement signInWithGoogle method
    - Implement signOut method
    - _Requirements: 2.2, 2.3, 5.1_
  - [ ] 2.2 Write property test for session establishment
    - **Property 3: Session establishment on OAuth success**
    - **Validates: Requirements 2.3**
  - [ ] 2.3 Write property test for session termination
    - **Property 5: Session termination on logout**
    - **Validates: Requirements 5.1**
  - [ ] 2.4 Integrate AuthProvider into app layout
    - Wrap app with AuthProvider in `app/layout.tsx`
    - _Requirements: 2.3_

- [ ] 3. Update Navbar with auth UI
  - [ ] 3.1 Add auth button to desktop navbar
    - Add "Daftar/Masuk" button linking to /login
    - Add user avatar with dropdown when authenticated
    - Add logout option in dropdown
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.3_
  - [ ] 3.2 Add auth button to mobile navbar
    - Add "Daftar/Masuk" menu item
    - Add user profile section when authenticated
    - Add logout option
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.3_
  - [ ] 3.3 Write property test for navbar auth state
    - **Property 1: Navbar reflects authentication state**
    - **Validates: Requirements 1.3, 5.3**

- [ ] 4. Create Login page
  - [ ] 4.1 Create login page component
    - Create `app/login/page.tsx`
    - Add "Masuk dengan Google" button
    - Add link to register page
    - Add error message display
    - Handle OAuth redirect callback
    - _Requirements: 2.1, 2.2, 2.4_
  - [ ] 4.2 Write property test for OAuth error handling
    - **Property 2: OAuth error handling**
    - **Validates: Requirements 2.4**

- [ ] 5. Create Register page
  - [ ] 5.1 Create register page component
    - Create `app/register/page.tsx`
    - Add "Daftar dengan Google" button (same OAuth flow)
    - Add link to login page
    - Add info text about Google OAuth
    - _Requirements: 2.5_

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Create Supabase database schema documentation
  - [ ] 7.1 Create SQL migration file
    - Create `supabase/migrations/001_profiles.sql`
    - Include profiles table creation
    - Include RLS policies
    - Include trigger for auto-creating profile
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ] 7.2 Write property test for user data completeness
    - **Property 4: Complete user data storage**
    - **Validates: Requirements 3.1, 3.2**

- [ ] 8. Create environment setup documentation
  - [ ] 8.1 Create SUPABASE_SETUP.md documentation
    - Document required environment variables
    - Document Supabase dashboard configuration steps
    - Document Google Cloud Console setup steps
    - Include SQL migration instructions
    - _Requirements: 4.1, 4.2, 4.4_

- [ ] 9. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
