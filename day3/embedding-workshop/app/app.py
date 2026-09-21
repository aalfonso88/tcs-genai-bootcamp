import chromadb
import ollama
import streamlit as st


st.title("IT Support Semantic Search")

query_text = st.text_input(
    "Describe your problem"
)

if st.button("Search") and query_text:

    response = ollama.embeddings(
        model="nomic-embed-text",
        prompt=query_text
    )

    query_embedding = response["embedding"]

    client = chromadb.PersistentClient(
        path="../chroma_db"
    )

    collection = client.get_collection(
        name="it_support_tickets_cosine"
    )

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5
    )

    st.subheader("Results")

    for i in range(5):
        document = results["documents"][0][i]
        distance = results["distances"][0][i]

        similarity = 1 - distance

        st.write(document)
        st.write(f"Similarity: {similarity:.2%}")
        st.divider()