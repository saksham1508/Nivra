# Nivra - AI-Powered Financial OS

Nivra is a production-ready, RBI-compliant Indian FinTech application designed as an AI-driven Money Manager and Credit Engine.

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
|                                    API Gateway (Kong)                                  |
+---------+--------------------+--------------------+--------------------+--------------+
          |                    |                    |                    |
          v                    v                    v                    v
+---------+---------+  +-------+---------+  +-------+---------+  +-------+---------+
|  Auth & Identity  |  |  Payment Service|  |  AA Data Sync   |  |   AI Insights   |
| (Phone/Biometric) |  | (UPI/NPCI Mock) |  | (FIP/FIU Flows) |  | (Scoring/Nudge) |
+---------+---------+  +-------+---------+  +-------+---------+  +-------+---------+
```

## 🛠️ Tech Stack
- **Frontend**: Flutter (Mobile-first)
- **Backend**: Node.js (TypeScript) & FastAPI (Python)
- **Database**: PostgreSQL (Core), Redis (Cache), ClickHouse (Analytics)
- **Infra**: AWS (ap-south-1), EKS, Kafka
- **AI**: Python (XGBoost, Scikit-learn)

## ⚖️ RBI/NPCI Compliance Mapping
- **Data Localization**: All PII stored in AWS Mumbai (`ap-south-1`).
- **Account Aggregator**: Full consent lifecycle (Create/Fetch/Revoke) as per ReBIT specs.
- **Security**: AES-256 encryption for sensitive data at rest; mTLS for inter-service communication.
- **Audit Trails**: Tamper-proof consent logs for every data access.

## 💰 Monetization Hooks
- **Nivra Pro**: Subscription-based advanced tax and wealth insights.
- **Credit Marketplace**: NBFC lead generation via alternative scoring.
- **Merchant Insights**: Anonymized spending analytics for B2B partners.

## 🚀 Deployment & Scalability
- **CI/CD**: GitHub Actions for automated testing and EKS deployment.
- **Scalability**: Horizontal pod autoscaling and DB sharding via Citus.
- **Observability**: Prometheus & ELK stack integration.
