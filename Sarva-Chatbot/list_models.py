import google.generativeai as genai
from config import GEMINI_API_KEY

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

def get_response(query):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # Free-tier model
        response = model.generate_content(query)
        return response.text.strip()
    except Exception as e:
        return f"Error: {str(e)}"
