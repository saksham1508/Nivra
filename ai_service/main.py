from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np
from credit_engine import CreditEngine

app = FastAPI(title="Nivra AI Insights Engine")
credit_engine = CreditEngine()

class Transaction(BaseModel):
    id: str
    description: str
    amount: float

class CategorizeRequest(BaseModel):
    transactions: List[Transaction]

class HealthScoreRequest(BaseModel):
    income: float
    expenses: float
    savings: float
    debt: float

@app.get("/")
def read_root():
    return {"status": "AI Service Online"}

@app.post("/categorize")
async def categorize_transactions(request: CategorizeRequest):
    # Mock NLP categorization logic
    # In production, use a pre-trained model like BERT or a rule-based engine
    categories = {
        "zomato": "Food & Dining",
        "swiggy": "Food & Dining",
        "uber": "Travel",
        "ola": "Travel",
        "rent": "Housing",
        "electricity": "Utilities",
        "amazon": "Shopping",
        "flipkart": "Shopping"
    }
    
    results = []
    for txn in request.transactions:
        desc_lower = txn.description.lower()
        category = "General"
        for key, val in categories.items():
            if key in desc_lower:
                category = val
                break
        results.append({"id": txn.id, "category": category})
    
    return {"categorized_transactions": results}

@app.post("/health-score")
async def calculate_health_score(request: HealthScoreRequest):
    # Logic for Financial Health Score (0-1000)
    # 1. Savings Ratio (Income - Expenses) / Income
    # 2. Debt-to-Income Ratio
    # 3. Emergency Fund Readiness (Savings / Expenses)
    
    savings_ratio = (request.income - request.expenses) / request.income if request.income > 0 else 0
    debt_ratio = request.debt / request.income if request.income > 0 else 1
    
    # Simple weighted score
    score = (savings_ratio * 400) + ((1 - debt_ratio) * 300) + (min(request.savings / (request.expenses + 1), 6) / 6 * 300)
    
    final_score = int(max(min(score, 1000), 300))
    
    tier = "POOR"
    if final_score > 800: tier = "EXCELLENT"
    elif final_score > 650: tier = "GOOD"
    elif final_score > 500: tier = "AVERAGE"
    
    return {
        "health_score": final_score,
        "tier": tier,
        "insights": [
            "Your savings ratio is healthy." if savings_ratio > 0.2 else "Consider reducing discretionary spending.",
            "Debt levels are manageable." if debt_ratio < 0.3 else "Focus on high-interest debt repayment."
        ]
    }

@app.post("/credit-score")
async def get_credit_score(request: dict):
    # Expecting txn_history, utility_bills, user_profile in request
    try:
        score = credit_engine.calculate_alt_score(
            request['txn_history'], 
            request['utility_bills'], 
            request['user_profile']
        )
        tier = credit_engine.get_risk_tier(score)
        
        return {
            "alt_credit_score": score,
            "risk_tier": tier,
            "max_eligible_limit": score * 100 if tier != "HIGH_RISK" else 0
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
