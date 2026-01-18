# 🧪 Artikaa Gallery - Complete Testing Guide
# راهنمای تست کامل

**Created:** January 18, 2026

---

## 📋 Testing Checklist

### Phase 1: Installation Requirements ⏳

#### Option A: Install Node.js (Recommended)

**Windows Installation:**
1. Visit: https://nodejs.org/ (Download LTS version - currently v20.x)
2. Download the Windows installer (.msi)
3. Run the installer
4. Follow setup wizard (all defaults are fine)
5. Restart PowerShell/Terminal
6. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

**After Installation:**
```bash
cd c:\Users\Ozi\Documents\GitHub\Artikaa
npm install
npm run dev
# Server will start at http://localhost:3000
```

---

## 🧪 Full Testing Suite

### Phase 2: Frontend Component Testing

#### ✅ Test 1: HTML Page Loading
```
URL: http://localhost:3000
Expected: 
  - Page loads without errors
  - Logo "ARTIKAA" visible
  - Navigation menu appears
  - Hero section displays
  - Gallery grid shows products
```

#### ✅ Test 2: Gallery Display
```
Expected:
  - 6 artworks display in grid
  - Each card shows:
    * Product image (placeholder)
    * Product name (bilingual)
    * Artist name
    * Price (AMD)
    * Rating (stars)
    * "Add to Cart" button
  - Cards are clickable
```

#### ✅ Test 3: Product Filtering
```
Actions:
  1. Click category filter buttons
  2. Filter by: Painting, Sculpture, Photography, Digital
Expected:
  - Only matching products display
  - Product count updates
  - Animation smooth
```

#### ✅ Test 4: Product Search
```
Actions:
  1. Enter search term: "Storm" (or artist name)
  2. Try multiple queries
Expected:
  - Matching products appear
  - Search is case-insensitive
  - "No results" message if nothing found
```

#### ✅ Test 5: Product Sorting
```
Actions:
  1. Click sort dropdown
  2. Select: Featured, Price Low, Price High, Newest, Rating
Expected:
  - Products reorder instantly
  - Correct sort order applied
  - Icons indicate sort direction
```

#### ✅ Test 6: Product Details Modal
```
Actions:
  1. Click on any product card (not button)
Expected Modal Shows:
  - Large product image
  - Product name & artist
  - Full description
  - Material & dimensions
  - Year created
  - Rating & reviews
  - Price (AMD & USD)
  - Category badge
  - Add to Cart button
```

#### ✅ Test 7: Shopping Cart
```
Actions:
  1. Click "Add to Cart" button on product
  2. Check cart icon (top right)
  3. Click cart icon to view cart
Expected:
  - Cart count increases (badge)
  - Item appears in cart sidebar
  - Can update quantity
  - Can remove items
  - Total price updates
  - "Checkout" button appears
```

#### ✅ Test 8: Language Switching
```
Actions:
  1. Click language selector (HY/EN/RU)
  2. Switch between languages
  3. Reload page
Expected:
  - All text translates
  - Product names translate
  - Navigation menu translates
  - Prices remain correct (AMD/USD)
  - Language persists after reload
```

#### ✅ Test 9: Cart Persistence
```
Actions:
  1. Add items to cart
  2. Refresh page (F5)
  3. Close and reopen browser
Expected:
  - Cart items remain
  - Quantities maintained
  - Total price correct
  - Data in localStorage
```

#### ✅ Test 10: Checkout Flow
```
Actions:
  1. Add items to cart
  2. Click "Checkout" button
  3. Fill order form:
     - Name
     - Email
     - Address
     - Payment method
  4. Click "Place Order"
Expected:
  - Validation works
  - Required fields enforced
  - Redirect to confirmation page
  - Order summary displays
  - Confirmation message shows
```

### Phase 3: Admin Panel Testing

#### ✅ Test 11: Admin Dashboard Access
```
URL: http://localhost:3000/admin.html
Expected:
  - Admin page loads
  - Sidebar with 9 sections visible:
    * Dashboard
    * Products
    * Artists
    * Orders
    * Payments
    * Messages
    * Newsletter
    * Analytics
    * Settings
  - Main dashboard area shows stats
```

#### ✅ Test 12: Dashboard Statistics
```
Expected to Display:
  - Total Sales (in AMD)
  - Total Orders count
  - Total Customers number
  - Monthly Revenue
  - Growth percentage
  - Recent orders table
  - Sales chart (if chart library loaded)
```

#### ✅ Test 13: Products Management Section
```
Actions:
  1. Click "Products" in sidebar
Expected:
  - Products table loads with 6 items
  - Columns: ID, Name, Artist, Price, Stock, Actions
  - Each row has Edit/Delete buttons
  - Add Product button visible
  - Search/Filter available
```

