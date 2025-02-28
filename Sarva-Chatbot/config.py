import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Key for Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
