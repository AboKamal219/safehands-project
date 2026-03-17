// =============== الصفحة الرئيسية - تفاعلات فقط ===============
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. التنقل السلس عند الضغط على روابط الهيدر
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // إزالة active من كل الروابط
            navLinks.forEach(l => l.classList.remove('active'));
            // إضافة active للرابط المضغوط
            this.classList.add('active');
            
            // التمرير السلس للقسم المطلوب
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 2. زر القائمة في الموبايل
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // تغيير شكل الأيقونة
            const icon = this.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // إغلاق القائمة عند الضغط على رابط
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 3. تأثير الهيدر عند التمرير
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // تفعيل الرابط النشط حسب القسم الظاهر
        updateActiveLinkOnScroll();
    });

    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. زر العودة للأعلى
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // 5. زر تشغيل الفيديو (تجريبي)
    const playVideoBtn = document.getElementById('playVideoBtn');
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            alert('سيتم تشغيل فيديو تعريفي عن المنصة قريباً');
        });
    }

    // 6. تفعيل الرابط النشط عند تحميل الصفحة
    setTimeout(updateActiveLinkOnScroll, 100);
});