#### ✅ Test 14: Artists Management Section
```
Actions:
  1. Click "Artists" in sidebar
Expected:
  - Artists table shows 6 profiles
  - Columns: ID, Name, Works, Followers, Rating, Actions
  - Edit/Delete buttons functional
  - Artist portfolio links work
```

#### ✅ Test 15: Orders Management Section
```
Actions:
  1. Click "Orders" in sidebar
Expected:
  - Orders table (empty or with test data)
  - Columns: Order ID, Customer, Amount, Status, Date, Actions
  - Status dropdown (Pending, Processing, Shipped, Delivered)
  - Update status functionality
  - Export button
```

#### ✅ Test 16: Payments Management Section
```
Actions:
  1. Click "Payments" in sidebar
Expected:
  - Payments table (empty or with test data)
  - Columns: Transaction ID, Amount, Method, Status, Date
  - Filter by payment method
  - Refund button per transaction
```

#### ✅ Test 17: Messages/Contact Section
```
Actions:
  1. Click "Messages" in sidebar
Expected:
  - Contact messages list (if any)
  - Sender name, subject, date
  - Mark as read/unread
  - Reply button
  - Delete option
```

#### ✅ Test 18: Newsletter Section
```
Actions:
  1. Click "Newsletter" in sidebar
Expected:
  - Subscribers count
  - Subscriber list with email, signup date
  - Send campaign form
  - Campaign history
  - Import/Export options
```

#### ✅ Test 19: Analytics Section
```
Actions:
  1. Click "Analytics" in sidebar
Expected:
  - Traffic graph
  - Visitor count
  - Conversion rate
  - Best selling products
  - Popular artists
  - User behavior data
```

### Phase 4: API Testing

#### ✅ Test 20: Products API
```
URL: http://localhost:3000/API/products.php?action=list
Expected:
  - JSON response with products array
  - Each product has: id, name, price, artist, category, etc.
  - Status: 200 OK
  - CORS headers present
```

#### ✅ Test 21: Orders API
```
URL: http://localhost:3000/API/orders.php
Expected:
  - Handle GET (list), POST (create), PUT (update), DELETE
  - Return valid JSON
  - CORS headers present
  - Status codes correct (200, 201, 400, 404)
```

#### ✅ Test 22: Contact Form API
```
Action: Submit contact form on homepage
Expected:
  - POST to API/contact.php
  - Form validation
  - Success message
  - Email notification (if configured)
```

#### ✅ Test 23: Newsletter API
```
Action: Subscribe to newsletter
Expected:
  - POST to API/newsletter.php
  - Email validation
  - Success confirmation
  - Subscription saved
```

#### ✅ Test 24: Payment API
```
URL: http://localhost:3000/API/payment.php
Expected:
  - Handle payment POST requests
  - Support multiple methods (Stripe, PayPal, Bank Transfer, Crypto)
  - Return payment status
  - Order reference in response
```

### Phase 5: Responsive Design Testing

#### ✅ Test 25: Mobile View (320px)
```
Actions:
  1. Open DevTools (F12)
  2. Set viewport: 320px width (mobile phone)
Expected:
  - Navigation menu toggles (hamburger)
  - Gallery cards stack vertically
  - Text readable
  - Buttons touchable (44px+ height)
  - Cart sidebar slides in from side
```

#### ✅ Test 26: Tablet View (768px)
```
Actions:
  1. Set viewport: 768px width (tablet)
Expected:
  - 2-column gallery grid
  - Navigation adjusts
  - Proper spacing maintained
  - Cart sidebar responsive
```

#### ✅ Test 27: Desktop View (1920px)
```
Actions:
  1. Set viewport: 1920px width
Expected:
  - 4-column gallery grid
  - Full navigation bar
  - All features visible
  - Optimal spacing
```

### Phase 6: Browser Compatibility

#### ✅ Test 28: Chrome/Chromium
```
Test: Open in Chrome
Expected: All features work
```

#### ✅ Test 29: Firefox
```
Test: Open in Firefox
Expected: All features work
```

#### ✅ Test 30: Safari (if on Mac)
```
Test: Open in Safari
Expected: All features work
```

#### ✅ Test 31: Edge
```
Test: Open in Microsoft Edge
Expected: All features work
```

### Phase 7: Performance Testing

#### ✅ Test 32: Page Load Time
```
Expected:
  - Initial load: < 3 seconds
  - With cache: < 1 second
  - Lighthouse score: > 80
```

