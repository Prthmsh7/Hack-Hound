import streamlit as st
from components.chatbox import chat_interface
from components.sidebar import sidebar

# Set up page config
st.set_page_config(page_title="Sarva Chatbot", page_icon="🗨️", layout="wide")

# Load Sidebar
sidebar()

# Main Chat Interface
chat_interface()
