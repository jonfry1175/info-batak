import json
import uuid
import random
from datetime import datetime, timedelta

# User IDs provided by the user
USER_IDS = [
    'dcfa256c-5c36-40d2-a898-3407ee8d1e2a',
    '56910b84-b2f9-426f-86cf-b595fa7dc907'
]

# Paths
STATIC_PATHS = [
    '/',
    '/sejarah',
    '/budaya',
    '/budaya/adat-istiadat',
    '/budaya/aksara-batak',
    '/budaya/arsitektur',
    '/budaya/bahasa',
    '/budaya/kesenian',
    '/budaya/kuliner',
    '/budaya/pakaian-adat',
    '/marga',
    '/tentang'
]

RUMPUN_SLUGS = ['toba', 'karo', 'simalungun', 'pakpak', 'angkola', 'mandailing']
RUMPUN_PATHS = [f'/sejarah/{slug}' for slug in RUMPUN_SLUGS]

# Sample comments content
COMMENTS_TEXT = [
    "Informasi yang sangat bermanfaat!",
    "Terima kasih sudah berbagi, sangat menambah wawasan.",
    "Bangga jadi orang Batak!",
    "Izin bertanya, apakah ada sumber referensi lain untuk topik ini?",
    "Wah, baru tahu fakta ini. Menarik sekali.",
    "Semoga budaya kita tetap lestari.",
    "Horas! Mantap penjelasannya.",
    "Perlu ditambahkan lagi detail tentang sejarahnya.",
    "Sangat inspiratif.",
    "Keren banget visualisasinya.",
    "Mohon diperbanyak artikel seperti ini.",
    "Luar biasa kekayaan budaya kita.",
    "Sehat selalu untuk admin yang mengelola web ini.",
    "Artikel yang bagus, sangat edukatif.",
    "Saya akan bagikan ke keluarga saya.",
    "Tulisannya rapi dan mudah dipahami.",
    "Foto-fotonya bagus sekali.",
    "Menunggu update selanjutnya!",
    "Apakah bisa request topik tertentu?",
    "Sangat membantu tugas kuliah saya."
]

def load_json_slugs(file_path, slug_key='slug', prefix=''):
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            return [f"{prefix}/{item[slug_key]}" for item in data]
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []

def generate_timestamp():
    # Generate a random timestamp within the last 30 days
    now = datetime.now()
    delta = timedelta(days=random.randint(0, 30), hours=random.randint(0, 23), minutes=random.randint(0, 59))
    return (now - delta).isoformat()

def generate_sql():
    # Load dynamic paths
    marga_paths = load_json_slugs('content/data/marga.json', 'slug', '/marga')
    berita_paths = load_json_slugs('content/data/berita.json', 'slug', '/berita')
    
    all_paths = STATIC_PATHS + RUMPUN_PATHS + marga_paths + berita_paths
    
    comments_sql = []
    likes_sql = []
    
    for path in all_paths:
        # Generate 3-8 comments per path
        num_comments = random.randint(3, 8)
        
        path_comments = [] # Store comments for this path to handle replies
        
        for _ in range(num_comments):
            comment_id = str(uuid.uuid4())
            user_id = random.choice(USER_IDS)
            content = random.choice(COMMENTS_TEXT)
            timestamp = generate_timestamp()
            
            # 30% chance of being a reply, if there are existing comments on this path
            parent_id = "null"
            if path_comments and random.random() < 0.3:
                parent_id = f"'{random.choice(path_comments)}'"
            
            path_comments.append(comment_id)
            
            # Escape single quotes in content if any (though my samples don't have them)
            content_escaped = content.replace("'", "''")
            
            comments_sql.append(
                f"INSERT INTO \"public\".\"comments\" (\"id\", \"user_id\", \"page_path\", \"content\", \"parent_id\", \"created_at\", \"updated_at\", \"image_url\") "
                f"VALUES ('{comment_id}', '{user_id}', '{path}', '{content_escaped}', {parent_id}, '{timestamp}', '{timestamp}', null);"
            )
            
            # Generate 0-5 likes for this comment
            num_likes = random.randint(0, 5)
            # We only have 2 users, so we can't have more than 2 likes if we enforce unique likes per user per comment
            # Let's limit to max 2 likes since we have 2 users
            num_likes = min(num_likes, 2)
            
            liking_users = random.sample(USER_IDS, num_likes)
            
            for liker_id in liking_users:
                like_id = str(uuid.uuid4())
                like_timestamp = generate_timestamp() # Should be after comment, but simpler to just random
                likes_sql.append(
                    f"INSERT INTO \"public\".\"comment_likes\" (\"id\", \"user_id\", \"comment_id\", \"created_at\") "
                    f"VALUES ('{like_id}', '{liker_id}', '{comment_id}', '{like_timestamp}');"
                )

    # Combine all SQL
    full_sql = "-- Comments Data\n" + "\n".join(comments_sql) + "\n\n-- Comment Likes Data\n" + "\n".join(likes_sql)
    
    with open('supabase/seed_comments.sql', 'w') as f:
        f.write(full_sql)
        
    print(f"Generated SQL for {len(all_paths)} paths.")
    print(f"Total comments: {len(comments_sql)}")
    print(f"Total likes: {len(likes_sql)}")

if __name__ == "__main__":
    generate_sql()
