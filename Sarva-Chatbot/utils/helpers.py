import os

def load_css():
    with open("assets/styles.css", "r") as f:
        return f"<style>{f.read()}</style>"
