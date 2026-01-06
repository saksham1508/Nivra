import numpy as np

class CreditEngine:
    def __init__(self):
        # In production, load a trained XGBoost/LightGBM model
        pass

    def calculate_alt_score(self, txn_history, utility_bills, user_profile):
        """
        Calculates an alternative credit score (300-900).
        Features:
        - Transaction Consistency (Variance in monthly balance)
        - Utility Bill Payment Punctuality
        - Income to Expense Ratio
        - SMS-derived repayment history (Mocked)
        """
        
        # 1. Consistency Score (0-200)
        balances = [t['balance'] for t in txn_history]
        consistency = 200 * (1 - min(np.std(balances) / (np.mean(balances) + 1), 1))
        
        # 2. Punctuality Score (0-300)
        punctuality = sum([1 for b in utility_bills if b['status'] == 'ON_TIME']) / len(utility_bills) * 300 if utility_bills else 150
        
        # 3. Income/Expense Buffer (0-200)
        income = user_profile['monthly_income']
        expenses = user_profile['monthly_expenses']
        buffer_score = min((income - expenses) / (income + 1) * 200, 200)
        
        # Base Score + components
        base_score = 300
        final_score = base_score + consistency + punctuality + buffer_score
        
        return int(min(max(final_score, 300), 900))

    def get_risk_tier(self, score):
        if score > 750: return "PRIME"
        if score > 650: return "NEAR_PRIME"
        if score > 550: return "SUB_PRIME"
        return "HIGH_RISK"