#### ✅ Test 33: JavaScript Console
```
Actions:
  1. Open DevTools Console (F12 → Console)
  2. Look for errors
Expected:
  - No red errors
  - No 404 warnings (except images)
  - Module imports working
```

#### ✅ Test 34: Network Requests
```
Actions:
  1. Open DevTools Network tab
Expected:
  - All CSS files load (5 files)
  - All JS files load (7 files)
  - JSON data loads (products.json, etc)
  - Status: 200 for all
  - No CORS errors
```

---

## 🔍 Detailed Test Procedures

### Test: Product Display & Filtering

**Step 1: Load Homepage**
```
1. Navigate to http://localhost:3000
2. Wait for page to fully load
3. Check console for errors
```

**Step 2: Verify Gallery**
```
1. Scroll to gallery section
2. Count products (should be 6)
3. Verify each has:
   - Image placeholder
   - Armenian name
   - English name
   - Artist name
   - Price in AMD
   - Rating (stars)
   - Reviews count
   - "Add to Cart" button
```

**Step 3: Test Filters**
```
1. Find category filter buttons
2. Click "Painting" → Only ART-001, ART-004 show
3. Click "Sculpture" → Only ART-003, ART-006 show
4. Click "Photography" → Only ART-002 shows
5. Click "Digital" → Only ART-005 shows
6. Click "All" → All 6 show again
```

**Step 4: Test Sort**
```
1. Find sort dropdown
2. Select "Featured" → Featured items first
3. Select "Price: Low" → Cheapest first (ART-005, ART-002, ...)
4. Select "Price: High" → Most expensive first (ART-003, ART-006, ...)
5. Select "Newest" → Recent artworks first (2023, 2022)
6. Select "Rating" → Highest rated first
```

**Step 5: Test Search**
```
1. Find search box
2. Type "Storm" → Shows ART-001 (Հույզերի Փոթորիկ)
3. Clear and type "Ani" → Shows ART-001 (by Ani Harutyunyan)
4. Type "Bronze" → Shows ART-003 (bronze material)
5. Type "xyz" → Shows "No products found"
```

---

## 📝 Test Report Template

```
DATE: ___________
TESTER: _________

TEST RESULTS:
═══════════════════════════════════════════════════════════

Test 1: HTML Page Loading
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 2: Gallery Display (6 products)
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 3: Product Filtering
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 4: Product Search
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 5: Product Sorting
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 6: Product Details Modal
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 7: Shopping Cart
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 8: Language Switching
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 9: Cart Persistence
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 10: Checkout Flow
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 11-19: Admin Panel Tests
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 20-24: API Tests
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 25-27: Responsive Design
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 28-31: Browser Compatibility
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

Test 32-34: Performance
□ PASS    □ FAIL    □ PARTIAL
Notes: ________________________________

═══════════════════════════════════════════════════════════

OVERALL RESULT: _____ / 34 TESTS PASSED (____%)

CRITICAL ISSUES:
[List any blocking issues]

MINOR ISSUES:
[List non-blocking issues]

RECOMMENDATIONS:
[Suggestions for improvement]
```

---

## 🚀 Installation & First Run

### Step 1: Install Node.js
1. Download from https://nodejs.org
2. Run installer (Windows .msi)
3. Use all default settings
4. Restart PowerShell

### Step 2: Verify Installation
```powershell
node --version    # Should show v18+ or v20+
npm --version     # Should show 8+ or 9+
```

### Step 3: Install Dependencies
```powershell
cd c:\Users\Ozi\Documents\GitHub\Artikaa
npm install
```

### Step 4: Start Development Server
```powershell
npm run dev
```

Output should be:
```
> live-server --port=3000
...
Serving "c:\Users\Ozi\Documents\GitHub\Artikaa" at http://127.0.0.1:3000
...
```

### Step 5: Open in Browser
- Click the link or go to: http://localhost:3000
- Admin panel: http://localhost:3000/admin.html
- Checkout: http://localhost:3000/checkout.html

---

## ✅ Quick Test Checklist

Use this to quickly verify all systems:

- [ ] Homepage loads (no errors in console)
- [ ] Gallery shows 6 products
- [ ] Products have images/names/prices
- [ ] Can add items to cart
- [ ] Cart count updates
- [ ] Can switch language (HY/EN/RU)
- [ ] Can filter by category
- [ ] Can sort products
- [ ] Can search products
- [ ] Admin panel loads
- [ ] Admin sections accessible
- [ ] Mobile view works
- [ ] Checkout page works
- [ ] No 404 errors in network tab
- [ ] No JavaScript errors in console

**All passed? PROJECT IS READY! 🎉**

---

**Test Status:** READY FOR FULL TESTING
**Next Step:** Install Node.js and run npm run dev
