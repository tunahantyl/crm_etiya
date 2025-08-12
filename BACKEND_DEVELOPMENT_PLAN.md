# CRM Sistemi Backend Geliştirme Planı (2 Kişilik Ekip)

## 📋 Genel Yapılacaklar Listesi

### Geliştirme Sırası (Domain-Driven Design)

1. **Entity Katmanı (domain/entity)**
   - [ ] BaseEntity (id, createdDate, updatedDate)
   - [ ] User Entity
   - [ ] Customer Entity
   - [ ] Task Entity
   - [ ] Entity ilişkilerinin kurulması

2. **Repository Katmanı (domain/repository)**
   - [ ] BaseRepository interface
   - [ ] UserRepository
   - [ ] CustomerRepository
   - [ ] TaskRepository

3. **Application Katmanı (domain/application)**
   - [ ] DTO sınıfları (Request/Response)
   - [ ] Mapper sınıfları (Entity <-> DTO dönüşümleri)
   - [ ] Service interfaces
   - [ ] Service implementasyonları

4. **Web Katmanı (domain/web)**
   - [ ] Controller sınıfları
   - [ ] Exception handler
   - [ ] Validation
   - [ ] Security config

### Temel Yapı ve Katmanlar
- [ ] Repository katmanını oluştur (UserRepository, CustomerRepository, TaskRepository)
- [ ] Service katmanını oluştur (CustomerService, TasksService - UserService zaten var)
- [ ] DTO sınıflarını oluştur (Request/Response modelleri)
- [ ] Controller katmanını oluştur (AuthController, CustomerController, TaskController)
- [ ] SecurityConfig sınıfını düzenle (JWT authentication, CORS ayarları)
- [ ] Database konfigürasyonunu tamamla (application.properties, H2/PostgreSQL)
- [ ] Global exception handling ekle (GlobalExceptionHandler)
- [ ] Input validation ekle (@Valid, custom validators)

### Test ve Kalite
- [ ] Unit testleri yaz (Service ve Repository katmanları için)
- [ ] Integration testleri yaz (Controller katmanı için)
- [ ] API dokümantasyonunu hazırla (Swagger/OpenAPI)
- [ ] Code review sürecini başlat
- [ ] Test coverage hedeflerini belirle (%80+)

### Güvenlik ve Optimizasyon
- [ ] JWT token yapılandırması
- [ ] Role-based authorization
- [ ] Rate limiting implementasyonu
- [ ] Cache stratejisi
- [ ] Database indexleme
- [ ] Query optimizasyonu

## 🎯 Genel Hedefler

1. Güvenli ve ölçeklenebilir bir API geliştirmek
2. Clean Architecture prensiplerine uymak
3. Test coverage'ı yüksek tutmak (%80+)
4. Dokümantasyonu güncel tutmak

## 👥 Ekip Yapısı ve Ortak Çalışma Prensipleri

### Her Sabah (09:00 - 09:30)
- Daily standup toplantısı
- Günlük hedeflerin gözden geçirilmesi
- Blocker'ların paylaşılması

### Her Akşam (17:30 - 18:00)
- Günlük kod commitlerinin review edilmesi
- Yarının planlanması
- Dokümantasyon güncellemesi

## 📅 SPRINT 1: Temel Altyapı (Gün Gün Plan)

### Gün 1 - Proje Kurulumu
**Geliştirici 1:**
- 09:30-11:00: Node.js + TypeScript proje yapısı kurulumu
- 11:00-13:00: ESLint, Prettier, Git hook'ları
- 14:00-16:00: Klasör yapısı ve temel dosyaların oluşturulması
- 16:00-17:30: CI/CD pipeline kurulumu

**Geliştirici 2:**
- 09:30-11:00: PostgreSQL veritabanı kurulumu
- 11:00-13:00: Prisma ORM kurulumu ve konfigürasyonu
- 14:00-16:00: Docker compose dosyalarının hazırlanması
- 16:00-17:30: Development environment dokümantasyonu

