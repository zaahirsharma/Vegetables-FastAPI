# Acts as web server that will run the FastAPI app
import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from typing import List

# Define data model: Create new Vegetables and add them to a list
# Automatically validates data coming in and format data going out based on Pydantic models
class Vegetable(BaseModel):
    # Represents a vegetable with its properties
    name: str


class Vegetables(BaseModel):
    vegetables: List[Vegetable]


# Create FastAPI application
app = FastAPI(debug=True)

# List of origins that are allowed to access the API
origins = [
    "http://localhost:5173"
]

# Enable CORS middleware (Cross-Origin Resource Sharing) for the specified origins
# Will prevent any unauthrorized access to the API, blocks requests from other origins
# Only allows requests from the specified origins, True (can send JWT tokens), allow all methods and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In memory database, will not persist when app shuts down
# Will add vegetables into this list
memory_db = {"vegetables": []}

# Define root endpoint
# At "vegetables" endpoint, define reponse model returned from enpoint will be Vegetables
# Will convert into JSON format automatically so API can injest and read
@app.get("/vegetables", response_model=Vegetables)
def get_vegetables():
    # Return instance of VegetableList class, wraps memory_db["vegetables"] into python object, returned as JSON
    return Vegetables(vegetables=memory_db["vegetables"])

# Post to the /vegetables endpoint
# Post request used to create new data
@app.post("/vegetables")
# Define the function to accept a Vegetable object as input and add to the Vegetables list
def add_vegetable(vegetable: Vegetable):
    # Add vegetable to in-memory database
    memory_db["vegetables"].append(vegetable)
    # Return 204 No Content status code, no content in response
    return vegetable


if __name__ == "__main__":
    # All IP address run (host=0.0.0.0)
    # Port 8000 default for FastAPI
    uvicorn.run(app, host="0.0.0.0", port=8000)