import json
import random
from datetime import datetime, timedelta

# Function to generate a single post
def generate_post(id):
    titles = [
        "Community Yard Sale", "Lost Pet", "Free Veggies", 
        "Block Party", "Found Item", "Local Event"
    ]
    descriptions = [
        "We're organizing an event at the park.",
        "Has anyone seen this pet?",
        "I have some items to give away.",
        "We're planning a block party!",
        "Found something, contact me if it's yours.",
        "Join us for a local event this weekend."
    ]
    users = [
        "Alice Johnson", "Bob Smith", "Clara Williams", 
        "David Brown", "Ella Davis", "Franklin Harris"
    ]
    avatars = [
        "https://via.placeholder.com/50.png?text=AJ", 
        "https://via.placeholder.com/50.png?text=BS", 
        "https://via.placeholder.com/50.png?text=CW", 
        "https://via.placeholder.com/50.png?text=DB", 
        "https://via.placeholder.com/50.png?text=ED", 
        "https://via.placeholder.com/50.png?text=FH"
    ]
    images = [
        "https://via.placeholder.com/600x400.png?text=Event", 
        "https://via.placeholder.com/600x400.png?text=Found+Item", 
        "https://via.placeholder.com/600x400.png?text=Yard+Sale", 
        "https://via.placeholder.com/600x400.png?text=Lost+Pet"
    ]
    
    return {
        "id": id,
        "user": {
            "name": random.choice(users),
            "avatar": random.choice(avatars)
        },
        "title": random.choice(titles),
        "description": random.choice(descriptions),
        "image": random.choice(images),
        "likes": random.randint(5, 100),
        "comments": [
            {"user": random.choice(users), "comment": "This is a comment."},
            {"user": random.choice(users), "comment": "Another comment."}
        ],
        "datePosted": (datetime.now() - timedelta(days=random.randint(0, 30))).strftime("%Y-%m-%d")
    }

# Generate a list of posts
posts = [generate_post(i) for i in range(1, 801)]

# Save the list of posts to a JSON file
with open("large_posts.json", "w") as f:
    json.dump(posts, f, indent=2)

print("JSON file 'large_posts.json' has been created with 300 posts.")