### Gün 2 - Veritabanı ve Modeller
**Geliştirici 1:**
- 09:30-11:30: User model tasarımı ve migration
- 11:30-13:00: User repository katmanı
- 14:00-15:30: User service katmanı
- 15:30-17:30: Unit testlerin yazılması

**Geliştirici 2:**
- 09:30-11:30: Customer model tasarımı ve migration
- 11:30-13:00: Task model tasarımı ve migration
- 14:00-15:30: Model ilişkilerinin kurulması
- 15:30-17:30: Seed data hazırlama

### Gün 3 - Authentication
**Geliştirici 1:**
- 09:30-11:00: JWT implementasyonu
- 11:00-13:00: Login/Register endpoint'leri
- 14:00-15:30: Password hashing ve validasyon
- 15:30-17:30: Auth middleware yazımı

**Geliştirici 2:**
- 09:30-11:00: Role-based authorization sistemi
- 11:00-13:00: Permission middleware'i
- 14:00-15:30: Role validasyonları
- 15:30-17:30: Auth testlerinin yazılması

### Gün 4 - Middleware ve Güvenlik
**Geliştirici 1:**
- 09:30-11:00: Error handling middleware
- 11:00-13:00: Validation middleware
- 14:00-15:30: Logger implementasyonu
- 15:30-17:30: Middleware testleri

**Geliştirici 2:**
- 09:30-11:00: Rate limiting implementasyonu
- 11:00-13:00: CORS yapılandırması
- 14:00-15:30: Helmet ve güvenlik ayarları
- 15:30-17:30: Güvenlik testleri

### Gün 5 - Test ve Dokümantasyon
**Geliştirici 1:**
- 09:30-11:30: Integration testlerin yazılması
- 11:30-13:00: Test coverage analizi
- 14:00-15:30: Test dokümantasyonu
- 15:30-17:30: Hata düzeltmeleri

**Geliştirici 2:**
- 09:30-11:30: Swagger/OpenAPI dokümantasyonu
- 11:30-13:00: Postman koleksiyonu hazırlama
- 14:00-15:30: README dosyalarının hazırlanması
- 15:30-17:30: Deployment dokümantasyonu

## 📅 SPRINT 2: Müşteri Yönetimi (Gün Gün Plan)

### Gün 1 - Temel CRUD
**Geliştirici 1:**
- 09:30-11:30: Customer controller yapısı
- 11:30-13:00: Create endpoint'i
- 14:00-15:30: Read endpoint'i
- 15:30-17:30: Unit testler

**Geliştirici 2:**
- 09:30-11:30: Customer service katmanı
- 11:30-13:00: Update endpoint'i
- 14:00-15:30: Delete endpoint'i
- 15:30-17:30: Integration testler

### Gün 2 - Arama ve Filtreleme
**Geliştirici 1:**
- 09:30-11:30: Arama fonksiyonları
- 11:30-13:00: Filtreleme fonksiyonları
- 14:00-15:30: Query builder
- 15:30-17:30: Performans testleri

**Geliştirici 2:**
- 09:30-11:30: Pagination implementasyonu
- 11:30-13:00: Sorting implementasyonu
- 14:00-15:30: Response mapper
- 15:30-17:30: API testleri

### Gün 3 - Validasyon ve Error Handling
**Geliştirici 1:**
- 09:30-11:30: Input validasyonları
- 11:30-13:00: Custom validator'lar
- 14:00-15:30: Error handler'lar
- 15:30-17:30: Validation testleri

**Geliştirici 2:**
- 09:30-11:30: Business rule validasyonları
- 11:30-13:00: Exception handler'lar
- 14:00-15:30: Error response mapper
- 15:30-17:30: Error handling testleri

### Gün 4 - İstatistikler ve Raporlama
**Geliştirici 1:**
- 09:30-11:30: Müşteri istatistikleri
- 11:30-13:00: Raporlama endpoint'leri
- 14:00-15:30: CSV export
- 15:30-17:30: Performans optimizasyonu

