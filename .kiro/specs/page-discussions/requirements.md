# Requirements Document

## Introduction

Fitur diskusi per halaman untuk InfoBatak.id yang memungkinkan pengguna yang sudah login untuk berdiskusi dan berkomentar di setiap halaman konten. Fitur ini mirip dengan komentar di media sosial seperti Instagram, dengan kemampuan reply dan like. Diskusi ditampilkan di bagian bawah halaman, sebelum footer.

## Glossary

- **Discussion_System**: Sistem keseluruhan yang mengelola komentar dan diskusi di setiap halaman
- **Comment**: Komentar utama yang diposting oleh pengguna pada suatu halaman
- **Reply**: Balasan terhadap komentar yang sudah ada
- **Like**: Tanda suka pada komentar atau reply
- **Page_Identifier**: Identifikasi unik halaman berdasarkan path URL (contoh: `/sejarah/toba`, `/marga/siregar`)
- **User**: Pengguna yang sudah terautentikasi melalui Supabase Auth
- **Guest**: Pengunjung yang belum login

## Requirements

### Requirement 1: Menampilkan Komentar

**User Story:** As a visitor, I want to view comments on any page, so that I can read discussions about the content.

#### Acceptance Criteria

1. WHEN a visitor opens any content page, THE Discussion_System SHALL display all comments for that page sorted by newest first
2. WHEN comments exist for a page, THE Discussion_System SHALL show the commenter's avatar, display name, comment text, timestamp, and like count
3. WHEN a comment has replies, THE Discussion_System SHALL display replies nested under the parent comment
4. WHEN no comments exist for a page, THE Discussion_System SHALL display a message encouraging users to start the discussion
5. IF more than 10 comments exist, THEN THE Discussion_System SHALL implement pagination or infinite scroll

### Requirement 2: Posting Komentar

**User Story:** As a logged-in user, I want to post comments on pages, so that I can share my thoughts and engage with the community.

#### Acceptance Criteria

1. WHEN a logged-in user submits a comment, THE Discussion_System SHALL save the comment and display it immediately
2. WHEN a guest attempts to comment, THE Discussion_System SHALL prompt them to login first
3. WHEN a user submits an empty comment, THE Discussion_System SHALL prevent submission and show validation error
4. WHEN a comment is successfully posted, THE Discussion_System SHALL clear the input field
5. THE Discussion_System SHALL limit comment length to 1000 characters

### Requirement 3: Reply Komentar

**User Story:** As a logged-in user, I want to reply to existing comments, so that I can engage in threaded conversations.

#### Acceptance Criteria

1. WHEN a logged-in user clicks reply on a comment, THE Discussion_System SHALL show a reply input field
2. WHEN a reply is submitted, THE Discussion_System SHALL save it linked to the parent comment
3. WHEN a reply is posted, THE Discussion_System SHALL display it nested under the parent comment
4. THE Discussion_System SHALL support only one level of nesting (replies to comments, not replies to replies)
5. WHEN a guest clicks reply, THE Discussion_System SHALL prompt them to login first

### Requirement 4: Like Komentar

**User Story:** As a logged-in user, I want to like comments, so that I can show appreciation for helpful contributions.

#### Acceptance Criteria

1. WHEN a logged-in user clicks like on a comment, THE Discussion_System SHALL increment the like count and mark it as liked by that user
2. WHEN a user clicks like on an already-liked comment, THE Discussion_System SHALL decrement the like count and remove the like (toggle behavior)
3. WHEN displaying a comment, THE Discussion_System SHALL show if the current user has liked it
4. WHEN a guest clicks like, THE Discussion_System SHALL prompt them to login first
5. THE Discussion_System SHALL prevent users from liking their own comments

### Requirement 5: Menghapus Komentar

**User Story:** As a comment author, I want to delete my own comments, so that I can remove content I no longer want visible.

#### Acceptance Criteria

1. WHEN a user views their own comment, THE Discussion_System SHALL display a delete option
2. WHEN a user confirms deletion, THE Discussion_System SHALL remove the comment from the database
3. IF a deleted comment has replies, THEN THE Discussion_System SHALL also delete all associated replies
4. THE Discussion_System SHALL NOT show delete option for comments authored by other users

### Requirement 6: Real-time Updates

**User Story:** As a user, I want to see new comments appear without refreshing, so that I can have a dynamic discussion experience.

#### Acceptance Criteria

1. WHEN another user posts a comment on the same page, THE Discussion_System SHALL display the new comment without page refresh
2. WHEN a comment's like count changes, THE Discussion_System SHALL update the count in real-time
3. WHEN a comment is deleted, THE Discussion_System SHALL remove it from view in real-time

### Requirement 7: UI/UX Discussion Section

**User Story:** As a visitor, I want a clean and intuitive discussion interface, so that I can easily read and participate in discussions.

#### Acceptance Criteria

1. THE Discussion_System SHALL display the discussion section at the bottom of content pages, before the footer
2. THE Discussion_System SHALL show total comment count in the section header
3. THE Discussion_System SHALL use consistent styling with the site's theme (light/dark mode support)
4. WHEN loading comments, THE Discussion_System SHALL show a loading indicator
5. IF an error occurs, THEN THE Discussion_System SHALL display a user-friendly error message in Indonesian

### Requirement 8: Data Persistence

**User Story:** As a system administrator, I want comments stored securely in Supabase, so that data is reliable and protected.

#### Acceptance Criteria

1. THE Discussion_System SHALL store comments in Supabase PostgreSQL database
2. THE Discussion_System SHALL enforce Row Level Security (RLS) policies for data access
3. WHEN storing a comment, THE Discussion_System SHALL record user_id, page_path, content, created_at, and parent_id (for replies)
4. THE Discussion_System SHALL use Supabase Realtime for live updates
