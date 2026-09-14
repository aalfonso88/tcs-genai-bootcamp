from langchain_openai import ChatOpenAI
import os
import httpx

client = httpx.Client(verify=False)

llm = ChatOpenAI(
    base_url="https://genailab.tcs.in", # set openai api base to the LiteLLMProxy 
    model = "azure/genailab-maas-gpt-40-mini", 
    api_key="sk-VLHOTdVrLTrt1G-iMAnyNw",
    http_client = client
)

print(llm.invoke("Hello, What is an LLM in few words?"))