**Geliştirici 2:**
- 09:30-11:30: Müşteri analitiği
- 11:30-13:00: PDF rapor oluşturma
- 14:00-15:30: Excel export
- 15:30-17:30: Cache implementasyonu

### Gün 5 - Dokümantasyon ve Test
**Geliştirici 1:**
- 09:30-11:30: API dokümantasyonu
- 11:30-13:00: Swagger güncellemesi
- 14:00-15:30: Test coverage analizi
- 15:30-17:30: Bug fix ve iyileştirmeler

**Geliştirici 2:**
- 09:30-11:30: Postman koleksiyonu
- 11:30-13:00: Kullanım örnekleri
- 14:00-15:30: Performance test raporu
- 15:30-17:30: Code review ve düzeltmeler

## 📅 SPRINT 3: Görev Yönetimi (Gün Gün Plan)

### Gün 1 - Task CRUD
**Geliştirici 1:**
- 09:30-11:30: Task controller yapısı
- 11:30-13:00: Create endpoint'i
- 14:00-15:30: Read endpoint'i
- 15:30-17:30: Unit testler

**Geliştirici 2:**
- 09:30-11:30: Task service katmanı
- 11:30-13:00: Update endpoint'i
- 14:00-15:30: Delete endpoint'i
- 15:30-17:30: Integration testler

### Gün 2 - Task İlişkileri
**Geliştirici 1:**
- 09:30-11:30: Customer-Task ilişkisi
- 11:30-13:00: User-Task ilişkisi
- 14:00-15:30: İlişki validasyonları
- 15:30-17:30: İlişki testleri

**Geliştirici 2:**
- 09:30-11:30: Task atama sistemi
- 11:30-13:00: Task status yönetimi
- 14:00-15:30: Notification sistemi
- 15:30-17:30: E-mail servisi

### Gün 3 - Task Filtreleme ve Arama
**Geliştirici 1:**
- 09:30-11:30: Arama fonksiyonları
- 11:30-13:00: Filtreleme fonksiyonları
- 14:00-15:30: Tarih bazlı filtreler
- 15:30-17:30: Performans testleri

**Geliştirici 2:**
- 09:30-11:30: Status bazlı filtreleme
- 11:30-13:00: Kullanıcı bazlı filtreleme
- 14:00-15:30: Müşteri bazlı filtreleme
- 15:30-17:30: API testleri

### Gün 4 - Task İstatistikleri
**Geliştirici 1:**
- 09:30-11:30: Task metrikleri
- 11:30-13:00: Performans raporları
- 14:00-15:30: Zaman analizi
- 15:30-17:30: Metrik testleri

**Geliştirici 2:**
- 09:30-11:30: Kullanıcı performansı
- 11:30-13:00: Müşteri bazlı analiz
- 14:00-15:30: Trend analizi
- 15:30-17:30: Analiz testleri

### Gün 5 - Dokümantasyon ve Optimizasyon
**Geliştirici 1:**
- 09:30-11:30: API dokümantasyonu
- 11:30-13:00: Performans optimizasyonu
- 14:00-15:30: Cache implementasyonu
- 15:30-17:30: Son testler

**Geliştirici 2:**
- 09:30-11:30: Kullanım kılavuzu
- 11:30-13:00: Örnek senaryolar
- 14:00-15:30: Load testing
- 15:30-17:30: Bug fixing

## 📅 SPRINT 4: Dashboard ve Raporlama (Gün Gün Plan)

### Gün 1 - Dashboard Endpoint'leri
**Geliştirici 1:**
- 09:30-11:30: Genel istatistikler endpoint'i
- 11:30-13:00: Müşteri metrikleri
- 14:00-15:30: Task metrikleri
- 15:30-17:30: Unit testler

**Geliştirici 2:**
- 09:30-11:30: Kullanıcı istatistikleri
- 11:30-13:00: Trend analizi endpoint'i
- 14:00-15:30: Performans metrikleri
- 15:30-17:30: Integration testler

