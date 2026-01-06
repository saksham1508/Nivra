-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    kyc_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, REJECTED
    device_binding_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bank Accounts (Aggregated via AA)
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    account_reference_number VARCHAR(50) UNIQUE NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(20), -- SAVINGS, CURRENT
    masked_account_number VARCHAR(20),
    balance DECIMAL(15, 2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'INR',
    last_synced_at TIMESTAMP WITH TIME ZONE
);

-- Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    account_id UUID REFERENCES bank_accounts(id),
    txn_type VARCHAR(10) NOT NULL, -- DEBIT, CREDIT
    amount DECIMAL(15, 2) NOT NULL,
    category VARCHAR(50), -- Food, Rent, Salary, etc.
    merchant_name VARCHAR(100),
    upi_transaction_id VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'SUCCESS', -- SUCCESS, FAILED, PENDING
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Account Aggregator Consents (RBI Compliance)
CREATE TABLE consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    consent_id VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, REVOKED, EXPIRED
    data_range_start TIMESTAMP WITH TIME ZONE,
    data_range_end TIMESTAMP WITH TIME ZONE,
    revocation_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Insights & Financial Health
CREATE TABLE financial_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    health_score INTEGER CHECK (health_score BETWEEN 0 AND 1000),
    top_expense_category VARCHAR(50),
    monthly_savings_potential DECIMAL(15, 2),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Credit Profiles
CREATE TABLE credit_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    alt_score INTEGER,
    risk_tier VARCHAR(20), -- LOW, MEDIUM, HIGH
    dynamic_limit DECIMAL(15, 2),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
