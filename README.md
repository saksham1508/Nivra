# Nivra - India's AI-Powered Financial Operating System

Nivra is a production-ready, RBI-compliant Indian FinTech application designed as an AI-driven Money Manager and Alternative Credit Engine. It integrates UPI payments, the Account Aggregator (AA) framework, and advanced AI insights into a unified mobile and web experience.

---

## 🏗️ System Architecture

```text
                                  +-------------------+
                                  |   Mobile App      |
                                  | (Flutter/Dart)    |
                                  +---------+---------+
                                            |
                                            | REST / gRPC
                                            v
+---------------------------------------------------------------------------------------+
|                                    API Gateway (Kong)                                 |
+---------+--------------------+--------------------+--------------------+--------------+
          |                    |                    |                    |
          v                    v                    v                    v
+---------+---------+  +-------+---------+  +-------+---------+  +-------+---------+
|  Auth & Identity  |  |  Payment Service|  |  AA Data Sync   |  |   AI Insights   |
| (Phone/Biometric) |  | (UPI/NPCI Mock) |  | (FIP/FIU Flows) |  | (Scoring/Nudge) |
+---------+---------+  +-------+---------+  +-------+---------+  +-------+---------+
```

---

## 🚀 Key Features

- **Unified Dashboard**: Aggregated view of all bank accounts via the Account Aggregator framework.
- **AI Money Manager**: Intelligent categorization of expenses and personalized financial health scoring (0-1000).
- **UPI Payments**: Integrated P2P and P2M payment flows with event-driven transaction logging.
- **Alternative Credit Scoring**: Proprietary scoring model for "thin-file" users using transaction consistency and utility data.
- **Multi-Platform**: High-performance mobile app built with Flutter and a sophisticated web dashboard built with React.
- **Security First**: Zero-trust architecture with AES-256 PII encryption and RBI-mandated data localization.

---

## 🛠️ Tech Stack

- **Mobile**: Flutter (Dart)
- **Web**: React (TypeScript), Tailwind CSS
- **Backend**: Node.js (TypeScript), Express
- **AI Service**: Python, FastAPI, Scikit-learn, Pandas
- **Database**: PostgreSQL (Core), ClickHouse (Analytics), Redis (Cache)
- **Infra**: AWS (ap-south-1), EKS, GitHub Actions (CI/CD)

---

## 📂 Project Structure

```text
├── ai_service/         # Python FastAPI service for ML & Scoring
├── backend/            # Node.js TypeScript core backend
├── mobile_app/         # Flutter mobile application
├── web_app/            # React web dashboard
├── db/                 # PostgreSQL schema and migrations
└── .github/workflows/  # CI/CD pipeline configurations
```

---

## ⚖️ Security & Compliance

| Regulatory Body | Requirement | Implementation in Nivra |
| :--- | :--- | :--- |
| **RBI** | **Data Localization** | All PII and transaction data stored exclusively in AWS Mumbai region. |
| **RBI** | **Consent Framework** | Full AA consent lifecycle (Create/Fetch/Revoke) implemented per ReBIT specs. |
| **NPCI** | **UPI Security** | Encrypted VPA handling and device-binding logic. |
| **RBI** | **Cyber Security** | AES-256 encryption at rest and mTLS for all inter-service communication. |

---

## 🛠️ Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run build
npm start
```

### 2. AI Service Setup
```bash
cd ai_service
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Web App Setup
```bash
cd web_app
npm install
npm run dev
```

### 4. Mobile App Setup
```bash
cd mobile_app
flutter pub get
flutter run
```

---

## 💰 Monetization Hooks

- **Nivra Pro**: Subscription for advanced tax planning and deep wealth analytics.
- **Lending Marketplace**: Lead generation for NBFC partners via the Credit Engine.
- **Investment Commissions**: Referral and integration hooks for Insurance and Mutual Fund partners.