### Gün 2 - Veri Aggregation
**Geliştirici 1:**
- 09:30-11:30: Müşteri aggregation'ları
- 11:30-13:00: Task aggregation'ları
- 14:00-15:30: Zaman bazlı aggregation'lar
- 15:30-17:30: Performans testleri

**Geliştirici 2:**
- 09:30-11:30: Kullanıcı aggregation'ları
- 11:30-13:00: Metrik hesaplamaları
- 14:00-15:30: Cache stratejisi
- 15:30-17:30: Cache testleri

### Gün 3 - Raporlama Sistemi
**Geliştirici 1:**
- 09:30-11:30: PDF rapor şablonları
- 11:30-13:00: Excel rapor şablonları
- 14:00-15:30: CSV export sistemi
- 15:30-17:30: Format testleri

**Geliştirici 2:**
- 09:30-11:30: Özelleştirilebilir raporlar
- 11:30-13:00: Rapor zamanlama sistemi
- 14:00-15:30: E-mail entegrasyonu
- 15:30-17:30: Gönderim testleri

### Gün 4 - Optimizasyon
**Geliştirici 1:**
- 09:30-11:30: Query optimizasyonu
- 11:30-13:00: Cache yapılandırması
- 14:00-15:30: Bulk işlem optimizasyonu
- 15:30-17:30: Performans testleri

**Geliştirici 2:**
- 09:30-11:30: Memory optimizasyonu
- 11:30-13:00: Database indexleme
- 14:00-15:30: Load balancing
- 15:30-17:30: Stress testleri

### Gün 5 - Final Testler ve Dokümantasyon
**Geliştirici 1:**
- 09:30-11:30: End-to-end testler
- 11:30-13:00: Performance monitoring
- 14:00-15:30: API dokümantasyonu
- 15:30-17:30: Deployment hazırlığı

**Geliştirici 2:**
- 09:30-11:30: Security testleri
- 11:30-13:00: Load testleri
- 14:00-15:30: Kullanım kılavuzu
- 15:30-17:30: Release notes

## 🛠 Teknik Stack

### Backend Framework ve ORM
- Node.js & Express.js
- TypeScript
- Prisma (ORM)
- PostgreSQL

### Testing
- Jest
- Supertest

### Güvenlik
- JWT
- bcrypt
- helmet
- rate-limiter

### Dokümantasyon
- Swagger/OpenAPI
- Postman koleksiyonları

## 📚 Eğitim ve Geliştirme Konuları

Her iki geliştiricinin de aşağıdaki konularda bilgi sahibi olması gerekmektedir:

1. **Temel Konular**
   - REST API prensipleri
   - TypeScript temelleri
   - SQL ve ORM kullanımı
   - Git workflow

2. **Güvenlik**
   - JWT authentication
   - Password hashing
   - CORS
   - XSS ve CSRF koruması

3. **Database**
   - PostgreSQL
   - Prisma ORM
   - Migration yönetimi
   - İlişkisel veritabanı tasarımı

4. **Testing**
   - Unit testing
   - Integration testing
   - Test coverage
   - Mocking

## 🔍 Code Review Süreci

1. Her feature branch için PR oluşturulması
2. Diğer geliştiricinin code review yapması
3. Test coverage kontrolü
4. Linting kontrolü
5. CI/CD pipeline kontrolü

## 📈 Performans Metrikleri

1. Test coverage: Minimum %80
2. API response time: Maximum 200ms
3. Successful build rate: Minimum %95
4. Documentation coverage: %100

## 🚀 Deployment

1. Development ortamı
2. Staging ortamı
3. Production ortamı

Her ortam için ayrı CI/CD pipeline'ı oluşturulacak.

## 📝 Daily Standups

Her gün 15 dakikalık standup toplantısı:
1. Dün ne yapıldı?
2. Bugün ne yapılacak?
3. Blocker var mı?

## 🎯 Definition of Done

1. Kod yazıldı
2. Testler yazıldı
3. Code review tamamlandı
4. Dokümantasyon güncellendi
5. CI/CD pipeline'dan geçti