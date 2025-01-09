from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import models

def calculate_similarity(campaigns):
    # Combine title, cause, and description (if available) for similarity calculation
    campaign_data = [f"{campaign.title} {campaign.cause}" for campaign in campaigns]
    
    # Use TF-IDF Vectorizer to convert text data into vectors
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(campaign_data)
    
    # Calculate cosine similarity between campaigns
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    
    return cosine_sim