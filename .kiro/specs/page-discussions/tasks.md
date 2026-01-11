# Implementation Plan: Page Discussions

## Overview

Implementasi fitur diskusi per halaman untuk InfoBatak.id menggunakan TypeScript, React, dan Supabase. Implementasi mengikuti pendekatan incremental dengan testing di setiap tahap.

## Tasks

- [x] 1. Setup Database Schema
  - [x] 1.1 Create Supabase migration for comments table
    - Create `comments` table with id, user_id, page_path, content, parent_id, created_at, updated_at
    - Add check constraint for content length (max 1000 chars)
    - Add indexes for page_path, parent_id, and created_at
    - _Requirements: 8.1, 8.3_
  - [x] 1.2 Create Supabase migration for comment_likes table
    - Create `comment_likes` table with id, user_id, comment_id, created_at
    - Add unique constraint on (user_id, comment_id)
    - Add index on comment_id
    - _Requirements: 8.1_
  - [x] 1.3 Create RLS policies for comments table
    - SELECT: Anyone can read
    - INSERT: Authenticated users only, user_id must match auth.uid()
    - DELETE: Only comment owner
    - _Requirements: 8.2_
  - [x] 1.4 Create RLS policies for comment_likes table
    - SELECT: Anyone can read
    - INSERT: Authenticated users, cannot like own comments
    - DELETE: Only like owner
    - _Requirements: 8.2, 4.5_

- [x] 2. Create TypeScript Types and Data Layer
  - [x] 2.1 Add discussion types to types/index.ts
    - Comment, CommentWithUser, CommentWithReplies, CommentLike interfaces
    - DiscussionError type and error messages
    - _Requirements: 1.2, 8.3_
  - [x] 2.2 Create lib/discussion.ts with Supabase queries
    - fetchComments(pagePath, page, limit): Fetch paginated comments with user info and like counts
    - createComment(pagePath, content, parentId?): Create new comment
    - deleteComment(commentId): Delete comment (cascade handled by DB)
    - toggleLike(commentId): Add or remove like
    - _Requirements: 1.1, 2.1, 4.1, 4.2, 5.2_
  - [x] 2.3 Write property tests for data layer
    - **Property 5: Comment Creation** - Valid comments are persisted correctly
    - **Property 15: Comment Data Completeness** - Stored comments have all required fields
    - **Validates: Requirements 2.1, 8.3**

- [x] 3. Checkpoint - Database and Data Layer
  - Ensure migrations run successfully
  - Verify RLS policies work correctly
  - Ask the user if questions arise

- [x] 4. Create useDiscussion Hook
  - [x] 4.1 Implement useDiscussion hook in hooks/useDiscussion.ts
    - State: comments, loading, error, totalCount, hasMore, replyingTo
    - Actions: addComment, deleteComment, toggleLike, loadMore, setReplyingTo
    - Initial fetch on mount with page_path
    - _Requirements: 1.1, 2.1, 4.1, 5.2_
  - [x] 4.2 Add Supabase Realtime subscription
    - Subscribe to comments table changes for current page_path
    - Handle INSERT, DELETE events
    - Subscribe to comment_likes changes
    - _Requirements: 6.1, 6.2, 6.3_
  - [x] 4.3 Write property tests for useDiscussion
    - **Property 1: Comment Sorting** - Comments returned newest first
    - **Property 4: Pagination** - Max 10 comments per page
    - **Property 14: Comment Count Display** - Count matches actual comments
    - **Validates: Requirements 1.1, 1.5, 7.2**

- [x] 5. Create Comment Components
  - [x] 5.1 Create CommentForm component in components/discussion/CommentForm.tsx
    - Text input with character counter (max 1000)
    - Submit button (disabled when empty or over limit)
    - Cancel button for reply mode
    - Login prompt for guests
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 3.1_
  - [ ] 5.2 Write property tests for CommentForm validation
    - **Property 6: Empty Comment Validation** - Whitespace-only rejected
    - **Property 7: Comment Length Validation** - Over 1000 chars rejected
    - **Validates: Requirements 2.3, 2.5**
  - [x] 5.3 Create CommentItem component in components/discussion/CommentItem.tsx
    - Display avatar, name, content, timestamp, like count
    - Like button with toggle state
    - Reply button (shows form when clicked)
    - Delete button (only for owner)
    - Nested replies display
    - _Requirements: 1.2, 1.3, 4.3, 5.1_
  - [ ]* 5.4 Write property tests for CommentItem
    - **Property 2: Comment Display Fields** - All required fields shown
    - **Property 3: Reply Association** - Replies nested under parent
    - **Property 10: Like Status Display** - is_liked correctly shown
    - **Property 12: Delete Ownership** - Delete only shown for owner
    - **Validates: Requirements 1.2, 1.3, 4.3, 5.1, 5.4**

- [x] 6. Checkpoint - Components
  - Ensure all components render correctly
  - Verify form validation works
  - Ask the user if questions arise

- [x] 7. Create DiscussionSection Container
  - [x] 7.1 Create DiscussionSection component in components/discussion/DiscussionSection.tsx
    - Section header with comment count
    - CommentForm for new comments
    - CommentList with all comments
    - Loading and error states
    - Empty state message
    - Dark/light mode support
    - _Requirements: 1.4, 7.1, 7.2, 7.3, 7.4, 7.5_
  - [x] 7.2 Create CommentList component in components/discussion/CommentList.tsx
    - Render list of CommentItem components
    - Handle reply state (which comment is being replied to)
    - Load more button for pagination
    - _Requirements: 1.5, 3.1_

- [x] 8. Integrate with Pages
  - [x] 8.1 Add DiscussionSection to sejarah/[slug] page
    - Import and place before footer
    - Pass page path as prop
    - _Requirements: 7.1_
  - [x] 8.2 Add DiscussionSection to marga/[slug] page
    - Import and place before footer
    - Pass page path as prop
    - _Requirements: 7.1_
  - [x] 8.3 Add DiscussionSection to budaya pages
    - Add to adat-istiadat, kesenian, aksara-batak, arsitektur, kuliner, pakaian-adat, bahasa
    - _Requirements: 7.1_
  - [x] 8.4 Add DiscussionSection to berita/[slug] page
    - Import and place before footer
    - Pass page path as prop
    - _Requirements: 7.1_

- [x] 9. Checkpoint - Integration
  - Ensure discussion section appears on all content pages
  - Verify real-time updates work across pages
  - Ask the user if questions arise

- [x] 10. Additional Property Tests
  - [x]* 10.1 Write property test for single nesting level
    - **Property 8: Single Nesting Level** - Cannot reply to replies
    - **Validates: Requirements 3.4**
  - [x]* 10.2 Write property test for like toggle round-trip
    - **Property 9: Like Toggle Round-Trip** - Like then unlike returns to original
    - **Validates: Requirements 4.1, 4.2**
  - [x]* 10.3 Write property test for self-like prevention
    - **Property 11: Self-Like Prevention** - Cannot like own comment
    - **Validates: Requirements 4.5**
  - [x]* 10.4 Write property test for cascade delete
    - **Property 13: Cascade Delete** - Deleting parent deletes replies
    - **Validates: Requirements 5.3**

- [x] 11. Final Checkpoint
  - Ensure all tests pass
  - Verify all requirements are met
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- Supabase Realtime requires proper subscription cleanup on unmount
