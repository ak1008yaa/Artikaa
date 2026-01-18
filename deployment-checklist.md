# Deployment Checklist - Artikaa Gallery

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All code is tested
- [ ] No console errors/warnings
- [ ] No hardcoded secrets in code
- [ ] All dependencies are up to date
- [ ] Code follows style guidelines
- [ ] Git history is clean

### Security
- [ ] HTTPS/SSL certificate is installed
- [ ] All API keys are secured in environment variables
- [ ] Database passwords are strong
- [ ] Admin credentials are changed from defaults
- [ ] .htaccess is configured properly
- [ ] Sensitive files are not accessible (config, DATA folder)
- [ ] CORS headers are configured correctly
- [ ] Rate limiting is enabled on APIs

### Performance
- [ ] Images are optimized
- [ ] CSS/JS are minified
- [ ] Caching strategy is implemented
- [ ] Database indexes are created
- [ ] No N+1 queries
- [ ] CDN is configured (if needed)
- [ ] Load testing passed (1000+ concurrent users)

### Content
- [ ] All product images are uploaded
- [ ] All artist profiles are complete
- [ ] Content is reviewed and approved
- [ ] Meta descriptions are set
- [ ] SEO keywords are researched
- [ ] Broken links are fixed
- [ ] All forms are working

## 🗄️ Database Preparation

### Backup
- [ ] Full database backup created
- [ ] Backup is tested for restoration
- [ ] Backup location is documented
- [ ] Backup schedule is configured

### Migration
- [ ] Database migrations are tested
- [ ] Initial data is loaded
- [ ] User accounts are created
- [ ] Test orders are created
- [ ] Payment test transactions completed

### Optimization
```bash
# Optimize database
ANALYZE TABLE users;
ANALYZE TABLE products;
ANALYZE TABLE orders;
OPTIMIZE TABLE products;
```

## 🚀 Deployment Checklist

### 1. Server Setup
- [ ] Server is provisioned and online
- [ ] SSH access is configured
- [ ] Firewall rules are set
- [ ] DNS records are configured
- [ ] SSL certificate is installed
- [ ] Domain is pointing to server

### 2. Environment Configuration
```bash
# Copy production environment
scp config.php user@server:/path/to/artikaa/

# Set correct permissions
chmod 644 config.php
chmod 755 ASSETS DATA API DOCS
```

- [ ] config.php is set up for production
- [ ] Database credentials are correct
- [ ] Email settings are configured
- [ ] Payment gateway keys are set
- [ ] Encryption keys are generated

### 3. Dependencies Installation
```bash
# SSH into server
ssh user@server

# Go to project directory
cd /path/to/artikaa

# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Set permissions
chmod -R 755 ASSETS DATA API
chmod 644 *.html *.json .htaccess
```

- [ ] All PHP extensions are installed
- [ ] Composer dependencies are installed
- [ ] Node packages are installed (if using build tools)
- [ ] All required files are present

### 4. Web Server Configuration
```bash
# Apache configuration
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo systemctl restart apache2

# Nginx configuration (if applicable)
# Copy nginx.conf to /etc/nginx/sites-available/
sudo systemctl restart nginx
```

- [ ] Web server is configured
- [ ] Virtual host is set up
- [ ] .htaccess is working (test with 404)
- [ ] Static files are served correctly
- [ ] API endpoints are accessible

### 5. Database Migration
```bash
# Create production database
mysql -u root -p < DATA/init.sql

# Verify tables
mysql -u artikaa_user -p artikaa_db -e "SHOW TABLES;"
```

- [ ] Database is created
- [ ] Tables are imported
- [ ] Initial data is loaded
- [ ] Backups are configured

### 6. File Uploads
```bash
# Create upload directories
mkdir -p /path/to/artikaa/DATA/uploads
mkdir -p /path/to/artikaa/DATA/cache
mkdir -p /path/to/artikaa/logs

# Set permissions
chmod 755 DATA/uploads DATA/cache logs
```

- [ ] Upload directories are created
- [ ] Permissions are correct
- [ ] Upload limits are configured in php.ini

