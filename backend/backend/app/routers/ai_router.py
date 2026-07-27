from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AIQueryRequest(BaseModel):
    prompt: str

class AIQueryResponse(BaseModel):
    response: str

@router.post("/query", response_model=AIQueryResponse, summary="Query VentureLink AI assistant")
async def query_ai(data: AIQueryRequest):
    return AIQueryResponse(
        response=f"Mock AI response to: '{data.prompt}'. Your VentureLink AI integration is working successfully!"
    )