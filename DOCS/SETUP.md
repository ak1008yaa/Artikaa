# Artikaa Gallery - Setup Guide

## 📋 Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Configuration](#configuration)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

## 🖥️ System Requirements

### Minimum
- PHP 7.4+
- MySQL 5.7+ or SQLite
- 100MB disk space
- 256MB RAM

### Recommended
- PHP 8.1+
- MySQL 8.0+
- 500MB disk space
- 1GB RAM
- SSL certificate

### Extensions Required
```
- php-pdo
- php-gd (image processing)
- php-json
- php-xml
- php-curl
- php-mbstring
- mod_rewrite (Apache)
```

## 🚀 Installation Steps

### 1. Download/Clone Repository
```bash
# Using Git
git clone https://github.com/yourusername/artikaa-gallery.git
cd artikaa-gallery

# Or download ZIP and extract
unzip artikaa-gallery.zip
cd artikaa-gallery
```

### 2. Set Permissions
```bash
# Make directories writable
chmod 755 DATA
chmod 755 API
chmod 644 .htaccess

# For Linux/Mac
chmod -R 755 ASSETS
```

### 3. Install PHP Dependencies
```bash
# Using Composer (if you have it)
composer install

# Or manually place vendor files
```

### 4. Configure Environment
```bash
# Copy example config
cp config.example.php config.php

# Edit with your settings
nano config.php
```

### 5. Create Database
```bash
# Option 1: Using phpMyAdmin
# 1. Create new database: artikaa_db
# 2. Import DATA/init.sql

# Option 2: Using MySQL command line
mysql -u root -p < DATA/init.sql

# Option 3: Using PHP script
php scripts/init-db.php
```

### 6. Create Required Directories
```bash
mkdir -p DATA/uploads
mkdir -p DATA/cache
mkdir -p logs

chmod 755 DATA/uploads
chmod 755 DATA/cache
chmod 755 logs
```

## 🗄️ Database Setup

### MySQL Database Creation
```sql
CREATE DATABASE artikaa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'artikaa_user'@'localhost' IDENTIFIED BY 'artikaa_password';
GRANT ALL PRIVILEGES ON artikaa_db.* TO 'artikaa_user'@'localhost';
FLUSH PRIVILEGES;
```

### Import Initial Data
```bash
mysql -u artikaa_user -p artikaa_db < DATA/init.sql
```

### Tables Created
- users
- products
- orders
- order_items
- payments
- contact_messages
- newsletter_subscribers
- analytics

## ⚙️ Configuration

### config.php Settings

```php
<?php
// Database Configuration
define('DB_TYPE', 'mysql'); // mysql or sqlite
define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'artikaa_db');
define('DB_USER', 'artikaa_user');
define('DB_PASS', 'artikaa_password');

// Site Configuration
define('SITE_URL', 'https://artikaa.am');
define('SITE_NAME', 'Artikaa Gallery');
define('SITE_EMAIL', 'contact@artikaa.am');

// Payment Gateway Keys
define('STRIPE_PUBLIC_KEY', 'your_stripe_public_key');
define('STRIPE_SECRET_KEY', 'your_stripe_secret_key');
define('PAYPAL_CLIENT_ID', 'your_paypal_client_id');
define('PAYPAL_SECRET', 'your_paypal_secret');

// Email Configuration
define('MAIL_FROM', 'noreply@artikaa.am');
define('MAIL_FROM_NAME', 'Artikaa Gallery');
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your_email@gmail.com');
define('SMTP_PASS', 'your_app_password');

// Security
define('ENCRYPTION_KEY', 'generate_secure_key');
define('JWT_SECRET', 'generate_jwt_secret');

// Features
define('ENABLE_PWA', true);
define('ENABLE_ANALYTICS', true);
define('ENABLE_CACHE', true);
define('CACHE_TTL', 3600);
?>
```

### .env File (Alternative)
```
DB_TYPE=mysql
DB_HOST=localhost
DB_NAME=artikaa_db
DB_USER=artikaa_user
DB_PASS=artikaa_password

SITE_URL=https://artikaa.am
SITE_EMAIL=contact@artikaa.am

STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

PAYPAL_CLIENT_ID=...
PAYPAL_SECRET=...

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 🧪 Testing

### 1. Verify Installation
```bash
# Check PHP version
php --version

# Check database connection
php scripts/test-db.php

# Check file permissions
php scripts/check-permissions.php
```

### 2. Test API Endpoints
```bash
# Test products endpoint
curl -X GET https://artikaa.am/API/products.php

# Test contact endpoint
curl -X POST https://artikaa.am/API/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

### 3. Run Unit Tests
```bash
# If using PHPUnit
php vendor/bin/phpunit

# Or with npm
npm test
```

## 🐛 Troubleshooting

### Common Issues

**1. "Permission Denied" Error**
```bash
# Fix folder permissions
sudo chown -R www-data:www-data /path/to/artikaa
chmod 755 ASSETS
chmod 755 DATA
chmod 644 .htaccess
```

**2. "Database Connection Failed"**
- Check if MySQL is running
- Verify credentials in config.php
- Ensure database exists: `mysql -u user -p -e "SHOW DATABASES;"`

**3. "SMTP Connection Error"**
- Verify SMTP credentials
- Enable "Less secure app access" for Gmail
- Use App Password instead of regular password
- Check firewall/port blocking

**4. "Page Returns 404"**
- Enable mod_rewrite: `sudo a2enmod rewrite`
- Restart Apache: `sudo systemctl restart apache2`
- Check .htaccess file is in root

**5. "Memory Limit Exceeded"**
```php
// In php.ini
memory_limit = 256M
max_upload_filesize = 100M
post_max_size = 100M
```

**6. "Blank White Page"**
```php
// Enable debug mode in config.php
define('DEBUG', true);

// Check error logs
tail -f /var/log/apache2/error.log
```

### Logs Location
- **Apache**: `/var/log/apache2/error.log`
- **PHP**: Check `php.ini` error_log path
- **App Logs**: `logs/` directory in project root

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Enable HTTPS/SSL certificate
- [ ] Set proper file permissions (755 for dirs, 644 for files)
- [ ] Hide debug mode in production
- [ ] Set strong database password
- [ ] Configure firewall rules
- [ ] Enable automatic backups
- [ ] Set up intrusion detection

## 📞 Support

Having issues? 
- Check the [README.md](README.md)
- Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- Create an issue on GitHub
- Contact: support@artikaa.am

## ✅ Next Steps

1. ✅ Installation complete
2. Create admin account
3. Add sample products
4. Configure payment gateway
5. Set up email notifications
6. Customize styling
7. Deploy to production
8. Monitor and maintain

---

**Ready to launch?** See [deployment-checklist.md](../deployment-checklist.md)