### 7. Email Configuration
```php
// Test email in config.php
define('MAIL_FROM', 'noreply@artikaa.am');
define('SMTP_USER', 'your_email@gmail.com');
define('SMTP_PASS', 'your_app_password');
```

- [ ] SMTP credentials are correct
- [ ] Test email sent successfully
- [ ] Email templates are verified

## 🧪 Testing Deployment

### Functional Tests
- [ ] Home page loads
- [ ] Gallery displays products
- [ ] Filtering works
- [ ] Add to cart works
- [ ] Checkout process works
- [ ] Payment processing works
- [ ] Contact form sends emails
- [ ] Newsletter subscription works
- [ ] Admin dashboard loads
- [ ] Admin can add/edit products

### Performance Tests
```bash
# Test with Apache Bench
ab -n 1000 -c 100 https://artikaa.am/

# Test with wrk
wrk -t12 -c400 -d30s https://artikaa.am/

# Check speed
curl -w "@curl-format.txt" -o /dev/null -s https://artikaa.am/
```

- [ ] Page load time < 3 seconds
- [ ] Can handle 100+ concurrent users
- [ ] No memory leaks
- [ ] Database queries are fast

### Security Tests
- [ ] SSL certificate is valid
- [ ] Mixed content warnings (none)
- [ ] Security headers are present
- [ ] CORS is working correctly
- [ ] API rate limiting works
- [ ] SQL injection attempt fails
- [ ] XSS attempts are prevented
- [ ] CSRF tokens are present

```bash
# Check headers
curl -i https://artikaa.am/

# Test SSL
nmap --script ssl-enum-ciphers -p 443 artikaa.am
```

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

## 📊 Monitoring Setup

### Logging
```bash
# Configure log rotation
sudo vim /etc/logrotate.d/artikaa

# Content:
# /path/to/artikaa/logs/*.log {
#   daily
#   missingok
#   rotate 14
#   compress
#   delaycompress
#   notifempty
# }
```

- [ ] Error logging is configured
- [ ] Access logging is enabled
- [ ] Log rotation is set up

### Monitoring Tools
- [ ] Google Analytics configured
- [ ] Error tracking (Sentry, New Relic)
- [ ] Performance monitoring
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Alert notifications configured

### Backup Strategy
- [ ] Daily database backups
- [ ] Weekly file backups
- [ ] Backup verification
- [ ] Disaster recovery plan
- [ ] Backup storage location (S3, etc.)

```bash
# Configure automated backup
sudo crontab -e

# Add:
0 2 * * * /usr/local/bin/backup-artikaa.sh
```

## 🎯 Post-Deployment

### Immediate After Deploy
- [ ] Verify all pages are accessible
- [ ] Test all forms
- [ ] Check email notifications
- [ ] Review error logs
- [ ] Monitor performance
- [ ] Check database integrity

### First 24 Hours
- [ ] Monitor server resources
- [ ] Check for errors in logs
- [ ] Test payment processing
- [ ] Verify email delivery
- [ ] Monitor API response times
- [ ] Get team feedback

### First Week
- [ ] Monitor user activity
- [ ] Check analytics data
- [ ] Review performance metrics
- [ ] Test recovery procedures
- [ ] Get customer feedback
- [ ] Make any necessary adjustments

## 🔄 Rollback Plan

If deployment fails:
1. Stop web server: `sudo systemctl stop apache2`
2. Restore from backup: `mysql artikaa_db < backup.sql`
3. Restore code from git: `git checkout previous-tag`
4. Restart server: `sudo systemctl start apache2`
5. Verify everything works
6. Notify team and users

## 📞 Support Contacts

**During Deployment:**
- DevOps Team: devops@artikaa.am
- Database Admin: dba@artikaa.am
- System Admin: sysadmin@artikaa.am

**Post-Deployment Issues:**
- Support: support@artikaa.am
- Escalation: incidents@artikaa.am

## ✅ Sign-Off

- [ ] Project Manager approval
- [ ] QA approval
- [ ] DevOps approval
- [ ] Business owner approval

**Deployed by**: _________________ Date: _______

**Verified by**: _________________ Date: _______

---

**Deployment Status**: ✅ READY / ❌ ON HOLD / 🔄 IN PROGRESS

For questions or issues, contact the DevOps team.
